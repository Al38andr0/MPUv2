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
        $sql = "SELECT * FROM settori_linee";
        $result = mysqli_query($con, $sql);
        while ($row = $result->fetch_assoc()) {
            $row['stln_id'] = json_decode($row['stln_id']);
            $row['stln_line_id'] = json_decode($row['stln_line_id']);
            $row['stln_mark_id'] = json_decode($row['stln_mark_id']);
            $row['stln_price'] = json_decode($row['stln_price']);
            $row['stln_set_id'] = json_decode($row['stln_set_id']);
            $row['stln_show'] = json_decode($row['stln_show']);
            $row['stln_manager'] = json_decode($row['stln_manager']);
            array_push($result_array, $row);
        }
        echo json_encode($result_array);
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

