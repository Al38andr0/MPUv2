<?php
include "connessione.php";
include "funzioni.php";

function agentiJsonOnline($con) {
    $array = [];
    $result = mysqli_query($con,"SELECT * FROM agenti");
    while($row = mysqli_fetch_array($result)) {
        $row_array['i'] = (int)$row['agenti_id'];
        $row_array['n'] = html_entity_decode($row['agenti_nome']);
        $row_array['e'] = $row['agenti_email'];
        $row_array['t'] = $row['agenti_tel'];
        $row_array['r'] = (int)$row['agenti_riv'];

        array_push($array,$row_array);
    }
    $fp = fopen('../json/age.json', 'w');
    $out = array_values($array);
    fwrite($fp, json_encode($out));
    fclose($fp);
}

if($_GET['type'] == 'save' && $_GET['type'] != 'db') {

    $data = json_decode(file_get_contents("php://input"));
    $fp = fopen('../json/agenti.json', 'w');
    fwrite($fp, json_encode($data));
    fclose($fp);
    agentiJsonOnline($con);

} elseif ($_GET['type'] == 'db'){

    function agentiJson($con) {
        $array = [];
        $result = mysqli_query($con,"SELECT * FROM agenti");
        while($row = mysqli_fetch_array($result)) {
            $row_array['i'] = (int)$row['agenti_id'];
            $row_array['n'] = html_entity_decode($row['agenti_nome']);
            $row_array['e'] = $row['agenti_email'];
            $row_array['p'] = $row['agenti_psw'];
            $row_array['t'] = $row['agenti_tel'];
            $row_array['r'] = (int)$row['agenti_riv'];

            array_push($array,$row_array);
        }
        $fp = fopen('../json/agenti.json', 'w');
        $out = array_values($array);
        fwrite($fp, json_encode($out));
        fclose($fp);
    }

    agentiJson($con);
    agentiJsonOnline($con);

} else {

    $data = json_decode(file_get_contents("php://input"));
    $nome = addslashes($data->nome);

    switch ($_GET['type']) {
        case 'new':
            $sql="INSERT INTO agenti (agenti_id, agenti_nome, agenti_email, agenti_psw, agenti_riv, agenti_tel) VALUES ('$data->id', '$nome', '$data->email', '$data->password', '$data->riv', '$data->tel')";
            mysqli_query($con,$sql) or die(mysqli_error($con));
            break;
        case 'delete':
            $sql="DELETE FROM agenti WHERE agenti_id='$data->id'";
            mysqli_query($con,$sql) or die(mysqli_error($con));
            break;
        case 'update':
            $sql="UPDATE agenti SET
              agenti_nome = '$nome',
              agenti_email = '$data->email',
              agenti_psw = '$data->password',
              agenti_tel = '$data->tel',
              agenti_riv = '$data->riv'
              WHERE agenti_id='$data->id'";
            mysqli_query($con,$sql) or die(mysqli_error($con));
            break;
    }
}

echo "DONE";

mysqli_close($con);

