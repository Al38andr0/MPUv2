<?php
include('connessione.php');

if($_GET['type'] == 'save' && $_GET['type'] != 'db') {

    $data = json_decode(file_get_contents("php://input"));
    $fp = fopen('../json/vetrine_prodotti.json', 'w');
    fwrite($fp, json_encode($data));
    fclose($fp);

} elseif ($_GET['type'] == 'db'){

    function vetrinaProdottiJson($con) {
        $array = [];
        $result = mysqli_query($con, "SELECT * FROM composizioni_prodotti");
        while ($row = mysqli_fetch_array($result)) {
            $row_array['i'] = (int)$row['cmpr_id'];
            $row_array['c'] = (int)$row['cmpr_comp'];
            $row_array['p'] = (int)$row['cmpr_prd'];
            $row_array['m'] = (int)$row['cmpr_mark_id'];
            $row_array['k'] = (int)$row['cmpr_mark_cmp_id'];
            $row_array['l'] = (int)$row['cmpr_line_id'];
            $row_array['j'] = (int)$row['cmpr_line_cmp_id'];
            $row_array['u'] = (int)$row['cmpr_tab'];
            $row_array['f'] = (int)$row['cmpr_cod'];
            $row_array['q'] = (int)$row['cmpr_qnt'];
            $row_array['y'] = (int)$row['cmpr_pos'];

            array_push($array, $row_array);
        }
        $fp = fopen('../json/vetrine_prodotti.json', 'w');
        $out = array_values($array);
        fwrite($fp, json_encode($out));
        fclose($fp);
    }

    vetrinaProdottiJson($con);
    
} else {

    $data = json_decode(file_get_contents("php://input"));

    switch ($_GET['type']) {
        case 'new':
            $sql="INSERT INTO composizioni_prodotti (
              cmpr_id, cmpr_prd, cmpr_comp, cmpr_mark_id, cmpr_line_id, cmpr_mark_cmp_id, cmpr_line_cmp_id, cmpr_tab, cmpr_cod, cmpr_pos, cmpr_qnt
              ) VALUES (
              '$data->id', '$data->prd', '$data->comp', '$data->pmark', '$data->pline','$data->cmark', '$data->cline', '$data->tab', '$data->fin', '$data->pos', '$data->qnt'
              )";
            mysqli_query($con,$sql) or die(mysqli_error($con));
            break;
        case 'delete':
            $sql="DELETE FROM composizioni_prodotti WHERE cmpr_id='$data->id'";
            mysqli_query($con,$sql) or die(mysqli_error($con));
            break;
        case 'update':
            $sql="UPDATE composizioni_prodotti SET
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
            break;
    }
}

echo "DONE";

mysqli_close($con);

