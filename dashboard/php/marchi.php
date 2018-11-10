<?php
include "connessione.php";
include "funzioni.php";

if ($_GET['type'] !== 'get') {
    $data = json_decode(file_get_contents("php://input"));
    $nome = addslashes($data->nome);
    $pathNome = str_replace(" ", "_", $data->nome);
    $cat_array = json_encode($data->cat_array);

    $path = '../archivio_dati/' . $pathNome;
}

switch ($_GET['type']) {
    case 'get' :
        $result_array = array();
        $sql = "SELECT * FROM marchi";
        $result = mysqli_query($con, $sql);
        while ($row = $result->fetch_assoc()) {
            array_push($result_array, $row);
        }
        echo json_encode($result_array, JSON_NUMERIC_CHECK);
        break;
    case 'new':
        mkdir($path);
        mkdir($path . "/Finiture");
        $sql = "INSERT INTO marchi (mark_nome, mark_show, mark_disc, mark_list, mark_cat_array) VALUES ('$nome', '$data->show', '$data->disc', '$data->list', '$cat_array')";
        mysqli_query($con, $sql) or die(mysqli_error($con));
        echo "Created";
        break;
    case 'delete':
        deleteDirectory($path);
        $sql = "DELETE FROM marchi WHERE mark_id='$data->id'";
        mysqli_query($con, $sql) or die(mysqli_error($con));
        echo "Deleted";
        break;
    case 'update':
        $result = mysqli_query($con, "SELECT * FROM marchi WHERE mark_id='$data->id'");
        while ($row = mysqli_fetch_array($result)) {
            $oldNome = str_replace(" ", "_", $row['mark_nome']);
        };
        $oldPath = '../archivio_dati/' . $oldNome;
        rename($oldPath, $path);
        $sql = "UPDATE marchi SET mark_nome='$nome', mark_show='$data->show' , mark_disc='$data->disc' , mark_list='$data->list' , mark_cat_array='$cat_array' WHERE mark_id='$data->id'";
        mysqli_query($con, $sql) or die(mysqli_error($con));
        echo "Updated";
        break;
}

mysqli_close($con);

