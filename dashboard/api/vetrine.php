<?php
include('../php/connessione.php');
header('Content-Type: application/json');

$result_array = array();

$_GET['action'] = 'getAllByLinea';
$_GET['id'] = 139;

if (!isset($_GET['action'])) {
    $result_array = 'No action has been defined';
}

if (!isset($result_array['error'])) {
    switch ($_GET['action']) {
        case 'getAllByLinea':
            $sql = "SELECT DISTINCT * FROM composizioni WHERE cmp_show = 1 AND cmp_line_id =  " . $_GET['id'];
            $result = mysqli_query($con, $sql);
            if ($result->num_rows > 0) {
                while($row = $result->fetch_assoc()) {
                    $sql_prodotti = "SELECT DISTINCT cmpr_tab, cmpr_qnt, prd_id, prd_title, prd_cod, prd_dim, prd_price_array, prd_note, prd_abb, prd_fin, tab_nome, abb_cod, abb_array FROM composizioni_prodotti c JOIN prodotti p on c.cmpr_prd = p.prd_id JOIN tabelle_finiture f on c.cmpr_tab = f.tab_id JOIN abbinamenti a on c.cmpr_cod = a.abb_id WHERE cmpr_comp = " . $row['cmp_id'] . " ORDER BY cmpr_pos ASC";
                    $result_prodotti = mysqli_query($con, $sql_prodotti);
                    $row['prodotti'] = [];
                    while($row_prodotti = $result_prodotti->fetch_assoc()) {
                        array_push($row['prodotti'], $row_prodotti);
                    }
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