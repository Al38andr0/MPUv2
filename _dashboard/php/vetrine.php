<?php
include('connessione.php');
include('funzioni.php');

$image = false;

if ($_GET['type'] !== 'get') {
    $data = json_decode(file_get_contents("php://input"));
    $title = addslashes($data->title);
    $note = (isset($data->note)) ? addslashes($data->note) : null;
    $settore = json_encode($data->settore);

    $mark_id = $data->mark;
    $mark = str_replace(' ', '_', convertMark($mark_id, $con));
    $line_id = $data->line;
    $line = str_replace(' ', '_', convertLine($line_id, $con));

    $file = $line . '_' . $data->cod . ".jpg";
    $path = '../archivio_dati/' . $mark . '/' . $line . '/Vetrina/';
    $pathFile = $path . $file;

    if (isset($data->sourceCod)) {
        $sourceCod = $data->sourceCod;
        $sourceMark = str_replace(" ", "_", convertMark($data->sourceMark, $con));
        $sourceLine = str_replace(" ", "_", convertLine($data->sourceLine, $con));
        $sourcePath = '../archivio_dati/' . $sourceMark . '/' . $sourceLine . '/Vetrina/';
        $sourceFile = $sourceLine . '_' . $sourceCod . ".jpg";
        $sourcePathFile = $sourcePath . $sourceFile;
    }
}

switch ($_GET['type']) {
    case 'get' :
        $result_array = array();
        $sql = "SELECT * FROM vetrine ORDER BY cmp_line_id, cmp_nome";
        $result = mysqli_query($con, $sql);
        while ($row = $result->fetch_assoc()) {
            $row['cmp_settore'] = json_decode($row['cmp_settore']);
            $row['cmp_id'] = intval($row['cmp_id']);
            $row['cmp_line_id'] = intval($row['cmp_line_id']);
            $row['cmp_mark_id'] = intval($row['cmp_mark_id']);
            $row['cmp_cat_id'] = intval($row['cmp_cat_id']);
            $row['cmp_pos'] = intval($row['cmp_pos']);
            $row['cmp_show'] = intval($row['cmp_show']);
            array_push($result_array, $row);
        }
        echo json_encode($result_array);
        break;
    case 'new':
        $sql = "INSERT INTO vetrine (cmp_title, cmp_nome, cmp_mark_id, cmp_line_id, cmp_note, cmp_settore, cmp_show, cmp_pos, cmp_cat_id) VALUES ('$title', '$data->cod', '$mark_id', '$line_id', '$note', '$settore', '$data->show', '$data->pos', '$data->cat')";
        mysqli_query($con, $sql) or die(mysqli_error($con));

        if (substr($data->image, 0, 4) === 'data') {
            $image = explode('base64,', $data->image);
            file_put_contents($pathFile, base64_decode($image[1]));
        } else {
            copy($sourcePathFile, $pathFile);
        }
        echo "Created";
        break;
    case 'delete':
        $result = mysqli_query($con, "SELECT cmp_nome FROM vetrine WHERE cmp_id = '$data->id'");
        while ($row = mysqli_fetch_array($result)) {
            $data->cod = $row['cmp_nome'];
        };
        $file = $line . '_' . $data->cod . ".jpg";
        $pathFile = $path . $file;
        unlink($pathFile);
        $sql = "DELETE FROM vetrine WHERE cmp_id='$data->id'";
        mysqli_query($con, $sql) or die(mysqli_error($con));
        echo "Deleted";
        break;
    case 'update':
        $codiceOriginale = false;
        $result = mysqli_query($con, "SELECT cmp_nome FROM vetrine WHERE cmp_id = '$data->id'");
        while ($row = mysqli_fetch_array($result)) {
            $codiceOriginale = $row['cmp_nome'];
        };
        $file = $line . '_' . $codiceOriginale . ".jpg";
        $originalePathFile = $path . $file;
        if ($codiceOriginale !== $data->cod) {
            rename($originalePathFile, $pathFile);
        }
        if (substr($data->image, 0, 4) === 'data') {
            $image = explode('base64,', $data->image);
            file_put_contents($pathFile, base64_decode($image[1]));
        }
        $sql = "UPDATE vetrine SET
                    cmp_nome         = '$data->cod',
                    cmp_title       = '$title',
                    cmp_mark_id     = '$mark_id',
                    cmp_line_id     = '$line_id',
                    cmp_cat_id         = '$data->cat',
                    cmp_note        = '$note',
                    cmp_settore        = '$settore',
                    cmp_show         = '$data->show',
                    cmp_pos         = '$data->pos'
                    WHERE cmp_id='$data->id'";
        mysqli_query($con, $sql) or die(mysqli_error($con));
        echo "Updated";
        break;
}

mysqli_close($con);

