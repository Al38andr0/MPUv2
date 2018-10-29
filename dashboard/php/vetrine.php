<?php
include('connessione.php');
include('funzioni.php');

if($_GET['type'] == 'save' && $_GET['type'] != 'db') {

    $data = json_decode(file_get_contents("php://input"));
    $fp = fopen('../json/vetrine.json', 'w');
    fwrite($fp, json_encode($data));
    fclose($fp);

} elseif ($_GET['type'] == 'db'){

    function vetrinaJson($con) {
        $compArray = [];
        $resultComp = mysqli_query($con, "SELECT * FROM composizioni");
        while ($rowComp = mysqli_fetch_array($resultComp)) {
            $rowComp_array['i'] = (int)$rowComp['cmp_id'];
            $rowComp_array['c'] = html_entity_decode($rowComp['cmp_nome']);
            $rowComp_array['m'] = (int)$rowComp['cmp_mark_id'];
            $rowComp_array['l'] = (int)$rowComp['cmp_line_id'];
            $rowComp_array['v'] = (int)$rowComp['cmp_show'];
            $rowComp_array['y'] = (int)$rowComp['cmp_pos'];
            $rowComp_array['s'] = json_decode($rowComp['cmp_settore']);
            $rowComp_array['n'] = html_entity_decode($rowComp['cmp_title']);
            $rowComp_array['o'] = html_entity_decode($rowComp['cmp_note']);

            array_push($compArray, $rowComp_array);
        }
        $fp = fopen('../json/vetrine.json', 'w');
        $out = array_values($compArray);
        fwrite($fp, json_encode($out));
        fclose($fp);
    }

    vetrinaJson($con);

} else {

    $data = json_decode(file_get_contents("php://input"));
    $title = addslashes($data->title);
    $note = (isset($data->note)) ? addslashes($data->note) : null;
    $settore = json_encode($data->settore);
    $cod = $data->cod;

    $mark_id = $data->mark;
    $mark = str_replace(' ', '_', convertMark($mark_id, $con));
    $line_id = $data->line;
    $line = str_replace(' ', '_', convertLine($line_id, $con));

    $file = $line . '_' . $cod . ".jpg";
    $path = '../archivio_dati/' . $mark . '/' . $line . '/Vetrina/';
    $pathFile =  $path . $file;

    if(isset($data->sourceCod)) {
        $sourceCod = $data->sourceCod;
        $sourceMark = str_replace(" ", "_", convertMark($data->sourceMark, $con));
        $sourceLine = str_replace(" ", "_", convertLine($data->sourceLine, $con));
        $sourcePath = '../archivio_dati/' . $sourceMark . '/' . $sourceLine . '/Vetrina/';
        $sourceFile = $sourceLine . '_' . $sourceCod . ".jpg";
        $sourcePathFile =  $sourcePath . $sourceFile;
    }

    switch ($_GET['type']) {
        case 'new':
            $sql="INSERT INTO composizioni (
cmp_id, cmp_title, cmp_nome, cmp_mark_id, cmp_line_id, cmp_note, cmp_settore, cmp_show, cmp_pos) VALUES (
'$data->id', '$title', '$cod', '$mark_id', '$line_id', '$note', '$settore', '$data->show', '$data->pos')";
            mysqli_query($con,$sql) or die(mysqli_error($con));

            if (substr($data->image, 0, 4) === 'data') {
                $image = explode('base64,',$data->image);
                file_put_contents($pathFile, base64_decode($image[1]));
            } else {
                copy($sourcePathFile, $pathFile);
            }
            break;
        case 'delete':
            $sql="DELETE FROM composizioni WHERE cmp_id='$data->id'";
            mysqli_query($con,$sql) or die(mysqli_error($con));
            unlink($pathFile);
            break;
        case 'update':
            $sql="UPDATE composizioni SET
                    cmp_nome         = '$data->cod',
                    cmp_title       = '$title',
                    cmp_mark_id     = '$mark_id',
                    cmp_line_id     = '$line_id',
                    cmp_note        = '$note',
                    cmp_settore        = '$settore',
                    cmp_show         = '$data->show',
                    cmp_pos         = '$data->pos'
                    WHERE cmp_id='$data->id'";
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
}

echo "DONE";

mysqli_close($con);

