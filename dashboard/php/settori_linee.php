<?php
include('connessione.php');
include('funzioni.php');

if ($_GET['type'] !== 'get') {
    $data = json_decode(file_get_contents("php://input"));
    $mark = str_replace(' ', '_', convertMark($data->mark, $con));
    $line = str_replace(' ', '_', convertLine($data->line, $con));
    $set = str_replace(' ', '_', convertSet($data->set, $con));

    $file = $line . "_" . $set . ".jpg";
    $path = '../archivio_dati/' . $mark . '/' . $line . '/Vetrina/';
    $pathFile = $path . $file;
}

switch ($_GET['type']) {
    case 'get' :
        $result_array = array();
        $sql = "SELECT * FROM settori_linee sl JOIN marchi m ON sl.stln_mark_id = m.mark_id JOIN linee l ON sl.stln_line_id = l.line_id JOIN settori s ON sl.stln_set_id = set_id ORDER BY line_nome";
        $result = mysqli_query($con, $sql);
        while ($row = $result->fetch_assoc()) {
            array_push($result_array, $row);
        }
        echo json_encode($result_array, JSON_NUMERIC_CHECK);
        break;
    case 'new':
        $sql = "INSERT INTO settori_linee (
                stln_mark_id,
                stln_line_id,
                stln_set_id,
                stln_show,
                stln_price
              ) VALUES (
                '$data->mark',
                '$data->line',
                '$data->set',
                '$data->show',
                '$data->price'
              )";
        mysqli_query($con, $sql) or die(mysqli_error($con));

        $image = explode('base64,', $data->image);
        file_put_contents($pathFile, base64_decode($image[1]));
        echo "Created";
        break;
    case 'delete':
        $sql = "DELETE FROM settori_linee WHERE stln_id='$data->id'";
        mysqli_query($con, $sql) or die(mysqli_error($con));
        unlink($pathFile);
        echo "Deleted";
        break;
    case 'update':
        $oldSet = null;
        $result = mysqli_query($con, "SELECT stln_set_id FROM settori_linee WHERE stln_id='$data->id'");
        while ($row = mysqli_fetch_array($result)) {
            $oldSet = $row['stln_set_id'];
        };
        $sql = "UPDATE settori_linee SET
                  stln_mark_id='$data->mark',
                  stln_line_id='$data->line',
                  stln_set_id='$data->set',
                  stln_show='$data->show',
                  stln_price='$data->price'
                  WHERE
                  stln_id='$data->id'";

        mysqli_query($con, $sql) or die(mysqli_error($con));
        echo "Updated";
        break;
}

mysqli_close($con);

