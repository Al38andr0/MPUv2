<?php
include "../_dashboard/php/connessione.php";
include "../_dashboard/php/funzioni.php";

if(isset($_GET['p'])) {
    $cod = $_GET['p'];
    $array = [];
    $result = mysqli_query($con, "SELECT * FROM preventivi WHERE BINARY prev_cod = '$cod'");
    while ($row = mysqli_fetch_array($result)) {
        $array['ID'] = (int)$row['prev_id'];
        $array['cliente']= json_decode($row['prev_cliente']);
        $array['data']= (int)$row['prev_data'];
        $array['prv'] = json_decode($row['prev_array']);
        $array['OrdData']= (int)$row['ord_data'];
        $array['OrdID'] = (int)$row['ord_id'];
    }
    $x = $array;
    $x = json_encode($array);
    print_r($x);
} else {
    $data = json_decode(file_get_contents("php://input"));

    $result = mysqli_query($con, "SELECT prev_id FROM preventivi ORDER BY prev_id DESC LIMIT 1");
    if(mysqli_num_rows($result) == 1) {
        while ($row = mysqli_fetch_array($result)) {
            $lastID = (int)$row['prev_id'];
        }
        $ID = $lastID + 1;
    } else {
        $ID = 1;
    }

    $prev_cod = $data->ID;
    unset($data->ID);
    $object = json_encode($data);

    function checkCod($cod, $con) {
        $result = mysqli_query($con, "SELECT prev_cod FROM preventivi WHERE prev_cod = '$cod'");
        return mysqli_num_rows($result);
    }
    if(checkCod($prev_cod, $con) == 0) {
        $now = time();

        $sql = "INSERT INTO preventivi (prev_id, prev_array, prev_cod, prev_data) VALUES ('$ID', '$object', '$prev_cod', '$now')";

        mysqli_query($con, $sql) or die(mysqli_error($con));

        $sixMonthAgo = time() - (180 * 24 * 60 * 60);
        $sqlDel = "DELETE FROM preventivi WHERE prev_data < '$sixMonthAgo' AND ord_id IS NULL";
        mysqli_query($con, $sqlDel) or die(mysqli_error($con));

        $result = json_encode($prev_cod);
        print_r($result);
    }
}
mysqli_close($con);

