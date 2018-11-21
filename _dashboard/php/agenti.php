<?php
include "connessione.php";
include "funzioni.php";

if ($_GET['type'] !== 'get') {
    $data = json_decode(file_get_contents("php://input"));
    $nome = htmlentities($data->nome, ENT_QUOTES, 'UTF-8');
}

switch ($_GET['type']) {
    case 'get' :
        $result_array = array();
        $sql = "SELECT * FROM agenti ORDER BY agenti_nome";
        $result = mysqli_query($con, $sql);
        while ($row = $result->fetch_assoc()) {
            $row['agenti_id'] = intval($row['agenti_id']);
            $row['agenti_riv'] = intval($row['agenti_riv']);
            array_push($result_array, $row);
        }
        echo json_encode($result_array);
        break;
    case 'new':
        $sql = "INSERT INTO agenti (agenti_nome, agenti_email, agenti_psw, agenti_riv, agenti_tel) VALUES ('$nome', '$data->email', '$data->password', '$data->riv', '$data->tel')";
        mysqli_query($con, $sql) or die(mysqli_error($con));
        echo "Created";
        break;
    case 'delete':
        $sql = "DELETE FROM agenti WHERE agenti_id='$data->id'";
        mysqli_query($con, $sql) or die(mysqli_error($con));
        echo "Deleted";
        break;
    case 'update':
        $sql = "UPDATE agenti SET
              agenti_nome = '$nome',
              agenti_email = '$data->email',
              agenti_psw = '$data->password',
              agenti_tel = '$data->tel',
              agenti_riv = '$data->riv'
              WHERE agenti_id='$data->id'";
        mysqli_query($con, $sql) or die(mysqli_error($con));
        echo "Updated";
        break;
}

mysqli_close($con);

