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
            $sql = "SELECT DISTINCT mark_id, mark_nome, mark_cat_array, mark_disc, mark_list, line_id, line_nome, line_time, line_vtr, line_pos, line_spec_file, line_pdf_file, line_disc, line_war, stln_set_id, stln_price FROM marchi m JOIN linee l ON m.mark_id = l.line_mark_id JOIN settori_linee s ON l.line_id = s.stln_line_id WHERE mark_show = 1 AND line_show = 1";
            $result = mysqli_query($con, $sql);
            if ($result->num_rows > 0) {
                while($row = $result->fetch_assoc()) {
                    $row['mark_cat_array'] = json_decode($row['mark_cat_array']);
                    $row['line_disc'] = intval($row['line_disc']);
                    $row['line_id'] = intval($row['line_id']);
                    $row['line_pdf_file'] = intval($row['line_pdf_file']);
                    $row['line_pos'] = intval($row['line_pos']);
                    $row['line_spec_file'] = intval($row['line_spec_file']);
                    $row['line_time'] = intval($row['line_time']);
                    $row['line_vtr'] = intval($row['line_vtr']);
                    $row['line_war'] = intval($row['line_war']);
                    $row['mark_disc'] = intval($row['mark_disc']);
                    $row['mark_id'] = intval($row['mark_id']);
                    $row['mark_list'] = intval($row['mark_list']);
                    $row['stln_price'] = intval($row['stln_price']);
                    $row['stln_set_id'] = intval($row['stln_set_id']);
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