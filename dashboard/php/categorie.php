<?php
include('connessione.php');

if($_GET['type'] == 'save' && $_GET['type'] != 'db') {

    $data = json_decode(file_get_contents("php://input"));
    $fp = fopen('../json/categorie.json', 'w');
    fwrite($fp, json_encode($data));
    fclose($fp);

} elseif ($_GET['type'] == 'db'){

    function catJson($con) {
        $categorieArray = [];
        $result = mysqli_query($con,"SELECT * FROM categorie ORDER BY cat_pos");
        while($row= mysqli_fetch_array($result)) {
            $row_array['i'] = (int)$row['cat_id'];
            $row_array['n'] = html_entity_decode($row['cat_nome']);
            $row_array['y'] = (int)$row['cat_pos'];
            $row_array['v'] = (int)$row['cat_show'];
            $row_array['x'] = html_entity_decode($row['cat_txt']);

            array_push($categorieArray,$row_array);
        }
        $fp = fopen('../json/categorie.json', 'w');
        $out = array_values($categorieArray);
        fwrite($fp, json_encode($out));
        fclose($fp);
    }
    catJson($con);

} else {

    $data = json_decode(file_get_contents("php://input"));
    $nome = addslashes($data->nome);
    $text = addslashes($data->text);

    $file = $data->id . ".jpg";

    $path = '../archivio_dati/Categorie/';
    $pathFile =  $path . $file;

    switch ($_GET['type']) {
        case 'new':
            $image = explode('base64,',$data->image);
            file_put_contents($pathFile, base64_decode($image[1]));

            $sql="INSERT INTO categorie (
              cat_id, cat_nome, cat_pos, cat_show, cat_txt
              ) VALUES (
              '$data->id', '$nome', '$data->pos', '$data->show', '$text'
              )";
            mysqli_query($con,$sql) or die(mysqli_error($con));
            break;
        case 'delete':
            unlink($pathFile);

            $sql="DELETE FROM categorie WHERE cat_id='$data->id'";
            mysqli_query($con,$sql) or die(mysqli_error($con));
            break;
        case 'update':
            if (substr($data->image, 0, 4) === 'data') {
                $image = explode('base64,',$data->image);
                file_put_contents($pathFile, base64_decode($image[1]));
            }

            $sql="UPDATE categorie SET
              cat_pos='$data->pos',
              cat_nome='$nome',
              cat_show='$data->show',
              cat_txt='$text'
              WHERE cat_id='$data->id'";
            mysqli_query($con,$sql) or die(mysqli_error($con));
            break;
    }
}

echo "DONE";

mysqli_close($con);

