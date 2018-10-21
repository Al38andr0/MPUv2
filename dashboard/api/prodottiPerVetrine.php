<?php
include('../php/connessione.php');
header('Content-Type: application/json');

$result_array = array();

//$_GET['action'] = 'getAllByMarchio';
//$_GET['id'] = 44;

if (!isset($_GET['action'])) {
    $result_array = 'No action has been defined';
}

if (!isset($result_array['error'])) {
    switch ($_GET['action']) {
        case 'getAllByVetrina':
            $sql = "SELECT DISTINCT * FROM composizioni_prodotti WHERE cmpr_comp =  " . $_GET['id'];
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
            $sql = "SELECT DISTINCT * FROM composizioni_prodotti WHERE cmpr_mark_id =  " . $_GET['id'];
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
        default:
            $result = 'Not found function ' . $_GET['action'];
            break;
    }

}

$con->close();