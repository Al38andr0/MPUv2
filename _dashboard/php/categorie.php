<?php
include('connessione.php');

if ($_GET['type'] !== 'get') {
    $data = json_decode(file_get_contents("php://input"));
    $nome = addslashes($data->nome);
    $text = addslashes($data->text);

    $path = '../archivio_dati/Categorie/';

    if($_GET['type'] !== 'new') {
        $file = $data->id . ".jpg";
        $pathFile = $path . $file;
    }
}

switch ($_GET['type']) {
    case 'get' :
        $result_array = array();
        $sql = "SELECT * FROM categorie ORDER BY cat_pos";
        $result = mysqli_query($con, $sql);
        while ($row = $result->fetch_assoc()) {
            $row['cat_id'] = intval($row['cat_id']);
            $row['cat_pos'] = intval($row['cat_pos']);
            $row['cat_show'] = intval($row['cat_show']);
            array_push($result_array, $row);
        }
        echo json_encode($result_array);
        break;
    case 'new':
        $sql = "INSERT INTO categorie (cat_nome, cat_pos, cat_show, cat_txt) VALUES ('$nome', '$data->pos', '$data->show', '$text')";
        mysqli_query($con, $sql) or die(mysqli_error($con));

        $sqlGet = "SELECT cat_id FROM categorie WHERE cat_id = (SELECT MAX(cat_id) FROM categorie)";
        $result = mysqli_query($con, $sqlGet);
        while ($row = $result->fetch_assoc()) {
            $file = $row['cat_id'] . ".jpg";
            $pathFile = $path . $file;

            $image = explode('base64,', $data->image);
            file_put_contents($pathFile, base64_decode($image[1]));
        }
        echo "Created";
        break;
    case 'delete':
        unlink($pathFile);

        $sql = "DELETE FROM categorie WHERE cat_id='$data->id'";
        mysqli_query($con, $sql) or die(mysqli_error($con));
        echo "Deleted";
        break;
    case 'update':
        if (substr($data->image, 0, 4) === 'data') {
            $image = explode('base64,', $data->image);
            file_put_contents($pathFile, base64_decode($image[1]));
        }

        $sql = "UPDATE categorie SET
              cat_pos='$data->pos',
              cat_nome='$nome',
              cat_show='$data->show',
              cat_txt='$text'
              WHERE cat_id='$data->id'";
        mysqli_query($con, $sql) or die(mysqli_error($con));
        echo "Updated";
        break;
}

mysqli_close($con);

