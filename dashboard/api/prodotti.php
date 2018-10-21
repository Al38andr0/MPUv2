<?php
include('../php/connessione.php');
header('Content-Type: application/json');

$result_array = array();

$_GET['action'] = 'getAll';
//$_GET['action'] = 'getAllByLinea';
//$_GET['id'] = 34;

if (!isset($_GET['action'])) {
    $result_array = 'No action has been defined';
}

if (!isset($result_array['error'])) {
    switch ($_GET['action']) {
        case 'getAll':
            $sql = "SELECT DISTINCT * FROM prodotti";
            $result = mysqli_query($con, $sql);
            if ($result->num_rows > 0) {
                while($row = $result->fetch_assoc()) {
                    array_push($result_array, $row);
                }
                echo json_encode($result_array);
            } else {
                $result = 'Not found function ' . $_GET['id'];
            }
            break;
        case 'getAllByLinea':
            $sql = "SELECT DISTINCT * FROM prodotti WHERE prd_line_id =  " . $_GET['id'];
            $result = mysqli_query($con, $sql);
            if ($result->num_rows > 0) {
                while($row = $result->fetch_assoc()) {
                    array_push($result_array, $row);
                }
                echo json_encode($result_array);
            } else {
                $result = 'Not linea function ' . $_GET['id'];
            }
            break;
        case 'getAllByMarchio':
            $sql = "SELECT DISTINCT * FROM prodotti WHERE prd_mark_id =  " . $_GET['id'];
            $result = mysqli_query($con, $sql);
            if ($result->num_rows > 0) {
                while($row = $result->fetch_assoc()) {
                    array_push($result_array, $row);
                }
                echo json_encode($result_array);
            } else {
                $result = 'Not marchio function ' . $_GET['id'];
            }
            break;
        default:
            $result = 'Not found function ' . $_GET['action'];
            break;
    }

}

$con->close();