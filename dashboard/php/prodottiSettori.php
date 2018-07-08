<?php
include('connessione.php');

function settoriProdottiJson($con) {
    $settoriProdottiArray = [];
    $result = mysqli_query($con, "SELECT * FROM settori_prodotti JOIN prodotti ON prodotti.prd_id = settori_prodotti.stpr_prd");
    while ($row = mysqli_fetch_array($result)) {
        $stpr_array['h'] = json_decode($row['stpr_array']);
        $stpr_array['i'] = (int)$row['stpr_id'];
        $stpr_array['m'] = (int)$row['stpr_mark_id'];
        $stpr_array['l'] = (int)$row['stpr_line_id'];
        $stpr_array['w'] = (int)$row['stpr_nwln_id'];
        $stpr_array['c'] = (int)$row['stpr_prd'];
        $stpr_array['n'] = html_entity_decode($row['prd_cod']);

        array_push($settoriProdottiArray, $stpr_array);
    }

    $fp = fopen('../json/prodotti_settori.json', 'w');
    $out = array_values($settoriProdottiArray);
    fwrite($fp, json_encode($out));
    fclose($fp);
}

function uniqueLineeJson($con) {
    $resultLinee = mysqli_query($con,"SELECT * FROM linee");
    while($rowLinee = mysqli_fetch_array($resultLinee)) {
        $lineeArray = array();
        $line_id = $rowLinee['line_id'];

        $resultSet = mysqli_query($con,"SELECT * FROM settori_linee WHERE stln_line_id = '$line_id' AND stln_show = 1");
        while($rowSet = mysqli_fetch_array($resultSet)) {
            $set_id = (int)$rowSet['stln_set_id'];
            $rowSet_array['i'] = (int)$rowSet['stln_set_id'];

            $rowSet_array['x'] = [];
            $resultProd = mysqli_query($con, "SELECT stpr_prd, stpr_array, prd_tbpr, tbpr_pos FROM settori_prodotti JOIN prodotti ON prodotti.prd_id = settori_prodotti.stpr_prd JOIN tabelle_prodotti ON prodotti.prd_tbpr = tabelle_prodotti.tbpr_id WHERE stpr_nwln_id = '$line_id' ORDER BY tbpr_pos");
            while ($rowProd = mysqli_fetch_array($resultProd)) {
                $set_array = json_decode($rowProd['stpr_array']);
                for($i = 0; $i < count($set_array); $i++) {
                    if($set_array[$i] == $set_id){
                        array_push($rowSet_array['x'], (int)$rowProd['prd_tbpr']);
                        $rowSet_array['x'] = array_values(array_unique($rowSet_array['x'], SORT_REGULAR));
                    }
                }
            }

            array_push($lineeArray, $rowSet_array);
        }

//            array_push($lineeArray,$rowLinee_array);
        $fp = fopen('../json/tbpr/' . $rowLinee['line_id'] . '.json', 'w');
        $out = array_values($lineeArray);
        fwrite($fp, json_encode($out));
        fclose($fp);
    }
}

if($_GET['type'] == 'save' && $_GET['type'] != 'db') {

    $data = json_decode(file_get_contents("php://input"));
    $fp = fopen('../json/prodotti_settori.json', 'w');
    fwrite($fp, json_encode($data));
    fclose($fp);

} elseif ($_GET['type'] == 'db'){

    settoriProdottiJson($con);

    uniqueLineeJson($con);

} else {

    $data = json_decode(file_get_contents("php://input"));
    $stpr_array = json_encode($data->array);
    $id = $data->id;

    switch ($_GET['type']) {
        case 'new':
            if($data->cod != -1) {
                $sql = "INSERT INTO settori_prodotti (stpr_id, stpr_prd, stpr_mark_id, stpr_line_id, stpr_nwln_id, stpr_array) VALUES ('$id', '$data->cod', '$data->mark', '$data->line', '$data->nwln', '$stpr_array')";
                mysqli_query($con,$sql) or die(mysqli_error($con));
                echo $id;
            } else {
                $result = mysqli_query($con, "SELECT DISTINCT prd_id FROM prodotti WHERE NOT EXISTS(SELECT * FROM settori_prodotti WHERE settori_prodotti.stpr_prd = prodotti.prd_id AND stpr_nwln_id = '$data->nwln') AND prd_line_id = '$data->line'");
                while ($row=mysqli_fetch_array($result))
                {
                    $prd_id = $row['prd_id'];
                    $sql = "INSERT INTO settori_prodotti (stpr_id, stpr_prd, stpr_mark_id, stpr_line_id, stpr_nwln_id, stpr_array) VALUES ('$id', '$prd_id', '$data->mark', '$data->line', '$data->nwln', '$stpr_array')";
                    $id++;
                    mysqli_query($con,$sql) or die(mysqli_error($con));
                }
                echo $id;
            }
            break;
        case 'delete':
            if($data->cod != -1) {
                $sql = "DELETE FROM settori_prodotti WHERE stpr_id='$data->id'";
                mysqli_query($con, $sql) or die(mysqli_error($con));
            } else {
                $sql = "DELETE FROM settori_prodotti WHERE stpr_nwln_id = '$data->nwln' AND stpr_line_id = '$data->line'";
                mysqli_query($con, $sql) or die(mysqli_error($con));
            }
            echo "DONE";
            break;
        case 'update':
            $sql="UPDATE settori_prodotti SET stpr_prd='$data->cod', stpr_mark_id='$data->mark', stpr_line_id='$data->line', stpr_nwln_id='$data->nwln', stpr_array='$stpr_array' WHERE stpr_id='$data->id'";
            mysqli_query($con,$sql) or die(mysqli_error($con));
            echo "DONE";
            break;
    }
}

mysqli_close($con);

