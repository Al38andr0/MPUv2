<?php
include('connessione.php');
include('funzioni.php');

if($_GET['type'] == 'save' && $_GET['type'] != 'db') {

    $data = json_decode(file_get_contents("php://input"));
    $fp = fopen('../json/composti.json', 'w');
    fwrite($fp, json_encode($data));
    fclose($fp);

} elseif ($_GET['type'] == 'db'){

    function compostiJson($con) {
        $array = [];
        $result = mysqli_query($con,"SELECT * FROM composti");
        while($row = mysqli_fetch_array($result)) {
            $row_array['i'] = (int)$row['cst_id'];
            $row_array['m'] = (int)$row['cst_mark_id'];
            $row_array['l'] = (int)$row['cst_line_id'];
            $row_array['c'] = $row['cst_cod'];
            $row_array['f'] = $row['cst_fin'];
            $row_array['y'] = (int)$row['cst_pos'];
            $row_array['n'] = html_entity_decode($row['cst_nome']);

            array_push($array,$row_array);
        }
        $fp = fopen('../json/composti.json', 'w');
        $out = array_values($array);
        fwrite($fp, json_encode($out));
        fclose($fp);
    }

compostiJson($con);

} else {

    $data = json_decode(file_get_contents("php://input"));
    $nome = (isset($data->nome)) ? addslashes($data->nome) : null;
    $cod = $data->cod;

    $mark_id = $data->mark;
    $mark = str_replace(' ', '_', convertMark($mark_id, $con));
    $line_id = $data->line;
    $line = str_replace(' ', '_', convertLine($line_id, $con));
    $fin = str_replace(' ', '_', $data->fin);

    $file = $line . '_' . $cod . 'C_' . $fin . ".jpg";
    $path = '../archivio_dati/' . $mark . '/' . $line . '/Render/';
    $pathFile =  $path . $file;

    if(isset($data->sourceCod)) {
        $sourceCod = $data->sourceCod;
        $sourceMark = str_replace(" ", "_", convertMark($data->sourceMark, $con));
        $sourceLine = str_replace(" ", "_", convertLine($data->sourceLine, $con));
        $sourceFin = str_replace(" ", "_", $data->sourceFin);
        $sourcePath = '../archivio_dati/' . $sourceMark . '/' . $sourceLine . '/Render/';
        $sourceFile = $sourceLine . '_' . $sourceCod . 'C_' . $sourceFin . ".jpg";
        $sourcePathFile =  $sourcePath . $sourceFile;
    }

    switch ($_GET['type']) {
        case 'new':
            $sql="INSERT INTO composti (
                cst_id,
                cst_mark_id,
                cst_line_id,
                cst_cod,
                cst_fin,
                cst_pos,
                cst_nome
            ) VALUES (
                '$data->id',
                '$mark_id',
                '$line_id',
                '$cod',
                '$fin',
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
            $sql = "DELETE FROM composti WHERE cst_id = '$data->id'";
            mysqli_query($con,$sql) or die(mysqli_error($con));
            unlink($pathFile);
            break;
        case 'update':
            $sql="UPDATE composti SET
                    cst_cod         = '$data->cod',
                    cst_mark_id     = '$mark_id',
                    cst_line_id     = '$line_id',
                    cst_cod         = '$cod',
                    cst_fin         = '$fin',
                    cst_pos         = '$data->pos',
                    cst_nome        = '$nome'
                    WHERE cst_id='$data->id'";
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

