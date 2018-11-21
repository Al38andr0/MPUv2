<?php
include('../php/connessione.php');
header('Content-Type: application/json');

$result_array = array();

//$_GET['action'] = 'getAll';
//$_GET['action'] = 'getByProv';
//$_GET['prov'] = 'Roma';

if (!isset($_GET['action'])) {
    $result_array = 'No action has been defined';
}

$provincia = ($_GET['prov'] === 'mpu') ? 'Roma' : $_GET['prov'];

if (!isset($result_array['error'])) {
    switch ($_GET['action']) {
        case 'getAll':
            $sql = "SELECT regioni_nome, provincia, riv_email, riv_nome FROM rivenditori JOIN nazioni ON rivenditori.riv_naz = nazioni.nazioni_id JOIN regioni ON rivenditori.riv_reg = regioni.regioni_id  JOIN province ON rivenditori.riv_prov = province.provincia_id";
            $result = mysqli_query($con, $sql);
            if ($result->num_rows > 0) {
                while($row = $result->fetch_assoc()) {
                    array_push($result_array, $row);
                }
                echo json_encode($result_array);
            } else {
                $result = 'Not found function ' . $_GET['action'];
            }
            break;
        case 'getByProv':
            $sql = "SELECT riv_conv, riv_nome, riv_rif, riv_sede, riv_tel, riv_cell, riv_fax, riv_email, riv_minimo, riv_limite, riv_web, riv_trasporto, riv_trasporto_type, riv_montaggio, riv_montaggio_type, riv_mark, riv_coords, riv_notes, nazioni_nome, nazioni_prefisso, regioni_nome, provincia, sigla  FROM rivenditori JOIN nazioni ON rivenditori.riv_naz = nazioni.nazioni_id JOIN regioni ON rivenditori.riv_reg = regioni.regioni_id  JOIN province ON rivenditori.riv_prov = province.provincia_id WHERE provincia = '" . $provincia . "'";
            $result = mysqli_query($con, $sql);
            if ($result->num_rows > 0) {
                while($row = $result->fetch_assoc()) {
                    array_push($result_array, $row);
                }
                echo json_encode($result_array[0]);
            } else {
                $result = 'Not found function ' . $_GET['action'];
            }
            break;
        default:
            $result = 'Not found function ' . $_GET['action'];
            break;
    }

}

$con->close();