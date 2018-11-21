<?php
include('connessione.php');
include('funzioni.php');

if ($_GET['type'] !== 'get') {
    $data = json_decode(file_get_contents("php://input"));
    $nome = addslashes($data->nome);
    $lineaNuova = str_replace(" ", "_", $data->nome);

    $specifiche = $lineaNuova . "_specifiche.pdf";
    $catalogo = $lineaNuova . "_catalogo.pdf";

    $marchioNuovo = str_replace(" ", "_", convertMark($data->mark, $con));
    $path = '../archivio_dati/' . $marchioNuovo . '/' . $lineaNuova;
    $pathSpecifiche = $path . '/' . $specifiche;
    $pathCatalogo = $path . '/' . $catalogo;

    $ctl = ($data->ctl) ? 1 : 0;
    $spc = ($data->spc) ? 1 : 0;

    $link = json_encode($data->link);
}

switch ($_GET['type']) {
    case 'get' :
        $result_array = array();
        $sql = "SELECT * FROM linee ORDER BY line_nome";
        $result = mysqli_query($con, $sql);
        while ($row = $result->fetch_assoc()) {
            $row['line_cat'] = intval($row['line_cat']);
            $row['line_disc'] = intval($row['line_disc']);
            $row['line_id'] = intval($row['line_id']);
            $row['line_mark_id'] = intval($row['line_mark_id']);
            $row['line_pdf_file'] = intval($row['line_pdf_file']);
            $row['line_pos'] = intval($row['line_pos']);
            $row['line_price'] = intval($row['line_price']);
            $row['line_show'] = intval($row['line_show']);
            $row['line_spec_file'] = intval($row['line_spec_file']);
            $row['line_time'] = intval($row['line_time']);
            $row['line_vtr'] = intval($row['line_vtr']);
            $row['line_war'] = intval($row['line_war']);
            $row['line_set'] = json_decode($row['line_set']);
            $row['line_link'] = json_decode($row['line_link']);
            array_push($result_array, $row);
        }
        echo json_encode($result_array);
        break;
    case 'new':

        if (!isset($data->sourceMark)) {
            mkdir($path);
            mkdir($path . "/Prodotti");
            mkdir($path . "/Vetrina");
            mkdir($path . "/Render");
        }

        $sql = "INSERT INTO linee (
                line_nome,
                line_mark_id,
                line_time,
                line_war,
                line_disc,
                line_spec_file,
                line_pdf_file,
                line_vtr,
                line_show,
                line_link,
                line_cat,
                line_pos
              ) VALUES (
                '$nome',
                '$data->mark',
                '$data->time',
                '$data->war',
                '$data->disc',
                '$spc',
                '$ctl',
                '$data->vtr',
                '$data->show',
                '$link',
                '$data->cat',
                '$data->pos'
              )";
        mysqli_query($con, $sql) or die(mysqli_error($con));

        if (isset($data->spc) && substr($data->spc, 0, 4)) {
            $specifiche = explode('base64,', $data->spc);
            file_put_contents($pathSpecifiche, base64_decode($specifiche[1]));
        }
        if (isset($data->ctl) && substr($data->ctl, 0, 4)) {
            $catalogo = explode('base64,', $data->ctl);
            file_put_contents($pathCatalogo, base64_decode($catalogo[1]));
        }
        echo "Created";
        break;
    case 'delete':
        $result = mysqli_query($con, "SELECT line_nome, line_mark_id FROM linee WHERE line_id = '$data->id'");
        $linea = false;
        $marchio = false;
        while ($row = mysqli_fetch_array($result)) {
            $linea = $row['line_nome'];
            $marchio = str_replace(" ", "_", convertMark($row['line_mark_id'], $con));
        };
        $path = '../archivio_dati/' . $marchio . '/' . $linea;
        deleteDirectory($path);
        $sql = "DELETE FROM linee WHERE line_id='$data->id'";
        mysqli_query($con, $sql) or die(mysqli_error($con));
        echo "Deleted";
        break;
    case 'update':
        $lineaOriginaleNome = false;
        $marchioOriginaleId = false;
        $catalogoOriginaleValue = false;
        $specificheOriginaleValue = false;

        $result = mysqli_query($con, "SELECT * FROM linee WHERE line_id='$data->id'");
        while ($row = mysqli_fetch_array($result)) {
            $lineaOriginaleNome = $row['line_nome'];
            $marchioOriginaleId = $row['line_mark_id'];
            $catalogoOriginaleValue = $row['line_pdf_file'];
            $specificheOriginaleValue = $row['line_spec_file'];
        };

        $marchioOriginale = str_replace(" ", "_", convertMark($marchioOriginaleId, $con));
        $lineaOriginale = str_replace(" ", "_", $lineaOriginaleNome);
        $nuovoPathLinea = '../archivio_dati/' . $marchioOriginale . '/' . $lineaNuova;
        $originalePathLinea = '../archivio_dati/' . $marchioOriginale . '/' . $lineaOriginale;
        $originaleSpecifiche = $lineaOriginale . "_specifiche.pdf";
        $originaleCatalogo = $lineaOriginale . "_catalogo.pdf";

        $originalePathSpecifiche = $originalePathLinea . "/" . $originaleSpecifiche;
        $originalePathCatalogo = $originalePathLinea. "/" . $originaleCatalogo;
        $nuovoPathSpecifiche = $originalePathLinea . "/" . $specifiche;
        $nuovoPathCatalogo = $originalePathLinea. "/" . $catalogo;

        if (intval($marchioOriginaleId) !== intval($data->mark)) {
            if ($lineaOriginaleNome !== $data->nome) {
                if (file_exists($originalePathSpecifiche)) rename($originalePathSpecifiche, $nuovoPathSpecifiche);
                if (file_exists($originalePathCatalogo)) rename($originalePathCatalogo, $nuovoPathCatalogo);
                rename($originalePathLinea, $nuovoPathLinea);
            }
            copyDirectory($nuovoPathLinea, $path);
            deleteDirectory($nuovoPathLinea);
        } else {
            if ($lineaOriginaleNome !== $data->nome) {
                if (file_exists($originalePathSpecifiche)) rename($originalePathSpecifiche, $nuovoPathSpecifiche);
                if (file_exists($originalePathCatalogo)) rename($originalePathCatalogo, $nuovoPathCatalogo);
                rename($originalePathLinea, $nuovoPathLinea);
            }
        }
        if (substr($data->spc, 0, 4) === "data") {
            $specifiche = explode('base64,', $data->spc);
            file_put_contents($pathSpecifiche, base64_decode($specifiche[1]));
        }
        if (substr($data->ctl, 0, 4) === "data") {
            $catalogo = explode('base64,', $data->ctl);
            file_put_contents($pathCatalogo, base64_decode($catalogo[1]));
        }
        $sql = "UPDATE linee SET
                line_nome='$nome',
                line_mark_id='$data->mark',
                line_disc='$data->disc',
                line_time='$data->time',
                line_spec_file='$spc',
                line_pdf_file='$ctl',
                line_vtr = '$data->vtr',
                line_show = '$data->show',
                line_cat = '$data->cat',
                line_pos = '$data->pos',
                line_link = '$link'
                WHERE line_id='$data->id'";
        mysqli_query($con, $sql) or die(mysqli_error($con));
        echo "Updated";
        break;
}

mysqli_close($con);