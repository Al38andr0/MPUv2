<?php
include('connessione.php');

if ($_GET['type'] !== 'get') {
    $data = json_decode(file_get_contents("php://input"));
    $nome = addslashes($data->nome);
    $text = addslashes($data->text);

    $path = '../archivio_dati/Settori/';

    if ($_GET['type'] !== 'new') {
        $file = $data->id . ".jpg";
        $pathFile = $path . $file;
    }
}

switch ($_GET['type']) {
    case 'get' :
        $result_array = array();
        $sql = "SELECT * FROM settori s JOIN categorie c ON s.set_cat_id = c.cat_id ORDER BY set_pos";
        $result = mysqli_query($con, $sql);
        while ($row = $result->fetch_assoc()) {
            array_push($result_array, $row);
        }
        echo json_encode($result_array, JSON_NUMERIC_CHECK);
        break;
    case 'new':
        $sql = "INSERT INTO settori (set_nome, set_pos, set_show, set_cat_id, set_txt, set_home) VALUES ('$nome', '$data->pos', '$data->show', '$data->cat', '$text', '$data->home')";
        mysqli_query($con, $sql) or die(mysqli_error($con));

        $sqlGet = "SELECT set_id FROM settori WHERE set_id = (SELECT MAX(set_id) FROM settori)";
        $result = mysqli_query($con, $sqlGet);
        while ($row = $result->fetch_assoc()) {
            echo $row['set_id'];
            $file = $row['set_id'] . ".jpg";
            $pathFile = $path . $file;

            $image = explode('base64,', $data->image);
            file_put_contents($pathFile, base64_decode($image[1]));
        }
        echo "Created";
        break;
    case 'delete':
        $sql = "DELETE FROM settori WHERE set_id='$data->id'";
        mysqli_query($con, $sql) or die(mysqli_error($con));
        unlink($pathFile);
        echo "Deleted";
        break;
    case 'update':
        if (substr($data->image, 0, 4) === 'data') {
            $image = explode('base64,', $data->image);
            file_put_contents($pathFile, base64_decode($image[1]));
        }

        $sql = "UPDATE settori SET
                set_pos ='$data->pos',
                set_nome ='$nome',
                set_show ='$data->show',
                set_cat_id ='$data->cat',
                set_txt ='$text',
                set_home ='$data->home'
                WHERE set_id ='$data->id'";
        mysqli_query($con, $sql) or die(mysqli_error($con));
        echo "Updated";
        break;
}

mysqli_close($con);

