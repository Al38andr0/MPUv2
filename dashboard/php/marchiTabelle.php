<?php
include('connessione.php');

if($_GET['type'] == 'save' && $_GET['type'] != 'db') {

    $data = json_decode(file_get_contents("php://input"));
    $fp = fopen('../json/marchi_tabelle.json', 'w');
    fwrite($fp, json_encode($data));
    fclose($fp);

} elseif ($_GET['type'] == 'db'){

    function tbprJson($con) {
        $tabProdArray = [];
        $resultTabProd = mysqli_query($con,"SELECT * FROM tabelle_prodotti ORDER BY tbpr_pos ASC");
        while($rowTabProd = mysqli_fetch_array($resultTabProd)) {
            $rowTabProd_array['i'] = (int)$rowTabProd['tbpr_id'];
            $rowTabProd_array['n'] = html_entity_decode($rowTabProd['tbpr_nome']);
            $rowTabProd_array['y'] = (int)$rowTabProd['tbpr_pos'];
            $rowTabProd_array['m'] = (int)$rowTabProd['tbpr_mark_id'];
            array_push($tabProdArray, $rowTabProd_array);
        }

        $fp = fopen('../json/marchi_tabelle.json', 'w');
        $out = array_values($tabProdArray);
        fwrite($fp, json_encode($out));
        fclose($fp);
    }

    tbprJson($con);

} else {

    $data = json_decode(file_get_contents("php://input"));
    $nome = addslashes($data->nome);

    switch ($_GET['type']) {
        case 'new':
            $sql="INSERT INTO tabelle_prodotti (tbpr_id, tbpr_nome, tbpr_pos, tbpr_mark_id) VALUES ('$data->id', '$nome', '$data->pos', '$data->mark')";
            mysqli_query($con,$sql) or die(mysqli_error($con));
            break;
        case 'delete':
            $sql="DELETE FROM tabelle_prodotti WHERE tbpr_id='$data->id'";
            mysqli_query($con,$sql) or die(mysqli_error($con));
            break;
        case 'update':
            $sql="UPDATE tabelle_prodotti SET tbpr_pos='$data->pos', tbpr_nome='$nome', tbpr_mark_id='$data->mark' WHERE tbpr_id='$data->id'";
            mysqli_query($con,$sql) or die(mysqli_error($con));
            break;
    }
}

echo "DONE";

mysqli_close($con);

