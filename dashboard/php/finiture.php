<?php
include('connessione.php');
include('funzioni.php');

if($_GET['type'] == 'save' && $_GET['type'] != 'db') {

    $data = json_decode(file_get_contents("php://input"));
    $fp = fopen('../json/finiture.json', 'w');
    fwrite($fp, json_encode($data));
    fclose($fp);

} elseif ($_GET['type'] == 'db'){

    function finitureJson($con) {
        $finArray = array();
        $resultFin = mysqli_query($con,"SELECT * FROM finiture");
        while($rowFin = mysqli_fetch_array($resultFin)) {
            $rowFin_array['i'] = (int)$rowFin['fin_id'];
            $rowFin_array['c'] = $rowFin['fin_cod'];
            $rowFin_array['n'] = html_entity_decode($rowFin['fin_nome']);
            $rowFin_array['m'] = (int)$rowFin['fin_mark_id'];
            $rowFin_array['v'] = (int)$rowFin['fin_show'];
            $rowFin_array['p'] = (int)$rowFin['fin_type_id'];
            array_push($finArray, $rowFin_array);
        }

        $fp = fopen('../json/finiture.json', 'w');
        $out = array_values($finArray);
        fwrite($fp, json_encode($out));
        fclose($fp);
    }

    finitureJson($con);

} else {

    $data = json_decode(file_get_contents("php://input"));
    $nome = addslashes($data->nome);
    $mark_id = $data->mark;

    $file = str_replace(' ', '_', $nome) . "_" . $data->cod . ".jpg";
    $file_thumb = str_replace(".jpg","_thumb.jpg",$file);

    $mark = str_replace(" ", "_", convertMark($mark_id, $con));
    $path = '../archivio_dati/' . $mark . '/Finiture/';
    $pathFile =  $path . $file;
    $pathThumb = $path . $file_thumb;

    if(isset($data->sourceNome)) {
        $sourceMark = str_replace(" ", "_", convertMark($data->sourceMark, $con));
        $sourcePath = '../archivio_dati/' . $sourceMark . '/Finiture/';
        $sourceFile = str_replace(' ', '_', $data->sourceNome) . "_" . $data->sourceCod . ".jpg";
        $sourceFile_thumb = str_replace(".jpg","_thumb.jpg",$sourceFile);
        $sourcePathFile =  $sourcePath . $sourceFile;
        $sourcePathThumb = $sourcePath . $sourceFile_thumb;
    }

    function createThumb($source, $pathFile, $pathThumb) {
        $thumb = imagecreatetruecolor(80, 40);
        $source = imagecreatefromjpeg($source);
        list($width, $height, $type, $attr) = getimagesize($pathFile);
        imagecopyresized($thumb, $source, 0, 0, 0, 0, 80, 40, $width, $height);
        imagejpeg($thumb, $pathThumb, 50);
        imagecreatefromjpeg($pathThumb);
    }
    switch ($_GET['type']) {
        case 'new':
            $sql="INSERT INTO finiture (fin_id, fin_nome, fin_cod, fin_mark_id, fin_show, fin_type_id) VALUES ('$data->id', '$nome', '$data->cod', '$mark_id', '$data->show', '$data->type')";
            mysqli_query($con,$sql) or die(mysqli_error($con));

            if (substr($data->image, 0, 4) === 'data') {
                $image = explode('base64,',$data->image);
                file_put_contents($pathFile, base64_decode($image[1]));
                createThumb($pathFile, $pathFile, $pathThumb);
            } else {
                copy($sourcePathFile, $pathFile);
                createThumb($sourcePathFile, $pathFile, $pathThumb);
            }
            break;
        case 'delete':
            $sql="DELETE FROM finiture WHERE fin_id='$data->id'";
            mysqli_query($con,$sql) or die(mysqli_error($con));
            unlink($pathFile);
            unlink($pathThumb);
            break;
        case 'update':
            $result = mysqli_query($con,"SELECT * FROM finiture WHERE fin_id='$data->id'");
            while($row = mysqli_fetch_array($result)) {
                $oldFinNome = $row['fin_nome'];
                $oldFinCod = $row['fin_cod'];
                $oldFinMark = $row['fin_mark_id'];
            };
            $sql="UPDATE finiture SET fin_nome='$nome', fin_cod='$data->cod', fin_mark_id='$mark_id', fin_show='$data->show', fin_type_id='$data->type' WHERE fin_id='$data->id'";
            mysqli_query($con,$sql) or die(mysqli_error($con));
            if (substr($data->image, 0, 4) === 'data') {
                $image = explode('base64,',$data->image);
                file_put_contents($pathFile, base64_decode($image[1]));
                createThumb($pathFile, $pathFile, $pathThumb);
                if($nome != $oldFinNome || $data->cod != $oldFinCod || $mark_id != $oldFinMark) {
                    unlink($sourcePathFile);
                    unlink($sourcePathThumb);
                }
                echo 'cambio file';
            } else {
                copy($sourcePathFile, $pathFile);
                createThumb($sourcePathFile, $pathFile, $pathThumb);
                if($nome != $oldFinNome || $data->cod != $oldFinCod || $mark_id != $oldFinMark) {
                    unlink($sourcePathFile);
                    unlink($sourcePathThumb);
                }
            }
            break;
    }
}

echo "DONE";

mysqli_close($con);

