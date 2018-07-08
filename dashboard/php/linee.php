<?php
include('connessione.php');
include('funzioni.php');

function lineeJson($con)
{
    $lineeArray = [];
    $resultLinee = mysqli_query($con, "SELECT * FROM linee ORDER BY line_id");
    while ($rowLinee = mysqli_fetch_array($resultLinee)) {
        $rowLinee_array['i'] = (int)$rowLinee['line_id'];
        $rowLinee_array['n'] = html_entity_decode($rowLinee['line_nome']);
        $rowLinee_array['m'] = (int)$rowLinee['line_mark_id'];
        $rowLinee_array['e'] = (int)$rowLinee['line_time'];
        $rowLinee_array['w'] = (int)$rowLinee['line_war'];
        $rowLinee_array['s'] = (int)$rowLinee['line_disc'];
        $rowLinee_array['k'] = (int)$rowLinee['line_pdf_file'];
        $rowLinee_array['j'] = (int)$rowLinee['line_spec_file'];
        $rowLinee_array['z'] = (int)$rowLinee['line_price'];
        $rowLinee_array['v'] = (int)$rowLinee['line_show'];
        $rowLinee_array['c'] = (int)$rowLinee['line_vtr'];
        $rowLinee_array['g'] = (int)$rowLinee['line_cat'];
        $rowLinee_array['y'] = (int)$rowLinee['line_pos'];
        $rowLinee_array['q'] = json_decode($rowLinee['line_set']);
        $rowLinee_array['a'] = json_decode($rowLinee['line_link']);

        if($rowLinee_array['a'] == null) $rowLinee_array['a'] = [false];
        if($rowLinee_array['q'] == null) $rowLinee_array['q'] = [];
        array_push($lineeArray, $rowLinee_array);
    }
    $fp = fopen('../json/linee.json', 'w');
    $out = array_values($lineeArray);
    fwrite($fp, json_encode($out));
    fclose($fp);
}

$data = json_decode(file_get_contents("php://input"));
$nome = addslashes($data->nome);
$pathNome = str_replace(" ", "_", $data->nome);
$mark_id = $data->mark;

$fileS = $pathNome . "_specifiche.pdf";
$fileC = $pathNome . "_catalogo.pdf";
$fileI = $pathNome . ".jpg";

$mark = str_replace(" ", "_", convertMark($mark_id, $con));
$path = '../archivio_dati/' . $mark . '/' . $pathNome;
$pathFileS = $path . '/' . $fileS;
$pathFileC = $path . '/' . $fileC;
$pathFileI = $path . '/' . $fileI;

$ctl = ($data->ctl !== 0) ? 1 : 0;
$spc = ($data->spc !== 0) ? 1 : 0;

$settori = json_encode($data->set);
$link = json_encode($data->link);

if (isset($data->sourceNome) && ($data->sourceNome != $data->nome || $data->sourceMark != $data->mark)) {
    $sourceMark = str_replace(" ", "_", convertMark($data->sourceMark, $con));
    $sourceNome = str_replace(" ", "_", $data->sourceNome);
    $sourcePath = '../archivio_dati/' . $sourceMark . '/' . $sourceNome;
    $sourceFileS = $sourceNome . "_specifiche.pdf";
    $sourceFileC = $sourceNome . "_catalogo.pdf";
    $sourceFileI = $sourceNome . ".jpg";
    $sourcePathFileS = $sourcePath . "/" . $sourceFileS;
    $sourcePathFileC = $sourcePath . "/" . $sourceFileC;
    $sourcePathFileI = $sourcePath . "/" . $sourceFileI;

    $middlePath = '../archivio_dati/' . $mark . '/' . $pathNome;
    $middlePathFileS = $middlePath . "/" . $sourceFileS;
    $middlePathFileC = $middlePath . "/" . $sourceFileC;
    $middlePathFileI = $middlePath . "/" . $sourceFileI;
}

