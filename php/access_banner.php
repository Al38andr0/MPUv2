<?php
include('../dashboard/php/connessione.php');

$result = mysqli_query($con, "SELECT * FROM rivenditori JOIN province ON rivenditori.riv_prov = province.provincia_id WHERE riv_email='$_GET[user_info]' ORDER BY riv_id LIMIT 1");
while($row = mysqli_fetch_array($result)) {
    $id = $row['riv_id'];
    $prv = preg_replace('/\s+/', '_', $row['provincia']);
}

header("HTTP/1.1 301 Moved Permanently");
//header ("location:http://127.0.0.1/mpu/#!/$prv/home");
header ("location:http://mobiliperufficio.com/" . $prv . "/home");
