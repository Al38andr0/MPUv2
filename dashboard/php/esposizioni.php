<?php
include('connessione.php');
include('funzioni.php');

if($_GET['type'] == 'save' && $_GET['type'] != 'db') {

    $data = json_decode(file_get_contents("php://input"));
    $fp = fopen('../json/esposizioni.json', 'w');
    fwrite($fp, json_encode($data));
    fclose($fp);

} elseif ($_GET['type'] == 'db'){

    function esposizioniJson($con) {
        $array = [];
        $result = mysqli_query($con,"SELECT * FROM esposizioni");
        while($row = mysqli_fetch_array($result)) {
            $row_array['i'] = (int)$row['esp_id'];
            $row_array['m'] = (int)$row['esp_mark_id'];
            $row_array['l'] = (int)$row['esp_line_id'];
            $row_array['t'] = (int)$row['esp_tbpr'];
            $row_array['c'] = $row['esp_cod'];
            $row_array['f'] = $row['esp_fin'];
            $row_array['d'] = $row['esp_dim'];
            $row_array['y'] = (int)$row['esp_pos'];
            $row_array['n'] = html_entity_decode($row['esp_nome']);

            array_push($array,$row_array);
        }
        $fp = fopen('../json/esposizioni.json', 'w');
        $out = array_values($array);
        fwrite($fp, json_encode($out));
        fclose($fp);
    }

esposizioniJson($con);

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
                $resultProd = mysqli_query($con, "SELECT * FROM settori_esposizioni JOIN esposizioni ON esposizioni.esp_id = settori_esposizioni.stes_esp JOIN tabelle_prodotti ON esposizioni.esp_tbpr = tabelle_prodotti.tbpr_id WHERE stes_nwln_id = '$line_id' ORDER BY tbpr_pos");
                while ($rowProd = mysqli_fetch_array($resultProd)) {
                    $set_array = json_decode($rowProd['stes_array']);
                    for($i = 0; $i < count($set_array); $i++) {
                        if($set_array[$i] == $set_id){
                            array_push($rowSet_array['x'], (int)$rowProd['esp_tbpr']);
                            $rowSet_array['x'] = array_values(array_unique($rowSet_array['x'], SORT_REGULAR));
                        }
                    }
                }

                array_push($lineeArray, $rowSet_array);
            }

//            array_push($lineeArray,$rowLinee_array);
            $fp = fopen('../json/tbesp/' . $rowLinee['line_id'] . '.json', 'w');
            $out = array_values($lineeArray);
            fwrite($fp, json_encode($out));
            fclose($fp);
        }
    }

    uniqueLineeJson($con);

} else {

    $data = json_decode(file_get_contents("php://input"));
    $nome = (isset($data->nome)) ? addslashes($data->nome) : null;
    $dim = (isset($data->dim)) ? addslashes($data->dim) : null;
    $cod = $data->cod;

    $mark_id = $data->mark;
    $mark = str_replace(' ', '_', convertMark($mark_id, $con));
    $line_id = $data->line;
    $line = str_replace(' ', '_', convertLine($line_id, $con));
    $fin = str_replace(' ', '_', $data->fin);

    $file = $line . '_' . $cod . '_' . $fin . ".jpg";
    $path = '../archivio_dati/' . $mark . '/' . $line . '/Render/';
    $pathFile =  $path . $file;

    if(isset($data->sourceCod)) {
        $sourceCod = $data->sourceCod;
        $sourceMark = str_replace(" ", "_", convertMark($data->sourceMark, $con));
        $sourceLine = str_replace(" ", "_", convertLine($data->sourceLine, $con));
        $sourceFin = str_replace(" ", "_", $data->sourceFin);
        $sourcePath = '../archivio_dati/' . $sourceMark . '/' . $sourceLine . '/Render/';
        $sourceFile = $sourceLine . '_' . $sourceCod . '_' . $sourceFin . ".jpg";
        $sourcePathFile =  $sourcePath . $sourceFile;
    }

    switch ($_GET['type']) {
        case 'new':
            $sql="INSERT INTO esposizioni (
                esp_id,
                esp_mark_id,
                esp_line_id,
                esp_tbpr,
                esp_cod,
                esp_fin,
                esp_dim,
                esp_pos,
                esp_nome
            ) VALUES (
                '$data->id',
                '$mark_id',
                '$line_id',
                '$data->tbpr',
                '$cod',
                '$fin',
                '$dim',
                '$data->pos',
                '$nome'
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
            $sql="DELETE FROM esposizioni WHERE esp_id='$data->id'";
            mysqli_query($con,$sql) or die(mysqli_error($con));
            unlink($pathFile);
            break;
        case 'update':
            $sql="UPDATE esposizioni SET
                    esp_cod         = '$data->cod',
                    esp_mark_id     = '$mark_id',
                    esp_line_id     = '$line_id',
                    esp_tbpr       = '$data->tbpr',
                    esp_cod         = '$cod',
                    esp_fin         = '$fin',
                    esp_dim         = '$dim',
                    esp_pos         = '$data->pos',
                    esp_nome        = '$nome'
                    WHERE esp_id='$data->id'";
            mysqli_query($con,$sql) or die(mysqli_error($con));
            if (substr($data->image, 0, 4) === 'data') {
                $image = explode('base64,',$data->image);
                file_put_contents($pathFile, base64_decode($image[1]));
                if($cod != $data->sourceCod || $mark_id != $data->sourceMark || $line_id != $data->sourceLine || $data->fin != $data->sourceFin) {
                    unlink($sourcePathFile);
                }
            } else {
                copy($sourcePathFile, $pathFile);
                if($cod !== $data->sourceCod || $mark_id !== $data->sourceMark || $line_id !== $data->sourceLine || $data->fin !== $data->sourceFin) {
                    unlink($sourcePathFile);
                }
            }
            break;
    }
}

echo "DONE";

mysqli_close($con);

