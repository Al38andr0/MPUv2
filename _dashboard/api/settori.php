<?php
include('../php/connessione.php');
header('Content-Type: application/json');

$result_array = array();

//$_GET['action'] = 'getAll';
//$_GET['action'] = 'getDescription';
//$_GET['param'] = 7;

if (!isset($_GET['action'])) {
    $result_array = 'No action has been defined';
}

if (!isset($result_array['error'])) {
    switch ($_GET['action']) {
        case 'getAll':
            $sql = "SELECT set_id, set_nome, cat_id, cat_nome, cat_pos FROM settori JOIN categorie ON settori.set_cat_id = categorie.cat_id WHERE set_show = 1";
            $result = mysqli_query($con, $sql);
            if ($result->num_rows > 0) {
                while($row = $result->fetch_assoc()) {
                    array_push($result_array, $row);
                }
                echo json_encode($result_array, JSON_NUMERIC_CHECK);
            } else {
                $result = 'Empty table';
            }
            break;
        case 'getDescription':
            $sql = "SELECT set_txt FROM settori WHERE set_id = " . $_GET['param'];
            $result = mysqli_query($con, $sql);
            if ($result->num_rows > 0) {
                while($row = $result->fetch_assoc()) {
                    array_push($result_array, $row);
                }
                echo json_encode($result_array);
            } else {
                $result = 'Not found settore id ' . $_GET['param'];
            }
            break;
        default:
            $result = 'Not found function ' . $_GET['action'];
            break;
    }

}

$con->close();