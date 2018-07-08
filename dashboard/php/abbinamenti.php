<?php
include('connessione.php');

if($_GET['type'] == 'save' && $_GET['type'] != 'db') {

    $data = json_decode(file_get_contents("php://input"));
    $fp = fopen('../json/abbinamenti.json', 'w');
    fwrite($fp, json_encode($data));
    fclose($fp);

} elseif ($_GET['type'] == 'db'){

/*    $result = mysqli_query($con, "SELECT abbinamenti.abb_id FROM abbinamenti WHERE NOT EXISTS(SELECT * FROM tabelle_finiture WHERE abbinamenti.abb_tab = tabelle_finiture.tab_id)");
    echo mysqli_num_rows($result);
    while ($row = mysqli_fetch_array($result)) {
        $sql="DELETE FROM abbinamenti WHERE abb_id='$row[abb_id]'";
        mysqli_query($con,$sql) or die(mysqli_error($con));
    }*/

    function abbinamentiJson($con) {
        $abbArray = [];
        $resultAbb = mysqli_query($con, "SELECT * FROM abbinamenti");
        while ($rowAbb = mysqli_fetch_array($resultAbb)) {
            $rowAbb_array['i'] = (int)$rowAbb['abb_id'];
            $rowAbb_array['c'] = $rowAbb['abb_cod'];
            $rowAbb_array['m'] = (int)$rowAbb['abb_mark_id'];
            $rowAbb_array['l'] = (int)$rowAbb['abb_line_id'];
            $rowAbb_array['u'] = (int)$rowAbb['abb_tab'];
            $rowAbb_array['f'] = json_decode($rowAbb['abb_array']);

            array_push($abbArray, $rowAbb_array);
        }

        $fp = fopen('../json/abbinamenti.json', 'w');
        $out = array_values($abbArray);
        fwrite($fp, json_encode($out));
        fclose($fp);
    }

    abbinamentiJson($con);
    
} else {

    $data = json_decode(file_get_contents("php://input"));
    $cod = addslashes($data->cod);
    $abb_array = json_encode($data->abb_array);

    switch ($_GET['type']) {
        case 'new':
            $sql="INSERT INTO abbinamenti (abb_id, abb_cod, abb_mark_id, abb_line_id, abb_tab, abb_array) VALUES ('$data->id', '$cod', '$data->mark', '$data->line', '$data->tab', '$abb_array')";
            mysqli_query($con,$sql) or die(mysqli_error($con));
            break;
        case 'delete':
            $sql="DELETE FROM abbinamenti WHERE abb_id='$data->id'";
            mysqli_query($con,$sql) or die(mysqli_error($con));
            break;
        case 'update':
            $sql="UPDATE abbinamenti SET abb_cod='$cod', abb_mark_id='$data->mark' , abb_line_id='$data->line', abb_tab='$data->tab', abb_array='$abb_array' WHERE abb_id='$data->id'";
            mysqli_query($con,$sql) or die(mysqli_error($con));
            break;
    }
}

echo "DONE";

mysqli_close($con);

