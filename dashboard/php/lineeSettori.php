<?php
include('connessione.php');
include('funzioni.php');

if($_GET['type'] == 'save' && $_GET['type'] != 'db') {

    $data = json_decode(file_get_contents("php://input"));
    $fp = fopen('../json/linee_settori.json', 'w');
    fwrite($fp, json_encode($data));
    fclose($fp);

} elseif ($_GET['type'] == 'db'){

    function lineeSettoriJson($con) {
        $lineeArray = [];
        $result = mysqli_query($con,"SELECT * FROM settori_linee ORDER BY stln_id");
        while($row = mysqli_fetch_array($result)) {
            $row_array['i'] = (int)$row['stln_id'];
            $row_array['m'] = (int)$row['stln_mark_id'];
            $row_array['l'] = (int)$row['stln_line_id'];
            $row_array['h'] = (int)$row['stln_set_id'];
            $row_array['v'] = (int)$row['stln_show'];
            $row_array['z'] = (int)$row['stln_price'];
            $row_array['q'] = json_decode($row['stln_manager']);

            array_push($lineeArray, $row_array);
        }
        $fp = fopen('../json/linee_settori.json', 'w');
        $out = array_values($lineeArray);
        fwrite($fp, json_encode($out));
        fclose($fp);
    }

    lineeSettoriJson($con);

} else {

    $data = json_decode(file_get_contents("php://input"));
    $mark_id = $data->mark;
    $mark = str_replace(' ', '_', convertMark($mark_id, $con));
    $line_id = $data->line;
    $line = str_replace(' ', '_', convertLine($line_id, $con));
    $set_id = $data->set;
    $set = str_replace(' ', '_', convertSet($set_id, $con));

    $file = $line . "_" . $set . ".jpg";
    $path = '../archivio_dati/' . $mark . '/' . $line . '/Vetrina/';
    $pathFile =  $path . $file;

    $manager = json_encode($data->man);

    if(isset($data->sourceLine)) {
        $sourceMark = str_replace(" ", "_", convertMark($data->sourceMark, $con));
        $sourceLine = str_replace(" ", "_", convertLine($data->sourceLine, $con));
        $sourceSet = str_replace(" ", "_", convertSet($data->sourceSet, $con));
        $sourcePath = '../archivio_dati/' . $sourceMark . '/' . $sourceLine . '/Vetrina/';
        $sourceFile = $sourceLine . "_" . $sourceSet . ".jpg";
        $sourcePathFile =  $sourcePath . $sourceFile;
    }

    switch ($_GET['type']) {
        case 'new':
            $sql="INSERT INTO settori_linee (
                stln_id,
                stln_mark_id,
                stln_line_id,
                stln_set_id,
                stln_show,
                stln_manager,
                stln_price
              ) VALUES (
                '$data->id',
                '$mark_id',
                '$line_id',
                '$set_id',
                '$data->show',
                '$manager',
                '$data->price'
              )";
            mysqli_query($con,$sql) or die(mysqli_error($con));

            $image = explode('base64,',$data->image);
            file_put_contents($pathFile, base64_decode($image[1]));
            break;

        case 'delete':
            $sql="DELETE FROM settori_linee WHERE stln_id='$data->id'";
            mysqli_query($con,$sql) or die(mysqli_error($con));
            unlink($pathFile);
            break;

        case 'update':
            $oldSet = null;
            $result = mysqli_query($con,"SELECT stln_set_id FROM settori_linee WHERE stln_id='$data->id'");
            while($row = mysqli_fetch_array($result)) {
                $oldSet = $row['stln_set_id'];
            };
            $sql="UPDATE settori_linee SET
                  stln_mark_id='$mark_id',
                  stln_line_id='$line_id',
                  stln_set_id='$set_id',
                  stln_show='$data->show',
                  stln_manager='$manager',
                  stln_price='$data->price'
                  WHERE
                  stln_id='$data->id'";

            mysqli_query($con,$sql) or die(mysqli_error($con));

            $result = mysqli_query($con,"SELECT stpr_id, stpr_array FROM settori_prodotti WHERE stpr_nwln_id = '$line_id'");
            while($row = mysqli_fetch_array($result)) {
                $array = json_decode($row['stpr_array']);
                $id = $row['stpr_id'];
                for($i = 0; $i < count($array); $i++) {
                    if($array[$i] == $oldSet) {
                        $array[$i] = $set_id;
                        $stringArray = json_encode($array);
                        $sql="UPDATE settori_prodotti SET stpr_array='$stringArray' WHERE stpr_id='$id'";
                        mysqli_query($con,$sql) or die(mysqli_error($con));
                    }
                }
            };

            if (substr($data->image, 0, 4) === 'data') {
                $image = explode('base64,',$data->image);
                file_put_contents($pathFile, base64_decode($image[1]));
                if($set_id != $oldSet) {
                    unlink($sourcePathFile);
                }
            } else {
                copy($sourcePathFile, $pathFile);
                if($set_id != $oldSet) {
                    unlink($sourcePathFile);
                }
            }
            break;
    }
}

echo "DONE";

mysqli_close($con);

