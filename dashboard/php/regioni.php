<?php
include "connessione.php";
include "funzioni.php";


if ($_GET['type'] !== 'get') {
    $data = json_decode(file_get_contents("php://input"));
    $nome = addslashes($data->nome);
}
switch ($_GET['type']) {
    case 'get' :
        $result_array = array();
        $sql = "SELECT * FROM regioni ORDER BY regioni_nome";
        $result = mysqli_query($con, $sql);
        while ($row = $result->fetch_assoc()) {
            array_push($result_array, $row);
        }
        echo json_encode($result_array, JSON_NUMERIC_CHECK);
        break;
    case 'new':
        $sql = "INSERT INTO regioni (regioni_nome, regioni_nazione) VALUES ('$nome', '$data->nazione')";
        mysqli_query($con, $sql) or die(mysqli_error($con));
        echo "Created";
        break;
    case 'delete':
        $sql = "DELETE FROM regioni WHERE regioni_id='$data->id'";
        mysqli_query($con, $sql) or die(mysqli_error($con));
        echo "Deleted";
        break;
    case 'update':
        $sql = "UPDATE regioni SET
              regioni_nome = '$nome',
              regioni_nazione = '$data->nazione'
              WHERE regioni_id='$data->id'";
        mysqli_query($con, $sql) or die(mysqli_error($con));
        echo "Updated";
        break;
}

mysqli_close($con);

