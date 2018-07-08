<?php
include('connessione.php');
include('funzioni.php');

/*$result = mysqli_query($con,"SELECT * FROM rivenditori");
while($row = mysqli_fetch_array($result)) {
    $row_array = json_decode($row['riv_mark']);
    $xxx = [];
    for($i = 0; $i < count($row_array); $i++) {
        array_push($xxx, $row_array[$i]->i);
    }
    $markArray = [];
    $resultMark = mysqli_query($con,"SELECT * FROM marchi WHERE mark_id NOT IN (" . implode(',', $xxx) . ")");
    while($rowMark = mysqli_fetch_array($resultMark)) {
        $row_arrayM['i'] = (int)$rowMark['mark_id'];
        $row_arrayM['s'] = 0;
        $row_arrayM['v'] = 0;
        array_push($markArray, $row_arrayM);
    }
    $object = json_decode(json_encode($markArray), FALSE);
    array_push($row_array, $object);
}*/

function rivenditoriOnlineJson($con) {
    $array = [];
    $result = mysqli_query($con,"SELECT * FROM rivenditori");
    while($row = mysqli_fetch_array($result)) {
        $row_array['i'] = (int)$row['riv_id'];
        $row_array['n'] = html_entity_decode($row['riv_nome']);
        $row_array['z'] = (int)$row['riv_naz'];
        $row_array['r'] = (int)$row['riv_reg'];
        $row_array['p'] = (int)$row['riv_prov'];
        $row_array['v'] = (int)$row['riv_conv'];
        $row_array['x'] = html_entity_decode($row['riv_rif']);
        $row_array['s'] = html_entity_decode($row['riv_sede']);
        $row_array['a'] = html_entity_decode($row['riv_notes']);
        $row_array['h'] = $row['riv_tel'];
        $row_array['f'] = $row['riv_fax'];
        $row_array['c'] = $row['riv_cell'];
        $row_array['q'] = $row['riv_web'];
        $row_array['e'] = $row['riv_email'];
        $row_array['l'] = (int)$row['riv_limite'];
        $row_array['b'] = (int)$row['riv_minimo'];
        $row_array['t'] = (int)$row['riv_trasporto'];
        $row_array['j'] = (int)$row['riv_trasporto_type'];
        $row_array['m'] = (int)$row['riv_montaggio'];
        $row_array['k'] = (int)$row['riv_montaggio_type'];
//        $row_array['y'] = json_decode($row['riv_mark']);
        $sss = json_decode($row['riv_mark']);
        $xxx = [];
        for($i = 0; $i < count($sss); $i++) {
            array_push($xxx, $sss[$i]->i);
        }
        $resultMark = mysqli_query($con,"SELECT * FROM marchi WHERE mark_id NOT IN (" . implode(',', $xxx) . ")");
        while($rowMark = mysqli_fetch_array($resultMark)) {
            $row_arrayM['i'] = (int)$rowMark['mark_id'];
            $row_arrayM['s'] = 0;
            $row_arrayM['v'] = 0;
            $row_arrayM['d'] = 0;
            array_push($sss, $row_arrayM);
        }
        $row_array['y'] = $sss;
//        $row_array['o'] = $row['riv_coords'];

        array_push($array,$row_array);
    }
    $fp = fopen('../json/riv.json', 'w');
    $out = array_values($array);
    fwrite($fp, json_encode($out));
    fclose($fp);
}

function rivenditoriJson($con) {
    $array = [];
    $result = mysqli_query($con,"SELECT * FROM rivenditori");
    while($row = mysqli_fetch_array($result)) {
        $row_array['i'] = (int)$row['riv_id'];
        $row_array['n'] = html_entity_decode($row['riv_nome']);
        $row_array['z'] = (int)$row['riv_naz'];
        $row_array['r'] = (int)$row['riv_reg'];
        $row_array['p'] = (int)$row['riv_prov'];
        $row_array['v'] = (int)$row['riv_conv'];
        $row_array['x'] = html_entity_decode($row['riv_rif']);
        $row_array['s'] = html_entity_decode($row['riv_sede']);
        $row_array['a'] = html_entity_decode($row['riv_notes']);
        $row_array['h'] = $row['riv_tel'];
        $row_array['f'] = $row['riv_fax'];
        $row_array['c'] = $row['riv_cell'];
        $row_array['q'] = $row['riv_web'];
        $row_array['e'] = $row['riv_email'];
        $row_array['w'] = html_entity_decode($row['riv_psw']);
        $row_array['l'] = (int)$row['riv_limite'];
        $row_array['b'] = (int)$row['riv_minimo'];
        $row_array['t'] = (int)$row['riv_trasporto'];
        $row_array['j'] = (int)$row['riv_trasporto_type'];
        $row_array['m'] = (int)$row['riv_montaggio'];
        $row_array['k'] = (int)$row['riv_montaggio_type'];
//              $row_array['y'] = json_decode($row['riv_mark']);
        $sss = json_decode($row['riv_mark']);
        $xxx = [];
        for($i = 0; $i < count($sss); $i++) {
            array_push($xxx, $sss[$i]->i);
        }
        $resultMark = mysqli_query($con,"SELECT * FROM marchi WHERE mark_id NOT IN (" . implode(',', $xxx) . ")");
        while($rowMark = mysqli_fetch_array($resultMark)) {
            $row_arrayM['i'] = (int)$rowMark['mark_id'];
            $row_arrayM['s'] = 0;
            $row_arrayM['v'] = 0;
            $row_arrayM['d'] = 0;
            array_push($sss, $row_arrayM);
        }
        $row_array['y'] = $sss;
//            $row_array['o'] = $row['riv_coords'];

        $string = json_encode($sss);
        $sql="UPDATE rivenditori SET riv_mark = '$string' WHERE riv_id = '$row[riv_id]'";
        mysqli_query($con,$sql);

        array_push($array,$row_array);
    }
    $fp = fopen('../json/rivenditori.json', 'w');
    $out = array_values($array);
    fwrite($fp, json_encode($out));
    fclose($fp);
}

