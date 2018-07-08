<?php
include('connessione.php');

if($_GET['type'] == 'save' && $_GET['type'] != 'db') {

    $data = json_decode(file_get_contents("php://input"));
    $fp = fopen('../json/esposizioni_settori.json', 'w');
    fwrite($fp, json_encode($data));
    fclose($fp);

} elseif ($_GET['type'] == 'db'){

    function esposizioniSettoriJson($con) {
        $array = [];
        $result = mysqli_query($con,"SELECT * FROM settori_esposizioni");
        while($row = mysqli_fetch_array($result)) {
            $row_array['i'] = (int)$row['stes_id'];
            $row_array['m'] = (int)$row['stes_mark_id'];
            $row_array['l'] = (int)$row['stes_line_id'];
            $row_array['w'] = (int)$row['stes_nwln_id'];
            $row_array['c'] = (int)$row['stes_esp'];
            $row_array['v'] = (int)$row['stes_view'];
            $row_array['h'] = json_decode($row['stes_array']);

            array_push($array,$row_array);
        }
        $fp = fopen('../json/esposizioni_settori.json', 'w');
        $out = array_values($array);
        fwrite($fp, json_encode($out));
        fclose($fp);
    }

    esposizioniSettoriJson($con);

} else {

    $data = json_decode(file_get_contents("php://input"));
    $stes_array = json_encode($data->array);
    $id = $data->id;

    switch ($_GET['type']) {
        case 'new':
            if($data->cod != -1) {
                $sql = "INSERT INTO settori_esposizioni (
                    stes_id,
                    stes_esp,
                    stes_mark_id,
                    stes_line_id,
                    stes_nwln_id,
                    stes_view,
                    stes_array
                  ) VALUES (
                    '$data->id',
                    '$data->cod',
                    '$data->mark',
                     '$data->line',
                    '$data->nwln',
                    '$data->view',
                    '$stes_array'
              )";
                mysqli_query($con,$sql) or die(mysqli_error($con));
            } else {
                $result = mysqli_query($con, "SELECT DISTINCT esp_id FROM esposizioni WHERE NOT EXISTS(SELECT * FROM settori_esposizioni WHERE settori_esposizioni.stes_esp = esposizioni.esp_id AND stes_nwln_id = '$data->nwln') AND esp_line_id = '$data->line'");
                while ($row=mysqli_fetch_array($result))
                {
                    $esp_id = $row['esp_id'];
                    $sql = "INSERT INTO settori_esposizioni (
                          stes_id,
                          stes_esp,
                          stes_mark_id,
                          stes_line_id,
                          stes_nwln_id,
                          stes_view,
                          stes_array
                      ) VALUES (
                          '$id',
                          '$esp_id',
                          '$data->mark',
                          '$data->line',
                          '$data->nwln',
                          '$data->view',
                          '$stes_array'
                      )";
                    $id++;

                    mysqli_query($con,$sql) or die(mysqli_error($con));
                }
            }
            break;
        case 'delete':
            if($data->cod != -1) {
                $sql = "DELETE FROM settori_esposizioni WHERE stes_id='$data->id'";
                mysqli_query($con, $sql) or die(mysqli_error($con));
            } else {
                $sql = "DELETE FROM settori_esposizioni WHERE stes_nwln_id = '$data->nwln' AND stes_line_id = '$data->line'";
                mysqli_query($con, $sql) or die(mysqli_error($con));
            }
            break;
        case 'update':
            $sql="UPDATE settori_esposizioni SET stes_esp='$data->cod', stes_mark_id='$data->mark', stes_line_id='$data->line', stes_nwln_id='$data->nwln', stes_array='$stes_array' WHERE stes_id='$data->id'";
            mysqli_query($con,$sql) or die(mysqli_error($con));
            break;
    }
}

echo "DONE";

mysqli_close($con);

