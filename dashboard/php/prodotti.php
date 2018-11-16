<?php
include('connessione.php');
include('funzioni.php');

$mark_id = false;
$line_id = false;
$cod = false;

if ($_GET['type'] !== 'get') {
    $data = json_decode(file_get_contents("php://input"));
    $mark_id = $data->mark;
    $mark = str_replace(' ', '_', convertMark($mark_id, $con));
    $line_id = $data->line;
    $line = str_replace(' ', '_', convertLine($line_id, $con));

    $path = '../archivio_dati/' . $mark . '/' . $line . '/Prodotti/';
    $title = addslashes($data->title);
    $note = (isset($data->note)) ? addslashes($data->note) : null;
    $dim = (isset($data->dim)) ? $data->dim : null;
    $prices = json_encode($data->prices);
    $cod = $data->cod;
    $file = $cod . ".jpg";
    $pathFile = $path . $file;
}

switch ($_GET['type']) {
    case 'get' :
        $result_array = array();
        $sql = "SELECT * FROM prodotti";
        $result = mysqli_query($con, $sql);
        while ($row = $result->fetch_assoc()) {
            array_push($result_array, $row);
        }
        echo json_encode($result_array, JSON_NUMERIC_CHECK);
        break;
    case 'new':
        $sql = "INSERT INTO prodotti (
                prd_title,
                prd_cod,
                prd_mark_id,
                prd_line_id,
                prd_tbpr,
                prd_dim,
                prd_lnfn_id,
                prd_note,
                prd_abb,
                prd_fin,
                prd_pos,
                prd_price_array
            ) VALUES (
                '$title',
                '$data->cod',
                '$mark_id',
                '$line_id',
                '$data->tbpr',
                '$dim',
                '$data->lnfn',
                '$note',
                '$data->abb',
                '$data->fin',
                '$data->pos',
                '$prices'
            )";
        mysqli_query($con, $sql) or die(mysqli_error($con));

        if (substr($data->image, 0, 4) === 'data') {
            $image = explode('base64,', $data->image);
            file_put_contents($pathFile, base64_decode($image[1]));
        } else {
            copy($sourcePathFile, $pathFile);
        }
        echo "Created";
        break;
    case 'delete':
        $sql = "DELETE FROM prodotti WHERE prd_id='$data->id'";
        mysqli_query($con, $sql) or die(mysqli_error($con));
        unlink($pathFile);
        echo "Deleted";
        break;
    case 'update':
        $codiceOriginale = false;
        $result = mysqli_query($con, "SELECT * FROM prodotti WHERE prd_id = '$data->id'");
        while ($row = mysqli_fetch_array($result)) {
            $codiceOriginale = $row['line_cod'];
        };
        $originalePathFile = $path . $codiceOriginale . 'jpg';

        if ($codiceOriginale !== $cod) {
            rename($originalePathFile, $pathFile);
        }
        if (substr($data->image, 0, 4) === 'data') {
            $image = explode('base64,', $data->image);
            file_put_contents($pathFile, base64_decode($image[1]));
        }

        $sql = "UPDATE prodotti SET
                    prd_cod         = '$data->cod',
                    prd_title       = '$title',
                    prd_mark_id     = '$mark_id',
                    prd_line_id     = '$line_id',
                    prd_tbpr        = '$data->tbpr',
                    prd_dim         = '$dim',
                    prd_dim         = '$dim',
                    prd_lnfn_id     = '$data->lnfn',
                    prd_note        = '$note',
                    prd_abb         = '$data->abb',
                    prd_fin         = '$data->fin',
                    prd_pos         = '$data->pos',
                    prd_price_array = '$prices'
                    WHERE prd_id='$data->id'";
        mysqli_query($con, $sql) or die(mysqli_error($con));
        break;
}

mysqli_close($con);

