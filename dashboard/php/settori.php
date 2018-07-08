<?php
include('connessione.php');

if($_GET['type'] == 'save' && $_GET['type'] != 'db') {

    $data = json_decode(file_get_contents("php://input"));
    $fp = fopen('../json/settori.json', 'w');
    fwrite($fp, json_encode($data));
    fclose($fp);

} elseif ($_GET['type'] == 'db'){

    function setJson($con) {
        $settoriArray = [];
        $result = mysqli_query($con,"SELECT cat_id FROM categorie ORDER BY cat_pos");
        while($row= mysqli_fetch_array($result)) {
            $cat_id = $row['cat_id'];

            $resultSet = mysqli_query($con,"SELECT * FROM settori WHERE set_cat_id = '$cat_id' ORDER BY set_pos");
            while($rowSet= mysqli_fetch_array($resultSet)) {
                $rowSet_array['i'] = (int)$rowSet['set_id'];
                $rowSet_array['n'] = html_entity_decode($rowSet['set_nome']);
                $rowSet_array['g'] = (int)$rowSet['set_cat_id'];
                $rowSet_array['y'] = (int)$rowSet['set_pos'];
                $rowSet_array['v'] = (int)$rowSet['set_show'];
                $rowSet_array['x'] = html_entity_decode($rowSet['set_txt']);
                $rowSet_array['o'] = (int)$rowSet['set_home'];

/*                $lineeArray = [];
                $resultLinee = mysqli_query($con,"SELECT * FROM linee JOIN settori_linee ON linee.line_id = settori_linee.stln_line_id WHERE stln_set_id = '$rowSet[set_id]' AND line_show = 1 ORDER BY line_id");
                while($rowLinee= mysqli_fetch_array($resultLinee)) {
                    $rowLinee_array['i'] = (int)$rowLinee['line_id'];
//                    $rowLinee_array['nome'] = $rowLinee['line_nome'];
//                    $rowLinee_array['mark'] = (int)$rowLinee['line_mark_id'];
//                    $rowLinee_array['time'] = (int)$rowLinee['line_time'];
//                    $rowLinee_array['war'] = $rowLinee['line_war'];
//                    $rowLinee_array['pr'] = (int)$rowLinee['stln_price'];
    //                $rowLinee_array['tags'] = $rowLinee['line_tags'];
    //                $rowLinee_array['manager'] = $rowLinee['line_manager'];
                    $tbprArray = [];

                    $stprArray = [];
                    $resultStpr = mysqli_query($con,"SELECT * FROM settori_prodotti WHERE stpr_nwln_id = '$rowLinee[line_id]'");
                    while($rowStpr= mysqli_fetch_array($resultStpr)) {
                        $arraySet = json_decode($rowStpr['stpr_array']);
                        for($i = 0; $i < count($arraySet); $i++) {
                            if($arraySet[$i] == $rowSet['set_id']) {
                                $resultTbpr = mysqli_query($con,"SELECT tbpr_nome, tbpr_id, tbpr_pos FROM prodotti JOIN tabelle_prodotti ON tabelle_prodotti.tbpr_id = prodotti.prd_tbpr WHERE prd_id = '$rowStpr[stpr_prd]' ORDER BY tbpr_pos DESC");
                                while($rowTbpr= mysqli_fetch_array($resultTbpr)) {
                                    $id = (int)$rowTbpr['tbpr_id'];
//                                    $pos = (int)$rowTbpr['tbpr_pos'];
//                                    $nome = $rowTbpr['tbpr_nome'];
                                    if(in_array($id, $tbprArray) == FALSE ) {
                                        $tbprArray[] = $id;
//                                        array_push($stprArray, (object) ['id' => $id, 'nome' => $nome, 'pos' => $pos]);
                                        array_push($stprArray, $id);
                                    }
                                }
                            }
                        }
                    }
                    $rowLinee_array['t'] = $stprArray;

                    array_push($lineeArray, $rowLinee_array);
                }
                $rowSet_array['l'] = $lineeArray;*/

                array_push($settoriArray,$rowSet_array);
            }

        }
        $fp = fopen('../json/settori.json', 'w');
        $out = array_values($settoriArray);
        fwrite($fp, json_encode($out));
        fclose($fp);
    }

    setJson($con);

} else {

    $data = json_decode(file_get_contents("php://input"));
    $nome = addslashes($data->nome);
    $text = addslashes($data->text);

    $file = $data->id . ".jpg";

    $path = '../archivio_dati/Settori/';
    $pathFile =  $path . $file;

    switch ($_GET['type']) {
        case 'new':
            $image = explode('base64,',$data->image);
            file_put_contents($pathFile, base64_decode($image[1]));

            $sql="INSERT INTO settori (set_id, set_nome, set_pos, set_show, set_cat_id, set_txt, set_home) VALUES ('$data->id', '$nome', '$data->pos', '$data->show', '$data->cat', '$text', '$data->home')";
            mysqli_query($con,$sql) or die(mysqli_error($con));
            break;
        case 'delete':
            $sql="DELETE FROM settori WHERE set_id='$data->id'";
            mysqli_query($con,$sql) or die(mysqli_error($con));
            unlink($pathFile);
            break;
        case 'update':
            if (substr($data->image, 0, 4) === 'data') {
                $image = explode('base64,',$data->image);
                file_put_contents($pathFile, base64_decode($image[1]));
            }

            $sql="UPDATE settori SET
                set_pos ='$data->pos',
                set_nome ='$nome',
                set_show ='$data->show',
                set_cat_id ='$data->cat',
                set_txt ='$text',
                set_home ='$data->home'
                WHERE set_id ='$data->id'";
            mysqli_query($con,$sql) or die(mysqli_error($con));
            break;
    }
}

echo "DONE";

mysqli_close($con);

