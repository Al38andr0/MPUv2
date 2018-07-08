<?php
include('connessione.php');
include('funzioni.php');

function prodottiJson($con) {
    $prodottiArray = [];
    $resultProdotti = mysqli_query($con, "SELECT * FROM prodotti");
    while ($rowProdotti = mysqli_fetch_array($resultProdotti)) {
        $rowProdotti_array['i'] = (int)$rowProdotti['prd_id'];
        $rowProdotti_array['m'] = (int)$rowProdotti['prd_mark_id'];
        $rowProdotti_array['l'] = (int)$rowProdotti['prd_line_id'];
        $rowProdotti_array['c'] = html_entity_decode($rowProdotti['prd_cod']);
        $rowProdotti_array['n'] = html_entity_decode($rowProdotti['prd_title']);
        $rowProdotti_array['t'] = (int)$rowProdotti['prd_tbpr'];
        $rowProdotti_array['d'] = html_entity_decode($rowProdotti['prd_dim']);
        $rowProdotti_array['y'] = (int)$rowProdotti['prd_pos'];
        $rowProdotti_array['x'] = (int)$rowProdotti['prd_lnfn_id'];
        $rowProdotti_array['o'] = html_entity_decode($rowProdotti['prd_note']);
        $rowProdotti_array['a'] = (int)$rowProdotti['prd_abb'];
        $rowProdotti_array['f'] = (int)$rowProdotti['prd_fin'];
        $rowProdotti_array['z'] = json_decode($rowProdotti['prd_price_array']);

        array_push($prodottiArray, $rowProdotti_array);
    }

    $fp = fopen('../json/prodotti.json', 'w');
    $out = array_values($prodottiArray);
    fwrite($fp, json_encode($out));
    fclose($fp);
}

