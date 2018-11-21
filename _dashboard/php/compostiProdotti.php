<?php
include('connessione.php');

if($_GET['type'] == 'save' && $_GET['type'] != 'db') {

    $data = json_decode(file_get_contents("php://input"));
    $fp = fopen('../json/composti_prodotti.json', 'w');
    fwrite($fp, json_encode($data));
    fclose($fp);

} elseif ($_GET['type'] == 'db'){

    function compostiProdottiJson($con) {
        $array = [];
        $result = mysqli_query($con,"SELECT * FROM composti_prodotti");
        while($row = mysqli_fetch_array($result)) {
            $row_array['i'] = (int)$row['cstpr_id'];
            $row_array['m'] = (int)$row['cstpr_mark_id'];
            $row_array['k'] = (int)$row['cstpr_mark_cst_id'];
            $row_array['l'] = (int)$row['cstpr_line_id'];
            $row_array['j'] = (int)$row['cstpr_line_cst_id'];
            $row_array['c'] = (int)$row['cstpr_cst'];
            $row_array['p'] = (int)$row['cstpr_prd'];
            $row_array['f'] = (int)$row['cstpr_cod'];
            $row_array['u'] = (int)$row['cstpr_tab'];
            $row_array['q'] = (int)$row['cstpr_qnt'];
            $row_array['y'] = (int)$row['cstpr_pos'];

            array_push($array,$row_array);
        }
        $fp = fopen('../json/composti_prodotti.json', 'w');
        $out = array_values($array);
        fwrite($fp, json_encode($out));
        fclose($fp);
    }

    compostiProdottiJson($con);
    
} else {

    $data = json_decode(file_get_contents("php://input"));

    switch ($_GET['type']) {
        case 'new':
            $sql="INSERT INTO composti_prodotti (
              cstpr_id,
              cstpr_prd,
              cstpr_cst,
              cstpr_mark_id,
              cstpr_line_id,
              cstpr_mark_cst_id,
              cstpr_line_cst_id,
              cstpr_tab,
              cstpr_cod,
              cstpr_pos,
              cstpr_qnt
              ) VALUES (
              '$data->id',
              '$data->prd',
              '$data->comp',
              '$data->pmark',
              '$data->pline',
              '$data->cmark',
              '$data->cline',
              '$data->tab',
              '$data->fin',
              '$data->pos',
              '$data->qnt'
              )";
            mysqli_query($con,$sql) or die(mysqli_error($con));
            break;
        case 'delete':
            $sql="DELETE FROM composti_prodotti WHERE cstpr_id='$data->id'";
            mysqli_query($con,$sql) or die(mysqli_error($con));
            break;
        case 'update':
            $sql="UPDATE composti_prodotti SET
              cstpr_prd = '$data->prd' ,
              cstpr_cst = '$data->comp' ,
              cstpr_mark_id = '$data->pmark' ,
              cstpr_line_id = '$data->pline',
              cstpr_mark_cst_id = '$data->cmark' ,
              cstpr_line_cst_id = '$data->cpline',
              cstpr_tab = '$data->tab',
              cstpr_cod = '$data->fin'
              cstpr_pos = '$data->pos'
              cstpr_qnt = '$data->qnt'
              WHERE cstpr_id='$data->id'";
            mysqli_query($con,$sql) or die(mysqli_error($con));
            break;
    }
}

echo "DONE";

mysqli_close($con);

