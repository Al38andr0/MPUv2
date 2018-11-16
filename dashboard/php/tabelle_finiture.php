<?php
include('connessione.php');

if ($_GET['type'] !== 'get') {
    $data = json_decode(file_get_contents("php://input"));
    $nome = htmlentities($data->nome, ENT_QUOTES, 'UTF-8');
}

switch ($_GET['type']) {
    case 'get' :
        $result_array = array();
        $sql = "SELECT * FROM tabelle_finiture ORDER BY tab_nome";
        $result = mysqli_query($con, $sql);
        while ($row = $result->fetch_assoc()) {
            array_push($result_array, $row);
        }
        echo json_encode($result_array, JSON_NUMERIC_CHECK);
        break;
    case 'new':
        $sql = "INSERT INTO tabelle_finiture (tab_nome, tab_mark_id, tab_line_id) VALUES ('$nome', '$data->mark', '$data->line')";
        mysqli_query($con, $sql) or die(mysqli_error($con));
        echo "Created";
        break;
    case 'delete':
        $sql = "DELETE FROM tabelle_finiture WHERE tab_id='$data->id'";
        mysqli_query($con, $sql) or die(mysqli_error($con));
        echo "Deleted";
        break;
    case 'update':
        $sql = "UPDATE tabelle_finiture SET tab_nome='$nome', tab_mark_id='$data->mark' , tab_line_id='$data->line' WHERE tab_id='$data->id'";
        mysqli_query($con, $sql) or die(mysqli_error($con));
        echo "Updated";
        break;
}

mysqli_close($con);

