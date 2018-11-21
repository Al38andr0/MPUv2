<?php
include('connessione.php');

if($_GET['type'] == 'save' && $_GET['type'] != 'db') {

    $data = json_decode(file_get_contents("php://input"));
    $fp = fopen('../json/composti_settori.json', 'w');
    fwrite($fp, json_encode($data));
    fclose($fp);

} elseif ($_GET['type'] == 'db'){

    function compostiSettoriJson($con) {
        $array = [];
        $result = mysqli_query($con,"SELECT * FROM settori_composti");
        while($row = mysqli_fetch_array($result)) {
            $row_array['i'] = (int)$row['stcst_id'];
            $row_array['m'] = (int)$row['stcst_mark_id'];
            $row_array['l'] = (int)$row['stcst_line_id'];
            $row_array['w'] = (int)$row['stcst_nwln_id'];
            $row_array['c'] = (int)$row['stcst_cst'];
            $row_array['v'] = (int)$row['stcst_view'];
            $row_array['h'] = json_decode($row['stcst_array']);

            array_push($array,$row_array);
        }
        $fp = fopen('../json/composti_settori.json', 'w');
        $out = array_values($array);
        fwrite($fp, json_encode($out));
        fclose($fp);
    }

    compostiSettoriJson($con);

} else {

    $data = json_decode(file_get_contents("php://input"));
    $stcst_array = json_encode($data->array);
    $id = $data->id;

    switch ($_GET['type']) {
        case 'new':
            if($data->cod != -1) {
                $sql = "INSERT INTO settori_composti (
                    stcst_id,
                    stcst_cst,
                    stcst_mark_id,
                    stcst_line_id,
                    stcst_nwln_id,
                    stcst_view,
                    stcst_array
                  ) VALUES (
                    '$data->id',
                    '$data->cod',
                    '$data->mark',
                     '$data->line',
                    '$data->nwln',
                    '$data->view',
                    '$stcst_array'
              )";
                mysqli_query($con,$sql) or die(mysqli_error($con));
            } else {
                $result = mysqli_query($con, "SELECT DISTINCT cst_id FROM composti WHERE NOT EXISTS(SELECT * FROM settori_composti WHERE settori_composti.stcst_cst = composti.cst_id AND stcst_nwln_id = '$data->nwln') AND cst_line_id = '$data->line'");
                while ($row = mysqli_fetch_array($result))
                {
                    $cst_id = $row['cst_id'];
                    $sql = "INSERT INTO settori_composti (
                          stcst_id,
                          stcst_cst,
                          stcst_mark_id,
                          stcst_line_id,
                          stcst_nwln_id,
                          stcst_view,
                          stcst_array
                      ) VALUES (
                          '$id',
                          '$cst_id',
                          '$data->mark',
                          '$data->line',
                          '$data->nwln',
                          '$data->view',
                          '$stcst_array'
                      )";
                    $id++;

                    mysqli_query($con,$sql) or die(mysqli_error($con));
                }
            }
            break;
        case 'delete':
            if($data->cod != -1) {
                $sql = "DELETE FROM settori_composti WHERE stcst_id='$data->id'";
                mysqli_query($con, $sql) or die(mysqli_error($con));
            } else {
                $sql = "DELETE FROM settori_composti WHERE stcst_nwln_id = '$data->nwln' AND stcst_line_id = '$data->line'";
                mysqli_query($con, $sql) or die(mysqli_error($con));
            }
            break;
        case 'update':
            $sql="UPDATE settori_composti SET stcst_cst='$data->cod', stcst_mark_id='$data->mark', stcst_line_id='$data->line', stcst_nwln_id='$data->nwln', stcst_array='$stcst_array' WHERE stcst_id='$data->id'";
            mysqli_query($con,$sql) or die(mysqli_error($con));
            break;
    }
}

echo "DONE";

mysqli_close($con);

