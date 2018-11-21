<?php
include('connessione.php');

if($_GET['type'] == 'save' && $_GET['type'] != 'db') {

    $data = json_decode(file_get_contents("php://input"));
    $fp = fopen('../json/esposizioni_prodotti.json', 'w');
    fwrite($fp, json_encode($data));
    fclose($fp);

} elseif ($_GET['type'] == 'db'){

    function esposizioniProdottiJson($con) {
        $array = [];
        $result = mysqli_query($con,"SELECT * FROM esposizioni_prodotti");
        while($row = mysqli_fetch_array($result)) {
            $row_array['i'] = (int)$row['espr_id'];
            $row_array['m'] = (int)$row['espr_mark_id'];
            $row_array['k'] = (int)$row['espr_mark_esp_id'];
            $row_array['l'] = (int)$row['espr_line_id'];
            $row_array['j'] = (int)$row['espr_line_esp_id'];
            $row_array['c'] = (int)$row['espr_esp'];
            $row_array['p'] = (int)$row['espr_prd'];
            $row_array['f'] = (int)$row['espr_cod'];
            $row_array['u'] = (int)$row['espr_tab'];
            $row_array['q'] = (int)$row['espr_qnt'];
            $row_array['y'] = (int)$row['espr_pos'];

            array_push($array,$row_array);
        }
        $fp = fopen('../json/esposizioni_prodotti.json', 'w');
        $out = array_values($array);
        fwrite($fp, json_encode($out));
        fclose($fp);
    }

    esposizioniProdottiJson($con);
    
} else {

    $data = json_decode(file_get_contents("php://input"));

    switch ($_GET['type']) {
        case 'new':
            $sql="INSERT INTO esposizioni_prodotti (
              espr_id,
              espr_prd,
              espr_esp,
              espr_mark_id,
              espr_line_id,
              espr_mark_esp_id,
              espr_line_esp_id,
              espr_tab,
              espr_cod,
              espr_pos,
              espr_qnt
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
            $sql="DELETE FROM esposizioni_prodotti WHERE espr_id='$data->id'";
            mysqli_query($con,$sql) or die(mysqli_error($con));
            break;
        case 'update':
            $sql="UPDATE esposizioni_prodotti SET
              espr_prd = '$data->prd' ,
              espr_esp = '$data->comp' ,
              espr_mark_id = '$data->pmark' ,
              espr_line_id = '$data->pline',
              espr_mark_esp_id = '$data->cmark' ,
              espr_line_esp_id = '$data->cpline',
              espr_tab = '$data->tab',
              espr_cod = '$data->fin'
              espr_pos = '$data->pos'
              espr_qnt = '$data->qnt'
              WHERE espr_id='$data->id'";
            mysqli_query($con,$sql) or die(mysqli_error($con));
            break;
    }
}

echo "DONE";

mysqli_close($con);

