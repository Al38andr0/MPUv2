<?php
include "connessione.php";
include "funzioni.php";


if($_GET['type'] == 'save' && $_GET['type'] != 'db') {

    $data = json_decode(file_get_contents("php://input"));
    $fp = fopen('../json/province.json', 'w');
    fwrite($fp, json_encode($data));
    fclose($fp);

} elseif ($_GET['type'] == 'db'){

    function provinceJson($con) {
        $array = [];
        $result = mysqli_query($con,"SELECT * FROM province");
        while($row = mysqli_fetch_array($result)) {
            $row_array['i'] = (int)$row['provincia_id'];
            $row_array['n'] = html_entity_decode($row['provincia']);
            $row_array['c'] = $row['sigla'];
            $row_array['r'] = (int)$row['regione_id'];
            $row_array['z'] = (int)$row['nazione_id'];
            $row_array['t'] = (int)$row['trasporto'];
            $row_array['j'] = (int)$row['trasporto_type'];
            $row_array['m'] = (int)$row['montaggio'];
            $row_array['k'] = (int)$row['montaggio_type'];
            $row_array['l'] = (int)$row['limite'];
            $row_array['b'] = (int)$row['minimo'];

            array_push($array,$row_array);
        }
        $fp = fopen('../json/province.json', 'w');
        $out = array_values($array);
        fwrite($fp, json_encode($out));
        fclose($fp);
    }

    provinceJson($con);

} else {

    $data = json_decode(file_get_contents("php://input"));
    $nome = addslashes($data->nome);

    switch ($_GET['type']) {
        case 'new':
            $sql = "INSERT INTO province (
              provincia_id, provincia, sigla, nazione_id, regione_id, trasporto, trasporto_type, montaggio, montaggio_type, limite, minimo
              ) VALUES (
              '$data->id', '$nome', '$data->sigla', '$data->nazione', '$data->regione', '$data->trasporto', '$data->trasporto_type', '$data->montaggio', '$data->montaggio_type', '$data->limite', '$data->minimo'
              )";
            mysqli_query($con,$sql) or die(mysqli_error($con));
            break;
        case 'delete':
            $sql="DELETE FROM province WHERE provincia_id = '$data->id'";
            mysqli_query($con,$sql) or die(mysqli_error($con));
            break;
        case 'update':
            $sql="UPDATE province SET
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
            mysqli_query($con,$sql) or die(mysqli_error($con));
            break;
    }
}

echo "DONE";

mysqli_close($con);

