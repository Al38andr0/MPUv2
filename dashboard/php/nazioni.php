<?php
include('connessione.php');

if ($_GET['type'] !== 'get') {
    $data = json_decode(file_get_contents("php://input"));
    $nome = addslashes($data->nome);
}
switch ($_GET['type']) {
    case 'get' :
        $result_array = array();
        $sql = "SELECT * FROM nazioni ORDER BY nazioni_nome";
        $result = mysqli_query($con, $sql);
        while ($row = $result->fetch_assoc()) {
            array_push($result_array, $row);
        }
        echo json_encode($result_array, JSON_NUMERIC_CHECK);
        break;
    case 'new':
        $sql = "INSERT INTO nazioni (nazioni_nome, nazioni_show, nazioni_prefisso) VALUES ('$nome', '$data->show', '$data->prx')";
        mysqli_query($con, $sql) or die(mysqli_error($con));
        echo "Created";
        break;
    case 'delete':
        $sql = "DELETE FROM nazioni WHERE nazioni_id = '$data->id'";
        mysqli_query($con, $sql) or die(mysqli_error($con));
        echo "Deleted";
        break;
    case 'update':
        $sql = "UPDATE nazioni SET
              nazioni_nome = '$nome',
              nazioni_show = '$data->show',
              nazioni_prefisso = '$data->prx'
            WHERE nazioni_id = '$data->id'";
        mysqli_query($con, $sql) or die(mysqli_error($con));
        echo "Updated";
        break;
}

mysqli_close($con);