if($_GET['type'] == 'save' && $_GET['type'] != 'db') {

    $data = json_decode(file_get_contents("php://input"));
    $fp = fopen('../json/rivenditori.json', 'w');
    fwrite($fp, json_encode($data));
    fclose($fp);
    rivenditoriJson($con);
    rivenditoriOnlineJson($con);

} elseif ($_GET['type'] == 'db'){

    rivenditoriJson($con);
    rivenditoriOnlineJson($con);

} else {

    $data = json_decode(file_get_contents("php://input"));

    $file = $data->id . ".jpg";
    $path = '../archivio_dati/Rivenditori/';
    $pathFile =  $path . $file;
    $nome = addslashes($data->nome);
    $rif = addslashes($data->rif);
    $sede = addslashes($data->sede);
    $notes = addslashes($data->notes);

    if(isset($data->sourceID)) {
        $sourceFile = $data->sourceID . ".jpg";
        $sourcePathFile =  $path . $sourceFile;
    }

    $mark_array = json_encode($data->mark);

    switch ($_GET['type']) {
        case 'new':
            $sql = "INSERT INTO rivenditori (
              riv_id, 
              riv_nome,
              riv_naz,
              riv_reg,
              riv_prov,
              riv_conv,
              riv_rif,
              riv_sede,
              riv_tel,
              riv_fax,
              riv_cell,
              riv_web,
              riv_email,
              riv_psw,
              riv_limite,
              riv_minimo,
              riv_trasporto,
              riv_trasporto_type,
              riv_montaggio,
              riv_montaggio_type,
              riv_mark,
              riv_notes
            ) VALUES (
              '$data->id',
              '$nome',
              '$data->naz',
              '$data->reg',
              '$data->prov',
              '$data->conv',
              '$rif',
              '$sede',
              '$data->tel',
              '$data->fax',
              '$data->cell',
              '$data->web',
              '$data->email',
              '$data->psw',
              '$data->limite',
              '$data->minimo',
              '$data->trasporto',
              '$data->trasporto_type',
              '$data->montaggio',
              '$data->montaggio_type',
              '$mark_array',
              '$notes'
            )";
            mysqli_query($con,$sql) or die(mysqli_error($con));

            if (substr($data->image, 0, 4) === 'data') {
                $image = explode('base64,',$data->image);
                file_put_contents($pathFile, base64_decode($image[1]));
            } else {
                copy($sourcePathFile, $pathFile);
            }
            break;
        case 'delete':
            $sql="DELETE FROM rivenditori WHERE riv_id='$data->id'";
            mysqli_query($con,$sql) or die(mysqli_error($con));
            unlink($pathFile);
            break;
        case 'update':
            $result = mysqli_query($con,"SELECT * FROM rivenditori WHERE riv_id='$data->id'");
            $sql="UPDATE rivenditori SET
                riv_nome = '$nome',
                riv_naz = '$data->naz',
                riv_reg = '$data->reg',
                riv_prov = '$data->prov',
                riv_conv = '$data->conv',
                riv_rif = '$rif',
                riv_sede = '$sede',
                riv_notes = '$notes',
                riv_tel = '$data->tel',
                riv_cell = '$data->cell',
                riv_fax = '$data->fax',
                riv_web = '$data->web',
                riv_email = '$data->email',
                riv_psw = '$data->psw',
                riv_limite = '$data->limite',
                riv_minimo = '$data->minimo',
                riv_trasporto = '$data->trasporto',
                riv_trasporto_type = '$data->trasporto_type',
                riv_montaggio = '$data->montaggio',
                riv_montaggio_type = '$data->montaggio_type',
                riv_mark = '$mark_array'
            WHERE riv_id='$data->id'";
            mysqli_query($con,$sql) or die(mysqli_error($con));
            if (substr($data->image, 0, 4) === 'data') {
                $image = explode('base64,',$data->image);
                file_put_contents($pathFile, base64_decode($image[1]));
            }
            break;
    }
}

echo "DONE";

mysqli_close($con);

