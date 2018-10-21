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
            $sql = "SELECT DISTINCT mark_id, mark_nome, mark_cat_array, mark_disc, mark_list, line_id, line_nome, line_time, line_vtr, line_price, line_pos, line_spec_file, line_pdf_file, line_disc, line_war, stln_set_id FROM marchi JOIN linee ON marchi.mark_id = linee.line_mark_id JOIN settori_linee ON linee.line_id = settori_linee.stln_line_id WHERE mark_show = 1 AND line_show = 1";
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