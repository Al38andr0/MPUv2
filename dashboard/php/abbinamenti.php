<?php
include('connessione.php');

if ($_GET['type'] !== 'get') {
    $data = json_decode(file_get_contents("php://input"));
    $cod = addslashes($data->cod);
    $abb_array = json_encode($data->abb_array);
}
switch ($_GET['type']) {
    case 'get' :
        $result_array = array();
        $sql = "SELECT a.*, line_id, line_nome, line_mark_id, mark_id, mark_nome, tab_id, tab_nome FROM abbinamenti a JOIN marchi m ON a.abb_mark_id = m.mark_id JOIN linee l ON a.abb_line_id = line_id JOIN tabelle_finiture t on a.abb_tab = t.tab_id ORDER BY line_nome";
        $result = mysqli_query($con, $sql);
        while ($row = $result->fetch_assoc()) {
            $row['abb_array'] = json_decode($row['abb_array']);
            $row['abb_cod'] = $row['abb_cod'] . " ";
            array_push($result_array, $row);
        }
        echo json_encode($result_array, JSON_NUMERIC_CHECK);
        break;
    case 'new':
        $sql = "INSERT INTO abbinamenti (abb_cod, abb_mark_id, abb_line_id, abb_tab, abb_array) VALUES ('$cod', '$data->mark', '$data->line', '$data->tab', '$abb_array')";
        mysqli_query($con, $sql) or die(mysqli_error($con));
        echo "Created";
        break;
    case 'delete':
        $sql = "DELETE FROM abbinamenti WHERE abb_id='$data->id'";
        mysqli_query($con, $sql) or die(mysqli_error($con));
        echo "Deleted";
        break;
    case 'update':
        $sql = "UPDATE abbinamenti SET abb_cod='$cod', abb_mark_id='$data->mark' , abb_line_id='$data->line', abb_tab='$data->tab', abb_array='$abb_array' WHERE abb_id='$data->id'";
        mysqli_query($con, $sql) or die(mysqli_error($con));
        echo "Updated";
        break;
}

mysqli_close($con);