if ($_GET['type'] == 'db'){

    function uniqueLineeJson($con) {
        $resultLinee = mysqli_query($con,"SELECT * FROM linee");
        while($rowLinee = mysqli_fetch_array($resultLinee)) {
            $lineeArray = array();
            $line_id = $rowLinee['line_id'];

            $resultSet = mysqli_query($con,"SELECT * FROM settori_linee WHERE stln_line_id = '$line_id' AND stln_show = 1");
            while($rowSet = mysqli_fetch_array($resultSet)) {
                $set_id = (int)$rowSet['stln_set_id'];
                $rowSet_array['i'] = (int)$rowSet['stln_set_id'];

                $rowSet_array['x'] = [];
                $resultProd = mysqli_query($con, "SELECT stpr_prd, stpr_array, prd_tbpr, tbpr_pos FROM settori_prodotti JOIN prodotti ON prodotti.prd_id = settori_prodotti.stpr_prd JOIN tabelle_prodotti ON prodotti.prd_tbpr = tabelle_prodotti.tbpr_id WHERE stpr_nwln_id = '$line_id' ORDER BY tbpr_pos");
                while ($rowProd = mysqli_fetch_array($resultProd)) {
                    $set_array = json_decode($rowProd['stpr_array']);
                    for($i = 0; $i < count($set_array); $i++) {
                        if($set_array[$i] == $set_id){
                            array_push($rowSet_array['x'], (int)$rowProd['prd_tbpr']);
                            $rowSet_array['x'] = array_values(array_unique($rowSet_array['x'], SORT_REGULAR));
                        }
                    }
                }

                array_push($lineeArray, $rowSet_array);
            }

            $fp = fopen('../json/tbpr/' . $rowLinee['line_id'] . '.json', 'w');
            $out = array_values($lineeArray);
            fwrite($fp, json_encode($out));
            fclose($fp);
        }
    }

    uniqueLineeJson($con);

} else {

    $data = json_decode(file_get_contents("php://input"));
    $mark_id = $data->mark;
    $mark = str_replace(' ', '_', convertMark($mark_id, $con));
    $line_id = $data->line;
    $line = str_replace(' ', '_', convertLine($line_id, $con));

    $path = '../archivio_dati/' . $mark . '/' . $line . '/Prodotti/';
    if($_GET['type'] !== 'deleteAll') {
        $title = addslashes($data->title);
        $note = (isset($data->note)) ? addslashes($data->note) : null;
        $dim = (isset($data->dim)) ? $data->dim : null;
        $prices = json_encode($data->prices);
        $cod = $data->cod;
        $file = $cod . ".jpg";
        $pathFile = $path . $file;
    }
    if(isset($data->sourceCod)) {
        $sourceCod = $data->sourceCod;
        $sourceMark = str_replace(" ", "_", convertMark($data->sourceMark, $con));
        $sourceLine = str_replace(" ", "_", convertLine($data->sourceLine, $con));
        $sourcePath = '../archivio_dati/' . $sourceMark . '/' . $sourceLine . '/Prodotti/';
        $sourceFile = $sourceCod . ".jpg";
        $sourcePathFile =  $sourcePath . $sourceFile;
    }

    switch ($_GET['type']) {
        case 'new':
            echo 'copy ';
            $sql="INSERT INTO prodotti (
                prd_id,
                prd_title,
                prd_cod,
                prd_mark_id,
                prd_line_id,
                prd_tbpr,
                prd_dim,
                prd_lnfn_id,
                prd_note,
                prd_abb,
                prd_fin,
                prd_pos,
                prd_price_array
            ) VALUES (
                '$data->id',
                '$title',
                '$data->cod',
                '$mark_id',
                '$line_id',
                '$data->tbpr',
                '$dim',
                '$data->lnfn',
                '$note',
                '$data->abb',
                '$data->fin',
                '$data->pos',
                '$prices'
            )";
            mysqli_query($con,$sql) or die(mysqli_error($con));

            if (substr($data->image, 0, 4) === 'data') {
                $image = explode('base64,',$data->image);
                file_put_contents($pathFile, base64_decode($image[1]));
            } else {
                copy($sourcePathFile, $pathFile);
            }
            break;
        case 'delete':
            $sql="DELETE FROM prodotti WHERE prd_id='$data->id'";
            mysqli_query($con,$sql) or die(mysqli_error($con));
            unlink($pathFile);
            break;
        case 'deleteAll':
            $sql="DELETE FROM prodotti WHERE prd_line_id='$line_id'";
            mysqli_query($con,$sql) or die(mysqli_error($con));
            $files = glob($path . '*'); // get all file names
            foreach($files as $file){ // iterate files
                if(is_file($file))
                    unlink($file); // delete file
            }
            break;
        case 'update':
            echo $data->id . ' ';
            echo 'update ';
            $sql="UPDATE prodotti SET
                    prd_cod         = '$data->cod',
                    prd_title       = '$title',
                    prd_mark_id     = '$mark_id',
                    prd_line_id     = '$line_id',
                    prd_tbpr        = '$data->tbpr',
                    prd_dim         = '$dim',
                    prd_dim         = '$dim',
                    prd_lnfn_id     = '$data->lnfn',
                    prd_note        = '$note',
                    prd_abb         = '$data->abb',
                    prd_fin         = '$data->fin',
                    prd_pos         = '$data->pos',
                    prd_price_array = '$prices'
                    WHERE prd_id='$data->id'";
            mysqli_query($con,$sql) or die(mysqli_error($con));
            if (substr($data->image, 0, 4) === 'data') {
                $image = explode('base64,',$data->image);
                file_put_contents($pathFile, base64_decode($image[1]));
                if($cod != $data->sourceCod || $mark_id != $data->sourceMark || $line_id != $data->sourceLine) {
                    unlink($sourcePathFile);
                }
            } else {
                copy($sourcePathFile, $pathFile);
                if($cod !== $data->sourceCod || $mark_id !== $data->sourceMark || $line_id !== $data->sourceLine) {
                    unlink($sourcePathFile);
                }
            }
            break;
    }
    prodottiJson($con);
}

echo "DONE";

mysqli_close($con);

