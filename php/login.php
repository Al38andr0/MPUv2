<?php
include('../_dashboard/php/connessione.php');

$mysqli = new mysqli($db_server, $db_database, $db_pw, $db_name);

if($stmt = $mysqli -> prepare("SELECT agenti_id, agenti_riv FROM agenti WHERE agenti_email = ? AND agenti_psw = ?")) {
    $data = json_decode(file_get_contents("php://input"));
    $user = mysqli_real_escape_string($mysqli, $data->user);
    $psw = mysqli_real_escape_string($mysqli, $data->psw);
    if($user === 'mobiliperufficio' && $psw === 'FaDa') {
        echo -1;
        $stmt -> close();
    } else {
        $stmt -> bind_param("ss", $user, $psw);
        $stmt -> execute();
        $stmt->store_result();
        $num_of_rows = $stmt->num_rows;
        if($num_of_rows > 0) {
            $stmt -> bind_result($id, $riv);
            $stmt -> fetch();
            print_r(json_encode([$id, $riv]));
        }
        $stmt -> close();
    }
}

/*if($data->user === 'mobiliperufficio' && $data->psw === 'FaDa'){
    echo -1;
} else {
    $result = mysqli_query($con,"SELECT * FROM agenti WHERE agenti_email = '$data->user' AND agenti_psw = '$data->psw'");
    if(mysqli_num_rows($result) > 0){
        while($row= mysqli_fetch_array($result)) {
            $id = (int)$row['agenti_id'];
            $riv = (int)$row['agenti_riv'];
        }
        print_r(json_encode([$id, $riv]));
    }
}*/
mysqli_close($con);