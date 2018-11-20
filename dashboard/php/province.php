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
        $sql = "SELECT * FROM province ORDER BY provincia";
        $result = mysqli_query($con, $sql);
        while ($row = $result->fetch_assoc()) {
            array_push($result_array, $row);
        }
        echo json_encode($result_array, JSON_NUMERIC_CHECK);
        break;
    case 'new':
        $sql = "INSERT INTO province (provincia, sigla, nazione_id, regione_id, trasporto, trasporto_type, montaggio, montaggio_type, limite, minimo
              ) VALUES (
              '$nome', '$data->sigla', '$data->nazione', '$data->regione', '$data->trasporto', '$data->trasporto_type', '$data->montaggio', '$data->montaggio_type', '$data->limite', '$data->minimo'
              )";
        mysqli_query($con, $sql) or die(mysqli_error($con));
        echo "Created";
        break;
    case 'delete':
        $sql = "DELETE FROM province WHERE provincia_id = '$data->id'";
        mysqli_query($con, $sql) or die(mysqli_error($con));
        echo "Deleted";
        break;
    case 'update':
        $sql = "UPDATE province SET
              provincia = '$nome',
              sigla = '$data->sigla',
              nazione_id = '$data->nazione',
              regione_id = '$data->regione',
              trasporto = '$data->trasporto',
              trasporto_type = '$data->trasporto_type',
              montaggio = '$data->montaggio',
              montaggio_type = '$data->montaggio_type',
              limite = '$data->limite',
              minimo = '$data->minimo'
              WHERE provincia_id = '$data->id'";
        mysqli_query($con, $sql) or die(mysqli_error($con));
        echo "Updated";
        break;
}

mysqli_close($con);

