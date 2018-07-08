<?php
include('connessione.php');

if($_GET['type'] == 'save' && $_GET['type'] != 'db') {

    $data = json_decode(file_get_contents("php://input"));
    $fp = fopen('../json/convenzioni.json', 'w');
    fwrite($fp, json_encode($data));
    fclose($fp);

} elseif ($_GET['type'] == 'db'){

    function convenzioniJson($con) {
        $array = [];
        $result = mysqli_query($con,"SELECT * FROM convenzioni");
        while($row = mysqli_fetch_array($result)) {
            $row_array['i'] = (int)$row['cnv_id'];
            $row_array['n'] = html_entity_decode($row['cnv_nome']);
            $row_array['e'] = $row['cnv_email'];

            array_push($array,$row_array);
        }
        $fp = fopen('../json/convenzioni.json', 'w');
        $out = array_values($array);
        fwrite($fp, json_encode($out));
        fclose($fp);
    }

    convenzioniJson($con);

} else {

    $data = json_decode(file_get_contents("php://input"));
    $nome = addslashes($data->nome);

    switch ($_GET['type']) {
        case 'new':
            $sql="INSERT INTO convenzioni (cnv_id, cnv_nome, cnv_email) VALUES ('$data->id', '$nome', '$data->email')";
            mysqli_query($con,$sql) or die(mysqli_error($con));
            break;
        case 'delete':
            $sql="DELETE FROM convenzioni WHERE cnv_id = '$data->id'";
            mysqli_query($con,$sql) or die(mysqli_error($con));
            break;
        case 'update':
            $sql="UPDATE convenzioni SET cnv_nome='$nome', cnv_email='$data->email' WHERE cnv_id = '$data->id'";
            mysqli_query($con,$sql) or die(mysqli_error($con));
            break;
    }
}

echo "DONE";

mysqli_close($con);

