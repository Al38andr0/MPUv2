<?php
include('connessione.php');

if ($_GET['type'] !== 'get')
    $data = json_decode(file_get_contents("php://input"));

    switch ($_GET['type']) {
        case 'get' :
            $result_array = array();
            $sql = "SELECT * FROM vetrine_prodotti ORDER BY cmpr_comp";
            $result = mysqli_query($con, $sql);
            while ($row = $result->fetch_assoc()) {
                array_push($result_array, $row);
            }
            echo json_encode($result_array, JSON_NUMERIC_CHECK);
            break;
        case 'new':
            $sql="INSERT INTO vetrine_prodotti (
              cmpr_prd, cmpr_comp, cmpr_mark_id, cmpr_line_id, cmpr_mark_cmp_id, cmpr_line_cmp_id, cmpr_tab, cmpr_cod, cmpr_pos, cmpr_qnt
              ) VALUES (
              '$data->prd', '$data->comp', '$data->pmark', '$data->pline','$data->cmark', '$data->cline', '$data->tab', '$data->fin', '$data->pos', '$data->qnt'
              )";
            mysqli_query($con,$sql) or die(mysqli_error($con));
            echo "Created";
            break;
        case 'delete':
            $sql="DELETE FROM vetrine_prodotti WHERE cmpr_id='$data->id'";
            mysqli_query($con,$sql) or die(mysqli_error($con));
            echo "Deleted";
            break;
        case 'update':
            $sql="UPDATE vetrine_prodotti SET
              cmpr_prd = '$data->prd' ,
              cmpr_comp = '$data->comp' ,
              cmpr_mark_id = '$data->pmark' ,
              cmpr_line_id = '$data->pline',
              cmpr_mark_cmp_id = '$data->cmark' ,
              cmpr_line_cmp_id = '$data->cline',
              cmpr_tab = '$data->tab',
              cmpr_cod = '$data->fin',
              cmpr_pos = '$data->pos',
              cmpr_qnt = '$data->qnt'
              WHERE cmpr_id='$data->id'";
            mysqli_query($con,$sql) or die(mysqli_error($con));
            echo "Updated";
            break;
}

mysqli_close($con);

