<?php
include('connessione.php');

if ($_GET['type'] !== 'get') {
    $data = json_decode(file_get_contents("php://input"));
    $nome = addslashes($data->nome);
}

switch ($_GET['type']) {
    case 'get' :
        $result_array = array();
        $sql = "SELECT * FROM tabelle_prodotti ORDER BY tbpr_pos";
        $result = mysqli_query($con, $sql);
        while ($row = $result->fetch_assoc()) {
            array_push($result_array, $row);
        }
        echo json_encode($result_array, JSON_NUMERIC_CHECK);
        break;
    case 'new':
        $sql = "INSERT INTO tabelle_prodotti (tbpr_nome, tbpr_pos, tbpr_mark_id) VALUES ('$nome', '$data->pos', '$data->mark')";
        mysqli_query($con, $sql) or die(mysqli_error($con));
        echo "Created";
        break;
    case 'delete':
        $sql = "DELETE FROM tabelle_prodotti WHERE tbpr_id='$data->id'";
        mysqli_query($con, $sql) or die(mysqli_error($con));
        echo "Deleted";
        break;
    case 'update':
        $sql = "UPDATE tabelle_prodotti SET tbpr_pos='$data->pos', tbpr_nome='$nome', tbpr_mark_id='$data->mark' WHERE tbpr_id='$data->id'";
        mysqli_query($con, $sql) or die(mysqli_error($con));
        echo "Updated";
        break;
}

mysqli_close($con);

