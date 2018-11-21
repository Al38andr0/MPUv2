<?php
include('../php/connessione.php');
header('Content-Type: application/json');

$result_array = array();

//$_GET['action'] = 'getAll';

if (!isset($_GET['action'])) {
    $result_array = 'No action has been defined';
}

if (!isset($result_array['error'])) {
    switch ($_GET['action']) {
        case 'getAll':
            $sql = "SELECT mark_id, mark_nome, mark_cat_array, mark_disc, mark_list FROM marchi WHERE mark_show = 1";
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
        default:
            $result = 'Not found function ' . $_GET['action'];
            break;
    }

}

$con->close();