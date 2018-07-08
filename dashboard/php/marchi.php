<?php
include "connessione.php";
include "funzioni.php";


if($_GET['type'] == 'save' && $_GET['type'] != 'db') {

    $data = json_decode(file_get_contents("php://input"));
    $fp = fopen('../json/marchi.json', 'w');
    fwrite($fp, json_encode($data));
    fclose($fp);

} elseif ($_GET['type'] == 'db'){

    function markJson($con) {
        $marchiArray = [];
        $resultMarchi = mysqli_query($con,"SELECT * FROM marchi");
        while($rowMarchi = mysqli_fetch_array($resultMarchi)) {
            $rowMarchi_array['i'] = (int)$rowMarchi['mark_id'];
            $rowMarchi_array['n'] = html_entity_decode($rowMarchi['mark_nome']);
            $rowMarchi_array['s'] = (int)$rowMarchi['mark_disc'];
            $rowMarchi_array['b'] = (int)$rowMarchi['mark_list'];
            $rowMarchi_array['v'] = (int)$rowMarchi['mark_show'];
            $rowMarchi_array['g'] = json_decode($rowMarchi['mark_cat_array']);

            array_push($marchiArray,$rowMarchi_array);
        }
        $fp = fopen('../json/marchi.json', 'w');
        $out = array_values($marchiArray);
        fwrite($fp, json_encode($out));
        fclose($fp);
    }

    markJson($con);

} else {

    $data = json_decode(file_get_contents("php://input"));
    $nome = addslashes($data->nome);
    $pathNome = str_replace(" ", "_", $data->nome);
    $cat_array = json_encode($data->cat_array);
    $path = '../archivio_dati/' . $pathNome;

    switch ($_GET['type']) {
        case 'new':

            mkdir($path);
            mkdir($path . "/Finiture");

            $sql="INSERT INTO marchi (mark_id, mark_nome, mark_show, mark_disc, mark_list, mark_cat_array) VALUES ('$data->id', '$nome', '$data->show', '$data->disc', '$data->list', '$cat_array')";
            mysqli_query($con,$sql) or die(mysqli_error($con));
            break;
        case 'delete':
            deleteDirectory($path);
            $sql="DELETE FROM marchi WHERE mark_id='$data->id'";
            mysqli_query($con,$sql) or die(mysqli_error($con));
            break;
        case 'update':
            $result = mysqli_query($con,"SELECT * FROM marchi WHERE mark_id='$data->id'");
            while($row = mysqli_fetch_array($result)) {
                $oldNome = str_replace(" ", "_", $row['mark_nome']);
            };
            $oldPath = '../archivio_dati/' . $oldNome;
            rename($oldPath, $path);
            $sql="UPDATE marchi SET mark_nome='$nome', mark_show='$data->show' , mark_disc='$data->disc' , mark_list='$data->list' , mark_cat_array='$cat_array' WHERE mark_id='$data->id'";
            mysqli_query($con,$sql) or die(mysqli_error($con));
            break;
    }
}

echo "DONE";

mysqli_close($con);

