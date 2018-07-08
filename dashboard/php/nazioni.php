<?php
include('connessione.php');

if($_GET['type'] == 'save' && $_GET['type'] != 'db') {

    $data = json_decode(file_get_contents("php://input"));
    $fp = fopen('../json/nazioni.json', 'w');
    fwrite($fp, json_encode($data));
    fclose($fp);

} elseif ($_GET['type'] == 'db'){

    function catJson($con) {
        $array = [];
        $result = mysqli_query($con,"SELECT * FROM nazioni ORDER BY nazioni_nome");
        while($row= mysqli_fetch_array($result)) {
            $row_array['i'] = (int)$row['nazioni_id'];
            $row_array['n'] = html_entity_decode($row['nazioni_nome']);
            $row_array['v'] = (int)$row['nazioni_show'];
            $row_array['x'] = (int)$row['nazioni_prefisso'];

            array_push($array,$row_array);
        }
        $fp = fopen('../json/nazioni.json', 'w');
        $out = array_values($array);
        fwrite($fp, json_encode($out));
        fclose($fp);
    }
    catJson($con);

} else {

    $data = json_decode(file_get_contents("php://input"));
    $nome = addslashes($data->nome);

    switch ($_GET['type']) {
        case 'new':
            $sql="INSERT INTO nazioni (nazioni_id, nazioni_nome, nazioni_show, nazioni_prefisso) VALUES ('$data->id', '$nome', '$data->show', '$data->prx')";
            mysqli_query($con,$sql) or die(mysqli_error($con));
            break;
        case 'delete':
            $sql="DELETE FROM nazioni WHERE nazioni_id = '$data->id'";
            mysqli_query($con,$sql) or die(mysqli_error($con));
            break;
        case 'update':
            $sql="UPDATE nazioni SET
              nazioni_nome = '$nome',
              nazioni_show = '$data->show',
              nazioni_prefisso = '$data->prx'
            WHERE nazioni_id = '$data->id'";
            mysqli_query($con,$sql) or die(mysqli_error($con));
            break;
    }
}

echo "DONE";

mysqli_close($con);

