<?php
include('connessione.php');
include('funzioni.php');

if ($_GET['type'] !== 'get') {
    $data = json_decode(file_get_contents("php://input"));
    $nome = addslashes($data->nome);
    $mark_id = $data->mark;

    $file = str_replace(' ', '_', $nome) . "_" . str_replace(' ', '_', $data->cod) . ".jpg";
    $file_thumb = str_replace(".jpg", "_thumb.jpg", $file);

    $mark = str_replace(" ", "_", convertMark($mark_id, $con));
    $path = '../archivio_dati/' . $mark . '/Finiture/';
    $pathFile = $path . $file;
    $pathThumb = $path . $file_thumb;

    function createThumb($source, $pathFile, $pathThumb)
    {
        $thumb = imagecreatetruecolor(80, 40);
        $source = imagecreatefromjpeg($source);
        list($width, $height) = getimagesize($pathFile);
        imagecopyresized($thumb, $source, 0, 0, 0, 0, 80, 40, $width, $height);
        imagejpeg($thumb, $pathThumb, 50);
        imagecreatefromjpeg($pathThumb);
    }
}

switch ($_GET['type']) {
    case 'get' :
        $result_array = array();
        $sql = "SELECT * FROM finiture f JOIN marchi m ON f.fin_mark_id = m.mark_id ORDER BY fin_nome";
        $result = mysqli_query($con, $sql);
        while ($row = $result->fetch_assoc()) {
            array_push($result_array, $row);
        }
        echo json_encode($result_array, JSON_NUMERIC_CHECK);
        break;
    case 'new':
        $sql = "INSERT INTO finiture (fin_nome, fin_cod, fin_mark_id, fin_show, fin_type_id) VALUES ('$nome', '$data->cod', '$mark_id', '$data->show', '$data->type')";
        mysqli_query($con, $sql) or die(mysqli_error($con));

        if (substr($data->image, 0, 4) === 'data') {
            $image = explode('base64,', $data->image);
            file_put_contents($pathFile, base64_decode($image[1]));
            createThumb($pathFile, $pathFile, $pathThumb);
        } else {
            copy($sourcePathFile, $pathFile);
            createThumb($sourcePathFile, $pathFile, $pathThumb);
        }
        echo "Created";
        break;
    case 'delete':
        $sql = "DELETE FROM finiture WHERE fin_id='$data->id'";
        mysqli_query($con, $sql) or die(mysqli_error($con));
        unlink($pathFile);
        unlink($pathThumb);
        echo "Deleted";
        break;
    case 'update':
        $oldFinNome = false;
        $oldFinCod = false;
        $oldFinMark = false;

        $result = mysqli_query($con, "SELECT * FROM finiture WHERE fin_id='$data->id'");
        while ($row = mysqli_fetch_array($result)) {
            $oldFinNome = $row['fin_nome'];
            $oldFinCod = $row['fin_cod'];
            $oldFinMark = $row['fin_mark_id'];
        };

        $sourceMark = str_replace(" ", "_", convertMark($oldFinMark, $con));
        $sourcePath = '../archivio_dati/' . $sourceMark . '/Finiture/';
        $sourceFile = str_replace(' ', '_', $oldFinNome) . "_" . str_replace(' ', '_', $oldFinCod) . ".jpg";
        $sourceFile_thumb = str_replace(".jpg", "_thumb.jpg", $sourceFile);
        $sourcePathFile = $sourcePath . $sourceFile;
        $sourcePathThumb = $sourcePath . $sourceFile_thumb;

        $sql = "UPDATE finiture SET fin_nome='$nome', fin_cod='$data->cod', fin_mark_id='$mark_id', fin_show='$data->show', fin_type_id='$data->type' WHERE fin_id='$data->id'";
        mysqli_query($con, $sql) or die(mysqli_error($con));
        if (substr($data->image, 0, 4) === 'data') {
            $image = explode('base64,', $data->image);
            file_put_contents($pathFile, base64_decode($image[1]));
            createThumb($pathFile, $pathFile, $pathThumb);
        } else {
            copy($sourcePathFile, $pathFile);
            createThumb($sourcePathFile, $pathFile, $pathThumb);
        }
        if ($nome != $oldFinNome || $data->cod != $oldFinCod || $mark_id != $oldFinMark) {
            unlink($sourcePathFile);
            unlink($sourcePathThumb);
        }
        echo "Updated";
        break;
}

mysqli_close($con);