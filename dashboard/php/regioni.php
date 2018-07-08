<?php
include "connessione.php";
include "funzioni.php";


if($_GET['type'] == 'save' && $_GET['type'] != 'db') {

    $data = json_decode(file_get_contents("php://input"));
    $fp = fopen('../json/regioni.json', 'w');
    fwrite($fp, json_encode($data));
    fclose($fp);

} elseif ($_GET['type'] == 'db'){

    function regioniJson($con) {
        $array = [];
        $result = mysqli_query($con,"SELECT * FROM regioni");
        while($row = mysqli_fetch_array($result)) {
            $row_array['i'] = (int)$row['regioni_id'];
            $row_array['n'] = html_entity_decode($row['regioni_nome']);
            $row_array['z'] = (int)$row['regioni_nazione'];

            array_push($array,$row_array);
        }
        $fp = fopen('../json/regioni.json', 'w');
        $out = array_values($array);
        fwrite($fp, json_encode($out));
        fclose($fp);
    }

    regioniJson($con);

} else {

    $data = json_decode(file_get_contents("php://input"));
    $nome = addslashes($data->nome);

    switch ($_GET['type']) {
        case 'new':
            $sql="INSERT INTO regioni (regioni_id, regioni_nome, regioni_nazione) VALUES ('$data->id', '$nome', '$data->nazione')";
            mysqli_query($con,$sql) or die(mysqli_error($con));
            break;
        case 'delete':
            $sql="DELETE FROM regioni WHERE regioni_id='$data->id'";
            mysqli_query($con,$sql) or die(mysqli_error($con));
            break;
        case 'update':
            $sql="UPDATE regioni SET
              regioni_nome = '$nome',
              regioni_nazione = '$data->nazione'
              WHERE regioni_id='$data->id'";
            mysqli_query($con,$sql) or die(mysqli_error($con));
            break;
    }
}

echo "DONE";

mysqli_close($con);

