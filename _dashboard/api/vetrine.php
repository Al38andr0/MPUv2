<?php
include('../php/connessione.php');
header('Content-Type: application/json');

$result_array = array();

//$_GET['action'] = 'getAllByLinea';
//$_GET['id'] = 139;

if (!isset($_GET['action'])) {
    $result_array = 'No action has been defined';
}

if (!isset($result_array['error'])) {
    switch ($_GET['action']) {
        case 'getAllByLinea':
            $sql = "SELECT DISTINCT * FROM vetrine WHERE cmp_show = 1 AND cmp_line_id =  " . $_GET['id'];
            $result = mysqli_query($con, $sql);
            if ($result->num_rows > 0) {
                while($row = $result->fetch_assoc()) {
                    $sql_prodotti = "SELECT DISTINCT cmpr_tab, cmpr_qnt, prd_id, prd_title, prd_cod, prd_dim, prd_price_array, prd_note, prd_abb, prd_fin, tab_nome, abb_cod, abb_array FROM vetrine_prodotti c JOIN prodotti p on c.cmpr_prd = p.prd_id JOIN tabelle_finiture f on c.cmpr_tab = f.tab_id JOIN abbinamenti a on c.cmpr_cod = a.abb_id WHERE cmpr_comp = " . $row['cmp_id'] . " ORDER BY cmpr_pos ASC";
                    $result_prodotti = mysqli_query($con, $sql_prodotti);
                    $row['prodotti'] = [];
                    while($row_prodotti = $result_prodotti->fetch_assoc()) {
                        $row_prodotti['abb_array'] = json_decode($row_prodotti['abb_array']);
                        $row_prodotti['prd_price_array'] = json_decode($row_prodotti['prd_price_array']);
                        $row_prodotti['abb_cod'] = intval($row_prodotti['abb_cod']);
                        $row_prodotti['cmpr_qnt'] = intval($row_prodotti['cmpr_qnt']);
                        $row_prodotti['cmpr_tab'] = intval($row_prodotti['cmpr_tab']);
                        $row_prodotti['prd_abb'] = intval($row_prodotti['prd_abb']);
                        $row_prodotti['prd_fin'] = intval($row_prodotti['prd_fin']);
                        $row_prodotti['prd_id'] = intval($row_prodotti['prd_id']);
                        $row_prodotti['prd_id'] = intval($row_prodotti['prd_id']);
                        array_push($row['prodotti'], $row_prodotti);
                    }
                    $row['cmp_settore'] = json_decode($row['cmp_settore']);
                    $row['cmp_cat_id'] = intval($row['cmp_cat_id']);
                    $row['cmp_id'] = intval($row['cmp_id']);
                    $row['cmp_line_id'] = intval($row['cmp_line_id']);
                    $row['cmp_mark_id'] = intval($row['cmp_mark_id']);
                    $row['cmp_pos'] = intval($row['cmp_pos']);
                    $row['cmp_show'] = intval($row['cmp_show']);
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