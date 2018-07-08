<?php
include "../dashboard/php/connessione.php";

if($_GET['action'] == 'put')
{
    $data = json_decode(file_get_contents("php://input"));
    $cliente = addslashes(json_encode($data->cliente, JSON_UNESCAPED_UNICODE));

    $result = mysqli_query($con, "SELECT ord_id FROM preventivi ORDER BY ord_id DESC LIMIT 1");
    if(mysqli_num_rows($result) == 1) {
        while ($row = mysqli_fetch_array($result)) {
            $lastID = (int)$row['ord_id'];
        }
        $ID = $lastID + 1;
    } else {
        $ID = 1;
    }

    $now = time();

    $sql = "UPDATE preventivi SET prev_cliente = '$cliente', ord_id = '$ID', ord_data = '$now' WHERE prev_cod = '$data->ID'";
    mysqli_query($con, $sql) or die(mysqli_error($con));
}

if($_GET['action'] == 'get')
{
    $data = json_decode(file_get_contents("php://input"));

    $array = [];
    $result = mysqli_query($con, "SELECT * FROM preventivi WHERE prev_cod = '$data->ID'");
    while ($row = mysqli_fetch_array($result)) {
        $array['data'] = (int)$row['ord_data'];
        $array['id'] = (int)$row['ord_id'];
        $array['cliente'] = json_decode($row['prev_cliente']);
    }

    print_r(json_encode($array));
}


mysqli_close($con);

