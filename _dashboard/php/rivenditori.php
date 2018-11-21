<?php
include('connessione.php');
include('funzioni.php');

$notes = false;

if ($_GET['type'] !== 'get') {
    $data = json_decode(file_get_contents("php://input"));

    $path = '../archivio_dati/Rivenditori/';
    $nome = addslashes($data->nome);
    $rif = addslashes($data->rif);
    $sede = addslashes($data->sede);
    $notes = addslashes($data->notes);
    $mark_array = json_encode($data->mark);

    if($_GET['type'] !== 'new') {
        $file = $data->id . ".jpg";
        $pathFile = $path . $file;
    }
}

switch ($_GET['type']) {
    case 'get' :
        $result_array = array();
        $sql = "SELECT * FROM rivenditori ORDER BY riv_nome";
        $result = mysqli_query($con, $sql);
        while ($row = $result->fetch_assoc()) {
            $row['riv_mark'] = json_decode($row['riv_mark']);
            $row['riv_naz'] = intval($row['riv_naz']);
            $row['riv_reg'] = intval($row['riv_reg']);
            $row['riv_prov'] = intval($row['riv_prov']);
            $row['riv_conv'] = intval($row['riv_conv']);
            $row['riv_minimo'] = intval($row['riv_minimo']);
            $row['riv_limite'] = intval($row['riv_limite']);
            $row['riv_trasporto'] = intval($row['riv_trasporto']);
            $row['riv_trasporto_type'] = intval($row['riv_trasporto_type']);
            $row['riv_montaggio'] = intval($row['riv_montaggio']);
            $row['riv_montaggio_type'] = intval($row['riv_montaggio_type']);
            array_push($result_array, $row);
        }
        echo json_encode($result_array);
        break;
    case 'new':
        $sql = "INSERT INTO rivenditori (
              riv_nome,
              riv_naz,
              riv_reg,
              riv_prov,
              riv_conv,
              riv_rif,
              riv_sede,
              riv_tel,
              riv_fax,
              riv_cell,
              riv_web,
              riv_email,
              riv_psw,
              riv_limite,
              riv_minimo,
              riv_trasporto,
              riv_trasporto_type,
              riv_montaggio,
              riv_montaggio_type,
              riv_mark,
              riv_notes
            ) VALUES (
              '$nome',
              '$data->naz',
              '$data->reg',
              '$data->prov',
              '$data->conv',
              '$rif',
              '$sede',
              '$data->tel',
              '$data->fax',
              '$data->cell',
              '$data->web',
              '$data->email',
              '$data->psw',
              '$data->limite',
              '$data->minimo',
              '$data->trasporto',
              '$data->trasporto_type',
              '$data->montaggio',
              '$data->montaggio_type',
              '$mark_array',
              '$notes'
            )";
        mysqli_query($con, $sql) or die(mysqli_error($con));

        $sqlGet = "SELECT riv_id FROM rivenditori WHERE riv_id = (SELECT MAX(riv_id) FROM rivenditori)";
        $result = mysqli_query($con, $sqlGet);
        while ($row = $result->fetch_assoc()) {
            $file = $row['riv_id'] . ".jpg";
            $pathFile = $path . $file;

            if (substr($data->image, 0, 4) === 'data') {
                $image = explode('base64,', $data->image);
                file_put_contents($pathFile, base64_decode($image[1]));
            }
        }
        echo "Created";
        break;
    case 'delete':
        $sql = "DELETE FROM rivenditori WHERE riv_id='$data->id'";
        mysqli_query($con, $sql) or die(mysqli_error($con));
        unlink($pathFile);
        echo "Deleted";
        break;
    case 'update':
        $result = mysqli_query($con, "SELECT * FROM rivenditori WHERE riv_id='$data->id'");
        $sql = "UPDATE rivenditori SET
                riv_nome = '$nome',
                riv_naz = '$data->naz',
                riv_reg = '$data->reg',
                riv_prov = '$data->prov',
                riv_conv = '$data->conv',
                riv_rif = '$rif',
                riv_sede = '$sede',
                riv_notes = '$notes',
                riv_tel = '$data->tel',
                riv_cell = '$data->cell',
                riv_fax = '$data->fax',
                riv_web = '$data->web',
                riv_email = '$data->email',
                riv_psw = '$data->psw',
                riv_limite = '$data->limite',
                riv_minimo = '$data->minimo',
                riv_trasporto = '$data->trasporto',
                riv_trasporto_type = '$data->trasporto_type',
                riv_montaggio = '$data->montaggio',
                riv_montaggio_type = '$data->montaggio_type',
                riv_mark = '$mark_array'
            WHERE riv_id='$data->id'";
        mysqli_query($con, $sql) or die(mysqli_error($con));
        if (substr($data->image, 0, 4) === 'data') {
            $image = explode('base64,', $data->image);
            file_put_contents($pathFile, base64_decode($image[1]));
        }
        echo "Updated";
        break;
}

mysqli_close($con);