switch ($_GET['type']) {
    case 'new':

        if (!isset($data->sourceMark)) {
            mkdir($path);
            mkdir($path . "/Prodotti");
            mkdir($path . "/Vetrina");
            mkdir($path . "/Render");
        }

        $sql = "INSERT INTO linee (
                line_id,
                line_nome,
                line_mark_id,
                line_time,
                line_war,
                line_disc,
                line_spec_file,
                line_pdf_file,
                line_vtr,
                line_show,
                line_price,
                line_link,
                line_cat,
                line_pos,
                line_set
              ) VALUES (
                '$data->id',
                '$nome',
                '$mark_id',
                '$data->time',
                '$data->war',
                '$data->disc',
                '$spc',
                '$ctl',
                '$data->vtr',
                '$data->show',
                '$data->price',
                '$link',
                '$data->cat',
                '$data->pos',
                '$settori'
              )";
        mysqli_query($con, $sql) or die(mysqli_error($con));

        if (isset($data->spc) && substr($data->spc, 0, 4)) {
            $specifiche = explode('base64,', $data->spc);
            file_put_contents($pathFileS, base64_decode($specifiche[1]));
        }

        if (isset($data->ctl) && substr($data->ctl, 0, 4)) {
            $catalogo = explode('base64,', $data->ctl);
            file_put_contents($pathFileC, base64_decode($catalogo[1]));
        }

        $image = explode('base64,',$data->image);
        file_put_contents($pathFileI, base64_decode($image[1]));

        break;

    case 'delete':
        $sql = "DELETE FROM linee WHERE line_id='$data->id'";
        mysqli_query($con, $sql) or die(mysqli_error($con));
        deleteDirectory($path);
        break;

    case 'update':
        $result = mysqli_query($con, "SELECT * FROM linee WHERE line_id='$data->id'");
        while ($row = mysqli_fetch_array($result)) {
            $oldNome = $row['line_nome'];
            $oldMark = $row['line_mark_id'];
            $oldCtl = $row['line_pdf_file'];
            $oldSpc = $row['line_spec_file'];
        };
        if (isset($data->sourceMark) && $data->sourceMark != $data->mark) {
            copyDirectory($sourcePath, $path);
            deleteDirectory($sourcePath);
            if ($oldSpc == 1) rename($middlePathFileS, $pathFileS);
            if ($oldCtl == 1) rename($middlePathFileC, $pathFileC);
            rename($middlePathFileI, $pathFileI);
        }
        if ($data->sourceNome != $data->nome) {
            rename($sourcePath, $path);
            if ($oldSpc == 1) rename($middlePathFileS, $pathFileS);
            if ($oldCtl == 1) rename($middlePathFileC, $pathFileC);
            rename($middlePathFileI, $pathFileI);
        }
        if ($data->ctl === 0 && $oldCtl == 1) {
            unlink($pathFileC);
        }
        if ($data->spc === 0 && $oldSpc == 1) {
            unlink($pathFileS);
        }
        if ($data->spc !== 0 && $data->spc !== 1) {
            $specifiche = explode('base64,', $data->spc);
            file_put_contents($pathFileS, base64_decode($specifiche[1]));
        }
        if ($data->ctl !== 0 && $data->ctl !== 1) {
            $catalogo = explode('base64,', $data->ctl);
            file_put_contents($pathFileC, base64_decode($catalogo[1]));
        }
        if (substr($data->image, 0, 4) === 'data') {
            $image = explode('base64,',$data->image);
            file_put_contents($pathFileI, base64_decode($image[1]));
        }
        $sql = "UPDATE linee SET
                line_nome='$nome',
                line_mark_id='$mark_id',
                line_disc='$data->disc',
                line_time='$data->time',
                line_spec_file='$spc',
                line_pdf_file='$ctl',
                line_vtr = '$data->vtr',
                line_show = '$data->show',
                line_price = '$data->price',
                line_set = '$settori',
                line_cat = '$data->cat',
                line_pos = '$data->pos',
                line_link = '$link'
                WHERE line_id='$data->id'";
        mysqli_query($con, $sql) or die(mysqli_error($con));
        break;
}
lineeJson($con);
echo "DONE";

mysqli_close($con);