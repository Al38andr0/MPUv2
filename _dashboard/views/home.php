<?php
include('../php/connessione.php');

function catJson($con) {
    $categorieArray = [];
    $result = mysqli_query($con,"SELECT * FROM categorie WHERE cat_visible = 1 ORDER BY cat_pos");
    while($row= mysqli_fetch_array($result)) {
        $cat_id = $row['cat_id'];
        $row_array['id'] = (int)$row['cat_id'];
        $row_array['nome'] = $row['cat_nome'];
        $row_array['pos'] = (int)$row['cat_pos'];
        $row_array['show'] = (int)$row['cat_show'];

//        $settoriArray = [];
//        $resultSet = mysqli_query($con,"SELECT * FROM settori WHERE set_cat_id = '$row[cat_id]' AND set_visible = 1 AND set_show = 1 ORDER BY set_pos");
//        while($rowSet= mysqli_fetch_array($resultSet)) {
//            $rowSet_array['nome'] = $rowSet['set_nome'];
//            $rowSet_array['id'] = (int)$rowSet['set_id'];
//            $rowSet_array['pos'] = (int)$rowSet['set_pos'];

/*            $lineeArray = [];
            $resultLinee = mysqli_query($con,"SELECT * FROM linee JOIN settori_linee ON linee.line_id = settori_linee.stln_line_id WHERE stln_set_id = '$rowSet[set_id]' AND line_visible = 1 AND line_show = 1 ORDER BY line_id");
            while($rowLinee= mysqli_fetch_array($resultLinee)) {
                $rowLinee_array['id'] = (int)$rowLinee['line_id'];
                $rowLinee_array['nome'] = $rowLinee['line_nome'];
                $rowLinee_array['mark'] = (int)$rowLinee['line_mark_id'];
                $rowLinee_array['time'] = (int)$rowLinee['line_time'];
                $rowLinee_array['war'] = $rowLinee['line_war'];
                $rowLinee_array['pr'] = (int)$rowLinee['stln_price'];
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
                                $pos = (int)$rowTbpr['tbpr_pos'];
                                $nome = $rowTbpr['tbpr_nome'];
                                if(in_array($id, $tbprArray) == FALSE ) {
                                    $tbprArray[] = $id;
                                    array_push($stprArray, (object) ['id' => $id, 'nome' => $nome, 'pos' => $pos]);
                                }
                            }
                        }
                    }
                }
                $rowLinee_array['tbpr'] = $stprArray;

                array_push($lineeArray, $rowLinee_array);
            }
            $rowSet_array['line'] = $lineeArray;*/

//            array_push($settoriArray,$rowSet_array);
//        }
//        $row_array['settori'] = $settoriArray;

/*        $marchiArray = array();
        $resultMarchi = mysqli_query($con,"SELECT * FROM marchi WHERE mark_visible = 1 AND mark_show = 1");
        while($rowMarchi = mysqli_fetch_array($resultMarchi)) {
            $mark_cat_array = $rowMarchi['mark_cat_array'];
            $jsonDec = json_decode($mark_cat_array);
            for($i = 0; $i < count($jsonDec); $i++){
                if($jsonDec[$i] == $cat_id){
                    $rowMarchi_array['id'] = (int)$rowMarchi['mark_id'];
                    $rowMarchi_array['nome'] = $rowMarchi['mark_nome'];
                    $rowMarchi_array['show'] = (int)$rowMarchi['mark_show'];

                    array_push($marchiArray,$rowMarchi_array);
                }
            }
        }*/
//        $row_array['cat_marchi'] = $marchiArray;

        array_push($categorieArray,$row_array);
    }
    $fp = fopen('../json/categorie.json', 'w');
    $out = array_values($categorieArray);
    fwrite($fp, json_encode($out));
    fclose($fp);
}

//catJson($con);

function lineeJson2($con) {
    $lineeArray = [];
    $resultLinee = mysqli_query($con,"SELECT * FROM linee WHERE line_visible = 1 ORDER BY line_id");
    while($rowLinee= mysqli_fetch_array($resultLinee)) {
        $rowLinee_array['id'] = (int)$rowLinee['line_id'];
        $rowLinee_array['nome'] = $rowLinee['line_nome'];
        $rowLinee_array['mark'] = (int)$rowLinee['line_mark_id'];
        $rowLinee_array['time'] = (int)$rowLinee['line_time'];
        $rowLinee_array['war'] = $rowLinee['line_war'];
        $rowLinee_array['tags'] = $rowLinee['line_tags'];
        $rowLinee_array['man'] = $rowLinee['line_manager'];

        array_push($lineeArray, $rowLinee_array);
    }
    $fp = fopen('../json/linee.json', 'w');
    $out = array_values($lineeArray);
    fwrite($fp, json_encode($out));
    fclose($fp);
}

//lineeJson2($con);

function settoriLineeJson($con) {
    $lineeArray = [];
    $result = mysqli_query($con,"SELECT * FROM settori_linee ORDER BY stln_id");
    while($row = mysqli_fetch_array($result)) {
        $row_array['i'] = (int)$row['stln_id'];
        $row_array['m'] = (int)$row['stln_mark_id'];
        $row_array['l'] = (int)$row['stln_line_id'];
        $row_array['h'] = (int)$row['stln_set_id'];
        $row_array['v'] = (int)$row['stln_show'];
        $row_array['z'] = (int)$row['stln_price'];

        array_push($lineeArray, $row_array);
    }
    $fp = fopen('../json/linee_settori.json', 'w');
    $out = array_values($lineeArray);
    fwrite($fp, json_encode($out));
    fclose($fp);
}

//settoriLineeJson($con);

function setJson($con) {
    $settoriArray = [];
    $result = mysqli_query($con,"SELECT cat_id FROM categorie WHERE cat_visible = 1 ORDER BY cat_pos");
    while($row= mysqli_fetch_array($result)) {
        $cat_id = $row['cat_id'];

        $resultSet = mysqli_query($con,"SELECT * FROM settori WHERE set_cat_id = '$cat_id' AND set_visible = 1 ORDER BY set_pos");
        while($rowSet= mysqli_fetch_array($resultSet)) {
            $rowSet_array['id'] = (int)$rowSet['set_id'];
            $rowSet_array['nome'] = $rowSet['set_nome'];
            $rowSet_array['cat'] = (int)$rowSet['set_cat_id'];
            $rowSet_array['pos'] = (int)$rowSet['set_pos'];
            $rowSet_array['show'] = (int)$rowSet['set_show'];

            $lineeArray = [];
            $resultLinee = mysqli_query($con,"SELECT * FROM linee JOIN settori_linee ON linee.line_id = settori_linee.stln_line_id WHERE stln_set_id = '$rowSet[set_id]' AND line_visible = 1 AND line_show = 1 ORDER BY line_id");
            while($rowLinee= mysqli_fetch_array($resultLinee)) {
                $rowLinee_array['id'] = (int)$rowLinee['line_id'];
                $rowLinee_array['nome'] = $rowLinee['line_nome'];
                $rowLinee_array['mark'] = (int)$rowLinee['line_mark_id'];
                $rowLinee_array['time'] = (int)$rowLinee['line_time'];
                $rowLinee_array['war'] = $rowLinee['line_war'];
                $rowLinee_array['pr'] = (int)$rowLinee['stln_price'];
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
                                $pos = (int)$rowTbpr['tbpr_pos'];
                                $nome = $rowTbpr['tbpr_nome'];
                                if(in_array($id, $tbprArray) == FALSE ) {
                                    $tbprArray[] = $id;
                                    array_push($stprArray, (object) ['id' => $id, 'nome' => $nome, 'pos' => $pos]);
                                }
                            }
                        }
                    }
                }
                $rowLinee_array['tbpr'] = $stprArray;

                array_push($lineeArray, $rowLinee_array);
            }
            $rowSet_array['line'] = $lineeArray;

            array_push($settoriArray,$rowSet_array);
        }

    }
    $fp = fopen('../json/settori.json', 'w');
    $out = array_values($settoriArray);
    fwrite($fp, json_encode($out));
    fclose($fp);
}

//setJson($con);

function finitureJson($con) {
    $marchiArray = array();
    $finArray = array();
    $resultFin = mysqli_query($con,"SELECT * FROM finiture WHERE fin_show = 1");
    while($rowFin = mysqli_fetch_array($resultFin)) {
        $rowFin_array['id'] = (int)$rowFin['fin_id'];
        $rowFin_array['cod'] = $rowFin['fin_cod'];
        $rowFin_array['nome'] = $rowFin['fin_nome'];
        $rowFin_array['mark'] = (int)$rowFin['fin_mark_id'];
        $rowFin_array['type'] = (int)$rowFin['fin_type_id'];
        array_push($finArray, $rowFin_array);
    }

    $fp = fopen('../json/finiture.json', 'w');
    $out = array_values($finArray);
    fwrite($fp, json_encode($out));
    fclose($fp);
}

//finitureJson($con);

function tabelleFinitureJson($con) {
        $tabLineeArray = [];
    $resultMarchi = mysqli_query($con,"SELECT * FROM marchi WHERE mark_show = 1 AND mark_visible = 1");
    while($rowMarchi = mysqli_fetch_array($resultMarchi)) {
//        $tabLineeArray = [];
        $resultTabLinee = mysqli_query($con, "SELECT * FROM tabelle_finiture WHERE tab_mark_id = '$rowMarchi[mark_id]'");
        while ($rowTabLinee = mysqli_fetch_array($resultTabLinee)) {
            $rowSetTabLinee_array['id'] = (int)$rowTabLinee['tab_id'];
            $rowSetTabLinee_array['nome'] = $rowTabLinee['tab_nome'];
            $rowSetTabLinee_array['line'] = (int)$rowTabLinee['tab_line_id'];
            $rowSetTabLinee_array['mark'] = (int)$rowTabLinee['tab_mark_id'];

/*            $abbArray = [];
            $resultAbb = mysqli_query($con, "SELECT * FROM abbinamenti WHERE abb_tab = '$rowTabLinee[tab_id]'");
            while ($rowAbb = mysqli_fetch_array($resultAbb)) {
                $rowAbb_array['id'] = (int)$rowAbb['abb_id'];
                $rowAbb_array['fin'] = json_decode($rowAbb['abb_array']);

                array_push($abbArray, $rowAbb_array);
            }
            $rowSetTabLinee_array['abb'] = $abbArray;
*/
            array_push($tabLineeArray, $rowSetTabLinee_array);
        }

//        $fp = fopen('../json/tabelle_finiture/' . $rowMarchi['mark_id'] . '.json', 'w');
        $fp = fopen('../json/finiture_tabelle.json', 'w');
        $out = array_values($tabLineeArray);
        fwrite($fp, json_encode($out));
        fclose($fp);
    }
}

//tabelleFinitureJson($con);

function abbinamentiJson($con) {
    $abbArray = [];
    $resultAbb = mysqli_query($con, "SELECT * FROM abbinamenti");
    while ($rowAbb = mysqli_fetch_array($resultAbb)) {
        $rowAbb_array['id'] = (int)$rowAbb['abb_id'];
        $rowAbb_array['mark'] = (int)$rowAbb['abb_mark_id'];
        $rowAbb_array['line'] = (int)$rowAbb['abb_line_id'];
        $rowAbb_array['tab'] = (int)$rowAbb['abb_tab'];
        $rowAbb_array['fin'] = json_decode($rowAbb['abb_array']);

        array_push($abbArray, $rowAbb_array);
    }

    $fp = fopen('../json/abbinamenti.json', 'w');
    $out = array_values($abbArray);
    fwrite($fp, json_encode($out));
    fclose($fp);
}

//abbinamentiJson($con);

function markJson($con) {
    $marchiArray = [];
    $resultMarchi = mysqli_query($con,"SELECT * FROM marchi WHERE mark_visible = 1");
    while($rowMarchi = mysqli_fetch_array($resultMarchi)) {
        $rowMarchi_array['id'] = (int)$rowMarchi['mark_id'];
        $rowMarchi_array['nome'] = $rowMarchi['mark_nome'];
        $rowMarchi_array['disc'] = (int)$rowMarchi['mark_disc'];
        $rowMarchi_array['list'] = (int)$rowMarchi['mark_list'];
        $rowMarchi_array['show'] = (int)$rowMarchi['mark_show'];
        $rowMarchi_array['cat'] = json_decode($rowMarchi['mark_cat_array']);
/*        $tabProdArray = [];
        $resultTabProd = mysqli_query($con,"SELECT * FROM tabelle_prodotti WHERE tbpr_mark_id= '$rowMarchi[mark_id]' ORDER BY tbpr_pos ASC");
        while($rowTabProd = mysqli_fetch_array($resultTabProd)) {
            $rowTabProd_array['id'] = (int)$rowTabProd['tbpr_id'];
            $rowTabProd_array['nome'] = $rowTabProd['tbpr_nome'];
//            $rowTabProd_array['pos'] = (int)$rowTabProd['tbpr_pos'];
            array_push($tabProdArray, $rowTabProd_array);
        }
        $rowMarchi_array['tabProd'] = $tabProdArray;*/

/*        $lineeArray = [];
        $resultLinee = mysqli_query($con,"SELECT * FROM linee WHERE line_mark_id = '$rowMarchi[mark_id]' AND line_visible = 1 AND line_show = 1");
        while($rowLinee= mysqli_fetch_array($resultLinee)) {
            $rowLinee_array['id'] = (int)$rowLinee['line_id'];
            $rowLinee_array['nome'] = $rowLinee['line_nome'];
            $rowLinee_array['time'] = (int)$rowLinee['line_time'];
            $rowLinee_array['war'] = $rowLinee['line_war'];
            $rowLinee_array['tags'] = $rowLinee['line_tags'];
            $rowLinee_array['manager'] = $rowLinee['line_manager'];

            array_push($lineeArray, $rowLinee_array);
        }
        $rowMarchi_array['line'] = $lineeArray;*/

        array_push($marchiArray,$rowMarchi_array);
        $fp = fopen('../json/marchi.json', 'w');
        $out = array_values($marchiArray);
        fwrite($fp, json_encode($out));
        fclose($fp);
    }
}

//markJson($con);

function tbprJson($con) {
    $tabProdArray = [];
    $resultTabProd = mysqli_query($con,"SELECT * FROM tabelle_prodotti ORDER BY tbpr_pos ASC");
    while($rowTabProd = mysqli_fetch_array($resultTabProd)) {
        $rowTabProd_array['id'] = (int)$rowTabProd['tbpr_id'];
        $rowTabProd_array['nome'] = $rowTabProd['tbpr_nome'];
        $rowTabProd_array['pos'] = (int)$rowTabProd['tbpr_pos'];
        $rowTabProd_array['mark'] = (int)$rowTabProd['tbpr_mark_id'];
        array_push($tabProdArray, $rowTabProd_array);
    }

    $fp = fopen('../json/tbpr.json', 'w');
    $out = array_values($tabProdArray);
    fwrite($fp, json_encode($out));
    fclose($fp);
}

//tbprJson($con);

function prodottiJson($con) {
    $prodottiArray = [];
    $resultProdotti = mysqli_query($con, "SELECT * FROM prodotti");
    while ($rowProdotti = mysqli_fetch_array($resultProdotti)) {
        $rowProdotti_array['i'] = (int)$rowProdotti['prd_id'];
        $rowProdotti_array['m'] = (int)$rowProdotti['prd_mark_id'];
        $rowProdotti_array['l'] = (int)$rowProdotti['prd_line_id'];
        $rowProdotti_array['c'] = $rowProdotti['prd_cod'];
        $rowProdotti_array['n'] = $rowProdotti['prd_title'];
        $rowProdotti_array['t'] = (int)$rowProdotti['prd_tbpr'];
        $rowProdotti_array['d'] = $rowProdotti['prd_dim'];
        $rowProdotti_array['y'] = (int)$rowProdotti['prd_pos'];
        $rowProdotti_array['x'] = (int)$rowProdotti['prd_lnfn_id'];
        $rowProdotti_array['o'] = $rowProdotti['prd_note'];
        $rowProdotti_array['a'] = (int)$rowProdotti['prd_abb'];
        $rowProdotti_array['f'] = (int)$rowProdotti['prd_fin'];
        $rowProdotti_array['z'] = json_decode($rowProdotti['prd_price_array']);

/*            $resultSetProd = mysqli_query($con, "SELECT * FROM settori_prodotti WHERE stpr_prd = '$rowProdotti[prd_id]'");
        while ($rowSetProd = mysqli_fetch_array($resultSetProd)) {
            $stpr_array = json_decode($rowSetProd['stpr_array']);
        }
        $rowProdotti_array['set'] = $stpr_array;*/

        array_push($prodottiArray, $rowProdotti_array);
    }

    $fp = fopen('../json/prodotti.json', 'w');
    $out = array_values($prodottiArray);
    fwrite($fp, json_encode($out));
    fclose($fp);
}

//prodottiJson($con);

function settoriProdottiJson($con) {
    $settoriProdottiArray = [];
    $result = mysqli_query($con, "SELECT * FROM settori_prodotti");
    while ($row = mysqli_fetch_array($result)) {
        $stpr_array['h'] = json_decode($row['stpr_array']);
        $stpr_array['i'] = (int)$row['stpr_id'];
        $stpr_array['m'] = (int)$row['stpr_mark_id'];
        $stpr_array['l'] = (int)$row['stpr_line_id'];
        $stpr_array['w'] = (int)$row['stpr_nwln_id'];
        $stpr_array['c'] = (int)$row['stpr_prd'];

        array_push($settoriProdottiArray, $stpr_array);
    }

    $fp = fopen('../json/prodotti_settori.json', 'w');
    $out = array_values($settoriProdottiArray);
    fwrite($fp, json_encode($out));
    fclose($fp);
}

//settoriProdottiJson($con);

function lineeJson($con) {
    $resultLinee = mysqli_query($con,"SELECT * FROM linee");
    while($rowLinee = mysqli_fetch_array($resultLinee)) {
        $lineeArray = array();
        $rowLinee_array['line_id'] = $rowLinee['line_id'];
        $rowLinee_array['line_nome'] = $rowLinee['line_nome'];

        $prodottiArray = [];
        $resultProdotti = mysqli_query($con,"SELECT * FROM prodotti WHERE prd_line_id = '$rowLinee[line_id]'");
        while($rowProdotti= mysqli_fetch_array($resultProdotti)) {
            $rowProdotti_array['prd_id'] = $rowProdotti['prd_id'];
            $rowProdotti_array['prd_cod'] = $rowProdotti['prd_cod'];
            $rowProdotti_array['prd_title'] = $rowProdotti['prd_title'];
            $rowProdotti_array['prd_tbpr'] = $rowProdotti['prd_tbpr'];
            $rowProdotti_array['prd_dim'] = $rowProdotti['prd_dim'];
            $rowProdotti_array['prd_pos'] = $rowProdotti['prd_pos'];
            $rowProdotti_array['prd_price_type'] = $rowProdotti['prd_price_type'];
            $rowProdotti_array['prd_lnfn_id'] = $rowProdotti['prd_lnfn_id'];
            $rowProdotti_array['prd_note'] = $rowProdotti['prd_note'];
            $rowProdotti_array['prd_abb'] = $rowProdotti['prd_abb'];
            $rowProdotti_array['prd_fin'] = $rowProdotti['prd_fin'];
            $rowProdotti_array['prd_price_array'] = json_decode($rowProdotti['prd_price_array']);

            $resultSetProd = mysqli_query($con,"SELECT * FROM settori_prodotti WHERE stpr_prd = '$rowProdotti[prd_id]'");
            while($rowSetProd= mysqli_fetch_array($resultSetProd)) {
                $stpr_array = json_decode($rowSetProd['stpr_array']);
            }
            $rowProdotti_array['prd_settori'] = $stpr_array;

            array_push($prodottiArray, $rowProdotti_array);
        }
        $rowLinee_array['line_prodotti'] = $prodottiArray;

        array_push($lineeArray,$rowLinee_array);
        $fp = fopen('../json/prodotti/' . $rowLinee['line_id'] . '.json', 'w');
        $out = array_values($lineeArray);
        fwrite($fp, json_encode($out));
        fclose($fp);
    }
}

//lineeJson($con);

function uniqueLineeJson($con) {
    $resultLinee = mysqli_query($con,"SELECT * FROM linee");
    while($rowLinee = mysqli_fetch_array($resultLinee)) {
        $lineeArray = array();
        $line_id = $rowLinee['line_id'];
        $rowLinee_array['i'] = (int)$rowLinee['line_id'];

        $rowLinee_array['h'] = [];
        $resultSet = mysqli_query($con,"SELECT * FROM settori_linee WHERE stln_line_id = '$line_id' AND stln_show = 1");
        while($rowSet = mysqli_fetch_array($resultSet)) {
            $set_id = (int)$rowSet['stln_set_id'];
            $rowSet_array['i'] = (int)$rowSet['stln_set_id'];

            $rowSet_array['x'] = [];
            $resultProd = mysqli_query($con, "SELECT stpr_prd, stpr_array, prd_tbpr, tbpr_pos FROM settori_prodotti JOIN prodotti ON prodotti.prd_id = settori_prodotti.stpr_prd JOIN tabelle_prodotti ON prodotti.prd_tbpr = tabelle_prodotti.tbpr_id WHERE stpr_nwln_id = '$line_id' ORDER BY tbpr_pos");
            while ($rowProd = mysqli_fetch_array($resultProd)) {
                $set_array = json_decode($rowProd['stpr_array']);
                for($i = 0; $i < count($set_array); $i++) {
                    if($set_array[$i] == $set_id){
                        array_push($rowSet_array['x'], (int)$rowProd['prd_tbpr']);
                        $rowSet_array['x'] = array_values(array_unique($rowSet_array['x'], SORT_REGULAR));
                    }
                }
            }

            array_push($rowLinee_array['h'], $rowSet_array);
        }

        array_push($lineeArray,$rowLinee_array);
        $fp = fopen('../json/linee/' . $rowLinee['line_id'] . '.json', 'w');
        $out = array_values($lineeArray);
        fwrite($fp, json_encode($out));
        fclose($fp);
    }
}

//uniqueLineeJson($con); FUNZIONE DA ATTIVARE

function vetrinaJson($con) {
    $compArray = [];
    $resultComp = mysqli_query($con, "SELECT * FROM composizioni");
    while ($rowComp = mysqli_fetch_array($resultComp)) {
        $rowComp_array['i'] = (int)$rowComp['cmp_id'];
        $rowComp_array['c'] = $rowComp['cmp_nome'];
        $rowComp_array['m'] = (int)$rowComp['cmp_mark_id'];
        $rowComp_array['l'] = (int)$rowComp['cmp_line_id'];
        $rowComp_array['v'] = (int)$rowComp['cmp_show'];
        $rowComp_array['y'] = (int)$rowComp['cmp_pos'];
        $rowComp_array['n'] = $rowComp['cmp_title'];
        $rowComp_array['o'] = $rowComp['cmp_note'];
        $rowComp_array['h'] = json_decode($rowComp['cmp_array']);

        array_push($compArray, $rowComp_array);
    }
    $fp = fopen('../json/vetrine.json', 'w');
    $out = array_values($compArray);
    fwrite($fp, json_encode($out));
    fclose($fp);
}

//vetrinaJson($con);

function vetrinaProdottiJson($con) {
    $array = [];
    $result = mysqli_query($con, "SELECT * FROM composizioni_prodotti");
    while ($row = mysqli_fetch_array($result)) {
        $row_array['i'] = (int)$row['cmpr_id'];
        $row_array['c'] = (int)$row['cmpr_comp'];
        $row_array['p'] = (int)$row['cmpr_prd'];
        $row_array['m'] = (int)$row['cmpr_mark_id'];
        $row_array['k'] = (int)$row['cmpr_mark_cmp_id'];
        $row_array['l'] = (int)$row['cmpr_line_id'];
        $row_array['j'] = (int)$row['cmpr_line_cmp_id'];
        $row_array['u'] = (int)$row['cmpr_tab'];
        $row_array['f'] = (int)$row['cmpr_cod'];
        $row_array['q'] = (int)$row['cmpr_qnt'];
        $row_array['y'] = (int)$row['cmpr_pos'];

        array_push($array, $row_array);
    }
    $fp = fopen('../json/vetrine_prodotti.json', 'w');
    $out = array_values($array);
    fwrite($fp, json_encode($out));
    fclose($fp);
}

//vetrinaProdottiJson($con);

function composizioniJson($con) {
    $resultMarchi = mysqli_query($con,"SELECT * FROM marchi WHERE mark_show = 1 AND mark_visible = 1");
    while($rowMarchi = mysqli_fetch_array($resultMarchi)) {

        $compArray = [];
        $resultComp = mysqli_query($con, "SELECT * FROM composti WHERE cst_mark_id = $rowMarchi[mark_id] AND cst_show = 1");
        while ($rowComp = mysqli_fetch_array($resultComp)) {
            $rowComp_array['id'] = (int)$rowComp['cst_id'];
            $rowComp_array['cod'] = $rowComp['cst_cod'];
            $rowComp_array['nome'] = (int)$rowComp['cst_nome'];
            $rowComp_array['fin'] = (int)$rowComp['cst_fin'];
            $rowComp_array['title'] = (int)$rowComp['cst_title'];
            $rowComp_array['mark'] = (int)$rowComp['cst_mark_id'];
            $rowComp_array['line'] = (int)$rowComp['cst_line_id'];
//            $rowComp_array['type'] = $rowComp['cst_type'];
//            $rowComp_array['promo'] = $rowComp['cst_promo'];
//            $rowComp_array['disc'] = $rowComp['cst_disc'];
//            $rowComp_array['time'] = (int)$rowComp['cst_time'];
//            $rowComp_array['show'] = (int)$rowComp['cst_show'];
            $rowComp_array['pos'] = (int)$rowComp['cst_pos'];
//            $rowComp_array['note'] = $rowComp['cst_note'];
//            $rowComp_array['price'] = 0;
            $compSetArray = [];
                $resultCompSet = mysqli_query($con, "SELECT * FROM settori_composti WHERE stcst_cst = $rowComp[cst_id]");
                while ($rowCompSet = mysqli_fetch_array($resultCompSet)) {
                    $rowCompSet_array['nwln'] = (int)$rowCompSet['stcst_nwln_id'];
                    $rowCompSet_array['set'] = json_decode($rowCompSet['stcst_array']);
                    $rowCompSet_array['view'] = (int)$rowCompSet['stcst_view'];

                    array_push($compSetArray, $rowCompSet_array);
                }
            $rowComp_array['set'] = $compSetArray;

            $compProdottiArray = [];
            $resultCompProdotti = mysqli_query($con, "SELECT * FROM composti_prodotti JOIN prodotti ON prodotti.prd_id = composti_prodotti.cstpr_prd JOIN abbinamenti ON abbinamenti.abb_id = composti_prodotti.cstpr_cod WHERE cstpr_cst = '$rowComp[cst_id]' ORDER BY cstpr_pos");
            while ($rowCompProdotti = mysqli_fetch_array($resultCompProdotti)) {
                $rowSetCompProdotti_array['id'] = (int)$rowCompProdotti['prd_id'];
//                $rowSetCompProdotti_array['tab'] = $rowCompProdotti['cstpr_tab'];
//                $rowSetCompProdotti_array['cod'] = $rowCompProdotti['cstpr_cod'];
                $rowSetCompProdotti_array['qnt'] = (int)$rowCompProdotti['cstpr_qnt'];
//                $rowSetCompProdotti_array['pos'] = $rowCompProdotti['cstpr_pos'];
                $rowSetCompProdotti_array['cod'] = $rowCompProdotti['prd_cod'];
                $rowSetCompProdotti_array['dim'] = $rowCompProdotti['prd_dim'];
                $rowSetCompProdotti_array['title'] = $rowCompProdotti['prd_title'];
                $rowSetCompProdotti_array['note'] = $rowCompProdotti['prd_note'];
//                $rowSetCompProdotti_array['abb'] = $rowCompProdotti['prd_abb'];
                $rowSetCompProdotti_array['fin'] = (int)$rowCompProdotti['prd_fin'];
                $rowSetCompProdotti_array['abb'] = $rowCompProdotti['abb_cod'];
                $pricesArray = json_decode($rowCompProdotti['prd_price_array']);
                for($i = 0; $i < count($pricesArray); $i++) {
                    if($pricesArray[$i]->tab == $rowCompProdotti['cstpr_tab'])
                        $rowSetCompProdotti_array['price'] = (float)$pricesArray[$i]->pr;
                }

//                $rowComp_array['price'] += ($rowSetCompProdotti_array['price'] * $rowSetCompProdotti_array['qnt']);

                array_push($compProdottiArray, $rowSetCompProdotti_array);
            }
            $rowComp_array['prd'] = $compProdottiArray;

            array_push($compArray, $rowComp_array);
        }
        $fp = fopen('../json/composizioni/' . $rowMarchi['mark_id'] . '.json', 'w');
        $out = array_values($compArray);
        fwrite($fp, json_encode($out));
        fclose($fp);
    }
}

//composizioniJson($con);

function listinoBaseJson($con) {
    $resultMarchi = mysqli_query($con,"SELECT * FROM marchi WHERE mark_show = 1 AND mark_visible = 1");
    while($rowMarchi = mysqli_fetch_array($resultMarchi)) {

        $compArray = [];
        $resultComp = mysqli_query($con, "SELECT * FROM esposizioni WHERE esp_mark_id = $rowMarchi[mark_id] AND esp_show = 1");
        while ($rowComp = mysqli_fetch_array($resultComp)) {
            $rowComp_array['id'] = (int)$rowComp['esp_id'];
            $rowComp_array['cod'] = $rowComp['esp_cod'];
            $rowComp_array['nome'] = (int)$rowComp['esp_nome'];
            $rowComp_array['fin'] = (int)$rowComp['esp_fin'];
            $rowComp_array['title'] = $rowComp['esp_title'];
            $rowComp_array['mark'] = (int)$rowComp['esp_mark_id'];
            $rowComp_array['line'] = (int)$rowComp['esp_line_id'];
//            $rowComp_array['view'] = (int)$rowComp['esp_view'];
            $rowComp_array['tbpr'] = (int)$rowComp['esp_tbpr'];
//            $rowComp_array['type'] = $rowComp['esp_type'];
//            $rowComp_array['promo'] = $rowComp['esp_promo'];
//            $rowComp_array['disc'] = $rowComp['esp_disc'];
//            $rowComp_array['time'] = (int)$rowComp['esp_time'];
//            $rowComp_array['show'] = (int)$rowComp['esp_show'];
            $rowComp_array['pos'] = (int)$rowComp['esp_pos'];
//            $rowComp_array['note'] = $rowComp['esp_note'];
//            $rowComp_array['price'] = 0;
            $compSetArray = [];
                $resultCompSet = mysqli_query($con, "SELECT * FROM settori_esposizioni WHERE stes_esp = $rowComp[esp_id]");
                while ($rowCompSet = mysqli_fetch_array($resultCompSet)) {
                    $rowCompSet_array['nwln'] = (int)$rowCompSet['stes_nwln_id'];
                    $rowCompSet_array['set'] = json_decode($rowCompSet['stes_array']);
                    $rowCompSet_array['view'] = (int)$rowCompSet['stes_view'];

                    array_push($compSetArray, $rowCompSet_array);
                }
            $rowComp_array['set'] = $compSetArray;

            $compProdottiArray = [];
            $resultCompProdotti = mysqli_query($con, "SELECT * FROM esposizioni_prodotti JOIN prodotti ON prodotti.prd_id = esposizioni_prodotti.espr_prd JOIN abbinamenti ON abbinamenti.abb_id = esposizioni_prodotti.espr_cod WHERE espr_esp = '$rowComp[esp_id]' ORDER BY espr_pos");
            while ($rowCompProdotti = mysqli_fetch_array($resultCompProdotti)) {
                $rowSetCompProdotti_array['id'] = (int)$rowCompProdotti['prd_id'];
//                $rowSetCompProdotti_array['tab'] = $rowCompProdotti['espr_tab'];
//                $rowSetCompProdotti_array['cod'] = $rowCompProdotti['espr_cod'];
                $rowSetCompProdotti_array['qnt'] = (int)$rowCompProdotti['espr_qnt'];
//                $rowSetCompProdotti_array['pos'] = $rowCompProdotti['espr_pos'];
                $rowSetCompProdotti_array['cod'] = $rowCompProdotti['prd_cod'];
                $rowSetCompProdotti_array['dim'] = $rowCompProdotti['prd_dim'];
                $rowSetCompProdotti_array['title'] = $rowCompProdotti['prd_title'];
                $rowSetCompProdotti_array['note'] = $rowCompProdotti['prd_note'];
//                $rowSetCompProdotti_array['abb'] = $rowCompProdotti['prd_abb'];
                $rowSetCompProdotti_array['fin'] = (int)$rowCompProdotti['prd_fin'];
                $rowSetCompProdotti_array['abb'] = $rowCompProdotti['abb_cod'];
                $pricesArray = json_decode($rowCompProdotti['prd_price_array']);
                for($i = 0; $i < count($pricesArray); $i++) {
                    if($pricesArray[$i]->tab == $rowCompProdotti['espr_tab'])
                        $rowSetCompProdotti_array['price'] = (float)$pricesArray[$i]->pr;
                }

//                $rowComp_array['price'] += ($rowSetCompProdotti_array['price'] * $rowSetCompProdotti_array['qnt']);

                array_push($compProdottiArray, $rowSetCompProdotti_array);
            }
            $rowComp_array['prd'] = $compProdottiArray;

            array_push($compArray, $rowComp_array);
        }
        $fp = fopen('../json/listinoBase/' . $rowMarchi['mark_id'] . '.json', 'w');
        $out = array_values($compArray);
        fwrite($fp, json_encode($out));
        fclose($fp);
    }
}

//listinoBaseJson($con);

function scontiJson($con) {
    $marchiArray = [];
    $resultMarchi = mysqli_query($con,"SELECT * FROM marchi WHERE mark_show = 1 AND mark_visible = 1");
    while($rowMarchi = mysqli_fetch_array($resultMarchi)) {
        $rowMarchi_array['id'] = (int)$rowMarchi['mark_id'];
        $rowMarchi_array['disc'] = (int)$rowMarchi['mark_disc'];
        $rowMarchi_array['list'] = (int)$rowMarchi['mark_list'];
        $rowMarchi_array['show'] = (int)$rowMarchi['mark_show'];

        array_push($marchiArray,$rowMarchi_array);
    }
    $fp = fopen('../json/gestione.json', 'w');
    $out = array_values($marchiArray);
    fwrite($fp, json_encode($out));
    fclose($fp);
}

//scontiJson($con);

function regioniJson($con) {
    $array = [];
    $result = mysqli_query($con,"SELECT * FROM regioni");
    while($row = mysqli_fetch_array($result)) {
        $row_array['i'] = (int)$row['regioni_id'];
        $row_array['n'] = $row['regioni_nome'];
        $row_array['z'] = (int)$row['regioni_nazione'];

        array_push($array,$row_array);
    }
    $fp = fopen('../json/regioni.json', 'w');
    $out = array_values($array);
    fwrite($fp, json_encode($out));
    fclose($fp);
}

//regioniJson($con);

function provinceJson($con) {
    $array = [];
    $result = mysqli_query($con,"SELECT * FROM province");
    while($row = mysqli_fetch_array($result)) {
        $row_array['i'] = (int)$row['provincia_id'];
        $row_array['n'] = $row['provincia'];
        $row_array['c'] = $row['sigla'];
        $row_array['r'] = (int)$row['regione_id'];
        $row_array['z'] = (int)$row['nazione_id'];
        $row_array['t'] = (int)$row['trasporto'];
        $row_array['j'] = (int)$row['trasporto_type'];
        $row_array['m'] = (int)$row['montaggio'];
        $row_array['k'] = (int)$row['montaggio_type'];
        $row_array['l'] = (int)$row['limite'];
        $row_array['b'] = (int)$row['minimo'];

        array_push($array,$row_array);
    }
    $fp = fopen('../json/province.json', 'w');
    $out = array_values($array);
    fwrite($fp, json_encode($out));
    fclose($fp);
}

//provinceJson($con);

function convenzioniJson($con) {
    $array = [];
    $result = mysqli_query($con,"SELECT * FROM convenzioni");
    while($row = mysqli_fetch_array($result)) {
        $row_array['i'] = (int)$row['cnv_id'];
        $row_array['n'] = $row['cnv_nome'];

        array_push($array,$row_array);
    }
    $fp = fopen('../json/convenzioni.json', 'w');
    $out = array_values($array);
    fwrite($fp, json_encode($out));
    fclose($fp);
}

//convenzioniJson($con);

function rivenditoriJson($con) {
    $array = [];
    $result = mysqli_query($con,"SELECT * FROM rivenditori");
    while($row = mysqli_fetch_array($result)) {
        $row_array['i'] = (int)$row['riv_id'];
        $row_array['n'] = $row['riv_nome'];
        $row_array['z'] = (int)$row['riv_naz'];
        $row_array['r'] = (int)$row['riv_reg'];
        $row_array['p'] = (int)$row['riv_prov'];
        $row_array['v'] = (int)$row['riv_conv'];
        $row_array['x'] = $row['riv_rif'];
        $row_array['s'] = $row['riv_sede'];
        $row_array['h'] = $row['riv_tel'];
        $row_array['f'] = $row['riv_fax'];
        $row_array['c'] = $row['riv_cell'];
        $row_array['q'] = $row['riv_web'];
        $row_array['e'] = $row['riv_email'];
        $row_array['w'] = $row['riv_psw'];
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

        array_push($array,$row_array);
    }
    $fp = fopen('../json/rivenditori.json', 'w');
    $out = array_values($array);
    fwrite($fp, json_encode($out));
    fclose($fp);
}

//rivenditoriJson($con);

function esposizioniJson($con) {
    $array = [];
    $result = mysqli_query($con,"SELECT * FROM esposizioni");
    while($row = mysqli_fetch_array($result)) {
        $row_array['i'] = (int)$row['esp_id'];
        $row_array['m'] = (int)$row['esp_mark_id'];
        $row_array['l'] = (int)$row['esp_line_id'];
        $row_array['t'] = (int)$row['esp_tbpr'];
        $row_array['c'] = $row['esp_cod'];
        $row_array['f'] = $row['esp_fin'];
        $row_array['d'] = $row['esp_dim'];
        $row_array['y'] = (int)$row['esp_pos'];
        $row_array['n'] = $row['esp_nome'];

        array_push($array,$row_array);
    }
    $fp = fopen('../json/esposizioni.json', 'w');
    $out = array_values($array);
    fwrite($fp, json_encode($out));
    fclose($fp);
}

//esposizioniJson($con);

function esposizioniProdottiJson($con) {
    $array = [];
    $result = mysqli_query($con,"SELECT * FROM esposizioni_prodotti");
    while($row = mysqli_fetch_array($result)) {
        $row_array['i'] = (int)$row['espr_id'];
        $row_array['m'] = (int)$row['espr_mark_id'];
        $row_array['k'] = (int)$row['espr_mark_esp_id'];
        $row_array['l'] = (int)$row['espr_line_id'];
        $row_array['j'] = (int)$row['espr_line_esp_id'];
        $row_array['c'] = (int)$row['espr_esp'];
        $row_array['p'] = (int)$row['espr_prd'];
        $row_array['f'] = (int)$row['espr_cod'];
        $row_array['u'] = (int)$row['espr_tab'];
        $row_array['q'] = (int)$row['espr_qnt'];
        $row_array['y'] = (int)$row['espr_pos'];

        array_push($array,$row_array);
    }
    $fp = fopen('../json/esposizioni_prodotti.json', 'w');
    $out = array_values($array);
    fwrite($fp, json_encode($out));
    fclose($fp);
}

//esposizioniProdottiJson($con);

function esposizioniSettoriJson($con) {
    $array = [];
    $result = mysqli_query($con,"SELECT * FROM settori_esposizioni");
    while($row = mysqli_fetch_array($result)) {
        $row_array['i'] = (int)$row['stes_id'];
        $row_array['m'] = (int)$row['stes_mark_id'];
        $row_array['l'] = (int)$row['stes_line_id'];
        $row_array['w'] = (int)$row['stes_nwln_id'];
        $row_array['c'] = (int)$row['stes_esp'];
        $row_array['v'] = (int)$row['stes_view'];
        $row_array['h'] = json_decode($row['stes_array']);

        array_push($array,$row_array);
    }
    $fp = fopen('../json/esposizioni_settori.json', 'w');
    $out = array_values($array);
    fwrite($fp, json_encode($out));
    fclose($fp);
}

//esposizioniSettoriJson($con);

function compostiJson($con) {
    $array = [];
    $result = mysqli_query($con,"SELECT * FROM composti");
    while($row = mysqli_fetch_array($result)) {
        $row_array['i'] = (int)$row['cst_id'];
        $row_array['m'] = (int)$row['cst_mark_id'];
        $row_array['l'] = (int)$row['cst_line_id'];
        $row_array['c'] = $row['cst_cod'];
        $row_array['f'] = $row['cst_fin'];
        $row_array['n'] = $row['cst_nome'];
        $row_array['y'] = (int)$row['cst_pos'];

        array_push($array,$row_array);
    }
    $fp = fopen('../json/composti.json', 'w');
    $out = array_values($array);
    fwrite($fp, json_encode($out));
    fclose($fp);
}

//compostiJson($con);

function compostiProdottiJson($con) {
    $array = [];
    $result = mysqli_query($con,"SELECT * FROM composti_prodotti");
    while($row = mysqli_fetch_array($result)) {
        $row_array['i'] = (int)$row['cstpr_id'];
        $row_array['m'] = (int)$row['cstpr_mark_id'];
        $row_array['k'] = (int)$row['cstpr_mark_cst_id'];
        $row_array['l'] = (int)$row['cstpr_line_id'];
        $row_array['j'] = (int)$row['cstpr_line_cst_id'];
        $row_array['c'] = (int)$row['cstpr_cst'];
        $row_array['p'] = (int)$row['cstpr_prd'];
        $row_array['f'] = (int)$row['cstpr_cod'];
        $row_array['u'] = (int)$row['cstpr_tab'];
        $row_array['q'] = (int)$row['cstpr_qnt'];
        $row_array['y'] = (int)$row['cstpr_pos'];

        array_push($array,$row_array);
    }
    $fp = fopen('../json/composti_prodotti.json', 'w');
    $out = array_values($array);
    fwrite($fp, json_encode($out));
    fclose($fp);
}

//compostiProdottiJson($con);

function compostiSettoriJson($con) {
    $array = [];
    $result = mysqli_query($con,"SELECT * FROM settori_composti");
    while($row = mysqli_fetch_array($result)) {
        $row_array['i'] = (int)$row['stcst_id'];
        $row_array['m'] = (int)$row['stcst_mark_id'];
        $row_array['l'] = (int)$row['stcst_line_id'];
        $row_array['w'] = (int)$row['stcst_nwln_id'];
        $row_array['c'] = (int)$row['stcst_cst'];
        $row_array['v'] = (int)$row['stcst_view'];
        $row_array['h'] = json_decode($row['stcst_array']);

        array_push($array,$row_array);
    }
    $fp = fopen('../json/composti_settori.json', 'w');
    $out = array_values($array);
    fwrite($fp, json_encode($out));
    fclose($fp);
}

//compostiSettoriJson($con);


// *****************  SETTORI - PUT THE CATEGORIE ID *****************
function setCatID($con) {
    $result = mysqli_query($con,"SELECT * FROM settori JOIN categorie ON categorie.cat_nome = settori.set_cat");
    while($row= mysqli_fetch_array($result)) {
        $cat_nome = $row['cat_nome'];
        $cat_id = $row['cat_id'];
        $sql="UPDATE settori SET set_cat_id='$cat_id' WHERE set_cat = '$cat_nome'";
        mysqli_query($con,$sql);
    }
}

//setCatID($con);

// ***************** MARCHI - PUT THE CATEGORIE IN ARRAY WITH ID *****************
function markCatArray($con) {
    $catArray = array();
    $resultCat = mysqli_query($con, "SELECT * FROM categorie");
    while($rowCat = mysqli_fetch_array($resultCat)) {
        $rowCatArray = array ((int)$rowCat['cat_id'], $rowCat['cat_nome']);
        array_push($catArray, $rowCatArray);
    }
    $resultMarchi = mysqli_query($con, "SELECT * FROM marchi");
    while($rowMarchi = mysqli_fetch_array($resultMarchi)) {
        $mark_cat_array = array();
        $mark_id = $rowMarchi['mark_id'];
        $mark_cat = $rowMarchi['mark_cat'];
        $mark_cat_2 = $rowMarchi['mark_cat_2'];
        $mark_cat_3 = $rowMarchi['mark_cat_3'];
        for($i = 0; $i < count($catArray); $i++){
            if($catArray[$i][1] == $mark_cat) array_push($mark_cat_array, $catArray[$i][0]);
            if($catArray[$i][1] == $mark_cat_2) array_push($mark_cat_array, $catArray[$i][0]);
            if($catArray[$i][1] == $mark_cat_3) array_push($mark_cat_array, $catArray[$i][0]);
        }
        $arraySrz = json_encode($mark_cat_array);
        $sql="UPDATE marchi SET mark_cat_array ='$arraySrz' WHERE mark_id = '$mark_id'";
        mysqli_query($con,$sql);
    }
}

//markCatArray($con);

// ***************** LINEE - PUT THE MARCHI ID *****************
function lineeCatArray($con) {
    $result = mysqli_query($con,"SELECT * FROM linee JOIN marchi ON marchi.mark_nome = linee.line_mark");
    while($row= mysqli_fetch_array($result)) {
        $line_id = $row['line_id'];
        $mark_id = $row['mark_id'];
        $sql="UPDATE linee SET line_mark_id='$mark_id' WHERE line_id = '$line_id'";
        mysqli_query($con,$sql);
    }
}

//lineeCatArray($con);

// ***************** LINEE - CHANGE WARRANTY TYPE *****************
function lineeWarChange($con) {
    $sql="UPDATE linee SET line_war = 5 WHERE line_war = '5 anni'";
    mysqli_query($con,$sql);
}

//lineeWarChange($con);

// ***************** LINEE - CHANGE CATALOGO TYPE *****************
function lineeCatChange($con) {
    $sql="UPDATE linee SET line_pdf_file = 1 WHERE line_pdf_file = '0'";
    mysqli_query($con,$sql);
}

//lineeCatChange($con);

// ***************** LINEE - CHANGE SPECIFICHE TYPE *****************
function lineeSpecChange($con) {
    $sql="UPDATE linee SET line_spec_file = 1 WHERE line_pdf_file != ''";
    mysqli_query($con,$sql);
}

//lineeSpecChange($con);

// ***************** LINEE - AGGIUNGERE ARRAY IN MANAGER *****************
function lineeManChange($con) {
    $sql="UPDATE linee SET line_manager = '[]' WHERE line_manager = ''";
    mysqli_query($con,$sql);
}

//lineeManChange($con);

// ***************** LINEE - AGGIUNGERE MANAGER IN GIERRE *****************
function lineeGRChange($con) {
    $sql="UPDATE linee SET line_manager = '[2]' WHERE line_mark = 'Gierre'";
    mysqli_query($con,$sql);
}

//lineeGRChange($con);

// ***************** SETTORI LINEE - PUT THE SETTORI, LINEE E MARCHI ID *****************
function settoriLineeCatArray($con) {
    $result = mysqli_query($con,"SELECT * FROM settori_linee JOIN settori ON settori.set_nome = settori_linee.stln_set JOIN linee ON linee.line_nome = settori_linee.stln_line JOIN marchi ON marchi.mark_nome = linee.line_mark");
    while($row= mysqli_fetch_array($result)) {
        $set_id = $row['set_id'];
        $set_nome = $row['set_nome'];
        $line_id = $row['line_id'];
        $line_nome = $row['line_nome'];
        $mark_id = $row['mark_id'];
        $mark_nome = $row['mark_nome'];
        $sqlSet="UPDATE settori_linee SET stln_set_id = '$set_id' WHERE stln_set = '$set_nome'";
        $sqlLinee="UPDATE settori_linee SET stln_line_id = '$line_id' WHERE stln_line = '$line_nome'";
        $sqlMarchi="UPDATE settori_linee SET stln_mark_id = '$mark_id' WHERE stln_mark = '$mark_nome'";
        mysqli_query($con,$sqlSet);
        mysqli_query($con,$sqlLinee);
        mysqli_query($con,$sqlMarchi);
    }
}

//settoriLineeCatArray($con);

// ***************** FINITURE - PUT THE MARCHI ID *****************
function finitureMarchiID($con) {
    $result = mysqli_query($con,"SELECT * FROM finiture JOIN marchi ON marchi.mark_nome = finiture.fin_mark");
    while($row= mysqli_fetch_array($result)) {
        $mark_id = $row['mark_id'];
        $mark_nome = $row['mark_nome'];
        $fin_type_id = ($row['fin_type'] == 'Finitura') ? 0 : 1;
        $fin_id = $row['fin_id'];
        $sqlMarchi="UPDATE finiture SET fin_mark_id = '$mark_id' WHERE fin_mark = '$mark_nome'";
        $sqlFin="UPDATE finiture SET fin_type_id = '$fin_type_id' WHERE fin_id = '$fin_id'";
        mysqli_query($con,$sqlMarchi);
        mysqli_query($con,$sqlFin);
    }
}

//finitureMarchiID($con);

// ***************** TABELLE FINITURE - PUT THE MARCHI AND LINEE ID *****************
function tabFinID($con) {
    $result = mysqli_query($con,"SELECT * FROM tabelle_finiture JOIN marchi ON marchi.mark_nome = tabelle_finiture.tab_mark JOIN linee ON linee.line_nome = tabelle_finiture.tab_line");
    while($row= mysqli_fetch_array($result)) {
        $mark_id = $row['mark_id'];
        $mark_nome = $row['mark_nome'];
        $line_id = $row['line_id'];
        $line_nome = $row['line_nome'];
        $sqlMarchi="UPDATE tabelle_finiture SET tab_mark_id = '$mark_id' WHERE tab_mark = '$mark_nome'";
        $sqlLinee="UPDATE tabelle_finiture SET tab_line_id = '$line_id' WHERE tab_line = '$line_nome'";
        mysqli_query($con,$sqlMarchi);
        mysqli_query($con,$sqlLinee);
    }
}

//tabFinID($con);

// ***************** ABBINAMENTI - PUT THE FINITURE IN ARRAY AND PUT THE MARCHI AND LINEE ID *****************
function abbinamentiArray($con) {
    $resultAbb = mysqli_query($con, "SELECT * FROM abbinamenti");
    while($rowAbb = mysqli_fetch_array($resultAbb)) {
//        $mark_id = $rowAbb['mark_id'];
//        $mark_nome = $rowAbb['mark_nome'];
//        $line_id = $rowAbb['line_id'];
//        $line_nome = $rowAbb['line_nome'];
        $abb_array = array();
        $abb_id = $rowAbb['abb_id'];
        $abb_fin_1 = $rowAbb['abb_fin_1'];
        $abb_nome_1 = $rowAbb['abb_nome_1'];
        $abb_fin_2 = $rowAbb['abb_fin_2'];
        $abb_nome_2 = $rowAbb['abb_nome_2'];
        $abb_fin_3 = $rowAbb['abb_fin_3'];
        $abb_nome_3 = $rowAbb['abb_nome_3'];
        $abb_fin_4 = $rowAbb['abb_fin_4'];
        $abb_nome_4 = $rowAbb['abb_nome_4'];
        $abb_fin_5 = $rowAbb['abb_fin_5'];
        $abb_nome_5 = $rowAbb['abb_nome_5'];
        $abb_fin_6 = $rowAbb['abb_fin_6'];
        $abb_nome_6 = $rowAbb['abb_nome_6'];

        if($abb_fin_1 != NULL ) array_push($abb_array, (object) ['i' => (int)$abb_fin_1, 'n' => $abb_nome_1]);
        if($abb_fin_2 != NULL ) array_push($abb_array, (object) ['i' => (int)$abb_fin_2, 'n' => $abb_nome_2]);
        if($abb_fin_3 != NULL ) array_push($abb_array, (object) ['i' => (int)$abb_fin_3, 'n' => $abb_nome_3]);
        if($abb_fin_4 != NULL ) array_push($abb_array, (object) ['i' => (int)$abb_fin_4, 'n' => $abb_nome_4]);
        if($abb_fin_5 != NULL ) array_push($abb_array, (object) ['i' => (int)$abb_fin_5, 'n' => $abb_nome_5]);
        if($abb_fin_6 != NULL ) array_push($abb_array, (object) ['i' => (int)$abb_fin_6, 'n' => $abb_nome_6]);

        $arraySrz = json_encode($abb_array);
        $sqlArray = "UPDATE abbinamenti SET abb_array ='$arraySrz' WHERE abb_id = '$abb_id'";
//        $sqlMarchi = "UPDATE abbinamenti SET abb_mark_id ='$mark_id' WHERE abb_mark = '$mark_nome'";
//        $sqlLinee = "UPDATE abbinamenti SET abb_line_id ='$line_id' WHERE abb_line = '$line_nome'";
        mysqli_query($con,$sqlArray);
//        mysqli_query($con,$sqlMarchi);
//        mysqli_query($con,$sqlLinee);
    }
}

//abbinamentiArray($con);

// ***************** PRODOTTI - PUT THE MARCHI ID *****************
function prodottiMarchiID($con) {
    $result = mysqli_query($con,"SELECT mark_id, mark_nome FROM prodotti JOIN marchi ON marchi.mark_nome = prodotti.prd_mark");
    while($row= mysqli_fetch_array($result)) {
        $mark_id = $row['mark_id'];
        $mark_nome = $row['mark_nome'];
        $sql="UPDATE prodotti SET prd_mark_id='$mark_id' WHERE prd_mark = '$mark_nome'";
        mysqli_query($con,$sql);
    }
}

//prodottiMarchiID($con);

// ***************** PRODOTTI - PUT THE LINEE ID *****************
function prodottiLineeID($con) {
    $result = mysqli_query($con,"SELECT line_id, line_nome FROM prodotti JOIN linee ON linee.line_nome = prodotti.prd_line WHERE prd_line_id = 0");
    while($row= mysqli_fetch_array($result)) {
        $line_id = $row['line_id'];
        $line_nome = $row['line_nome'];
        $sql="UPDATE prodotti SET prd_line_id='$line_id' WHERE prd_line = '$line_nome'";
        mysqli_query($con,$sql);
    }
}

//prodottiLineeID($con);

// ***************** PRODOTTI - PUT THE LINEE FINITURE ID *****************
function prodottiLineeFinitureID($con) {
    $result = mysqli_query($con,"SELECT line_id, line_nome FROM prodotti JOIN linee ON linee.line_nome = prodotti.prd_line WHERE prd_lnfn_id = 0");
    while($row= mysqli_fetch_array($result)) {
        $line_id = $row['line_id'];
        $line_nome = $row['line_nome'];
        $sql="UPDATE prodotti SET prd_lnfn_id='$line_id' WHERE prd_line = '$line_nome'";
        mysqli_query($con,$sql);
    }
}

//prodottiLineeFinitureID($con);

// ***************** PRODOTTI - PUT THE PREZZI IN ARRAY *****************
function prodottiPriceArray($con) {
    $resultPrd = mysqli_query($con, "SELECT * FROM prodotti");
    while($rowPrd = mysqli_fetch_array($resultPrd)) {
        $prd_array = array();
        $prd_id = $rowPrd['prd_id'];
        $prd_price_1 = $rowPrd['prd_price_1'];
        $prd_price_2 = $rowPrd['prd_price_2'];
        $prd_price_3 = $rowPrd['prd_price_3'];
        $prd_price_4 = $rowPrd['prd_price_4'];
        $prd_price_5 = $rowPrd['prd_price_5'];
        $prd_price_6 = $rowPrd['prd_price_6'];
        $prd_tab_1 = $rowPrd['prd_tab_1'];
        $prd_tab_2 = $rowPrd['prd_tab_2'];
        $prd_tab_3 = $rowPrd['prd_tab_3'];
        $prd_tab_4 = $rowPrd['prd_tab_4'];
        $prd_tab_5 = $rowPrd['prd_tab_5'];
        $prd_tab_6 = $rowPrd['prd_tab_6'];

        if($prd_price_1 != 0 || $prd_tab_1 != NULL) array_push($prd_array, (object) ['z' => (float)$prd_price_1, 'a' => (int)$prd_tab_1]);
        if($prd_price_2 != 0 || $prd_tab_2 != NULL ) array_push($prd_array, (object) ['z' => (float)$prd_price_2, 'a' => (int)$prd_tab_2]);
        if($prd_price_3 != 0 || $prd_tab_3 != NULL ) array_push($prd_array, (object) ['z' => (float)$prd_price_3, 'a' => (int)$prd_tab_3]);
        if($prd_price_4 != 0 || $prd_tab_4 != NULL ) array_push($prd_array, (object) ['z' => (float)$prd_price_4, 'a' => (int)$prd_tab_4]);
        if($prd_price_5 != 0 || $prd_tab_5 != NULL ) array_push($prd_array, (object) ['z' => (float)$prd_price_5, 'a' => (int)$prd_tab_5]);
        if($prd_price_6 != 0 || $prd_tab_6 != NULL ) array_push($prd_array, (object) ['z' => (float)$prd_price_6, 'a' => (int)$prd_tab_6]);

        $arraySrz = json_encode($prd_array);
        $sqlArray = "UPDATE prodotti SET prd_price_array ='$arraySrz' WHERE prd_id = '$prd_id'";
        mysqli_query($con,$sqlArray);
    }
}

//prodottiPriceArray($con);

// ***************** SETTORI PRODOTTI - PUT THE MARCHI ID *****************
function setProdMarchiID($con) {
    $result = mysqli_query($con,"SELECT mark_id, mark_nome FROM settori_prodotti JOIN marchi ON marchi.mark_nome = settori_prodotti.stpr_mark WHERE stpr_mark_id = 0");
    while($row= mysqli_fetch_array($result)) {
        $mark_id = $row['mark_id'];
        $mark_nome = $row['mark_nome'];
        $sql="UPDATE settori_prodotti SET stpr_mark_id='$mark_id' WHERE stpr_mark = '$mark_nome'";
        mysqli_query($con,$sql);
    }
}

//setProdMarchiID($con);

// ***************** SETTORI PRODOTTI - PUT THE LINEE ID *****************
function setProdLineeID($con) {
    $result = mysqli_query($con,"SELECT line_id, line_nome FROM settori_prodotti JOIN linee ON linee.line_nome = settori_prodotti.stpr_line WHERE stpr_line_id = 0");
    while($row= mysqli_fetch_array($result)) {
        $line_id = $row['line_id'];
        $line_nome = $row['line_nome'];
        $sql="UPDATE settori_prodotti SET stpr_line_id='$line_id' WHERE stpr_line = '$line_nome'";
        mysqli_query($con,$sql);
    }
}

//setProdLineeID($con);

// ***************** SETTORI PRODOTTI - PUT THE NEWLINEE ID *****************
function setProdNewLineeID($con) {
    $result = mysqli_query($con,"SELECT line_id, line_nome FROM settori_prodotti JOIN linee ON linee.line_nome = settori_prodotti.stpr_nwln WHERE stpr_nwln_id = 0");
    while($row= mysqli_fetch_array($result)) {
        $line_id = $row['line_id'];
        $line_nome = $row['line_nome'];
        $sql="UPDATE settori_prodotti SET stpr_nwln_id='$line_id' WHERE stpr_nwln = '$line_nome'";
        mysqli_query($con,$sql);
    }
}

//setProdNewLineeID($con);

// ***************** SETTORI PRODOTTI - PUT THE SETTORI ID *****************
function setProdSetID($con) {
    $result = mysqli_query($con,"SELECT stpr_set_3, set_id, set_nome FROM settori_prodotti JOIN settori ON settori.set_nome = settori_prodotti.stpr_set_3 WHERE stpr_set_3_id = 0");
    while($row= mysqli_fetch_array($result)) {
        if($row['stpr_set_3'] !== NULL) {
            $set_id = $row['set_id'];
            $set_nome = $row['set_nome'];
            $sql="UPDATE settori_prodotti SET stpr_set_3_id = '$set_id' WHERE stpr_set_3 = '$set_nome'";
            mysqli_query($con,$sql);
        } else {
            $sql="UPDATE settori_prodotti SET stpr_set_3_id = 0";
            mysqli_query($con,$sql);
        }
    }
}

//setProdSetID($con);

// ***************** SETTORI PRODOTTI - PUT THE SETTORI IN ARRAY WITH ID *****************
function setProdSetArray($con) {
    $setArray = array();
    $resultSet = mysqli_query($con, "SELECT * FROM settori");
    while($rowSet = mysqli_fetch_array($resultSet)) {
        $rowSetArray = $rowSet['set_id'];
        array_push($setArray, $rowSetArray);
    }
    $resultSetProd = mysqli_query($con, "SELECT * FROM settori_prodotti");
    while($rowSetProd = mysqli_fetch_array($resultSetProd)) {
        $setProd_set_array = [];
        $stpr_id = $rowSetProd['stpr_id'];
        $stpr_set_1_id = $rowSetProd['stpr_set_1_id'];
        $stpr_set_2_id = $rowSetProd['stpr_set_2_id'];
        $stpr_set_3_id = $rowSetProd['stpr_set_3_id'];
        $stpr_set_4_id = $rowSetProd['stpr_set_4_id'];
        $stpr_set_5_id = $rowSetProd['stpr_set_5_id'];
        for($i = 0; $i < count($setArray); $i++){
            if($setArray[$i] == $stpr_set_1_id) array_push($setProd_set_array, (int)$stpr_set_1_id);
            if($setArray[$i] == $stpr_set_2_id) array_push($setProd_set_array, (int)$stpr_set_2_id);
            if($setArray[$i] == $stpr_set_3_id) array_push($setProd_set_array, (int)$stpr_set_3_id);
            if($setArray[$i] == $stpr_set_4_id) array_push($setProd_set_array, (int)$stpr_set_4_id);
            if($setArray[$i] == $stpr_set_5_id) array_push($setProd_set_array, (int)$stpr_set_5_id);
        }
        $arraySrz = json_encode($setProd_set_array);
        $sql="UPDATE settori_prodotti SET stpr_array ='$arraySrz' WHERE stpr_id = '$stpr_id'";
        mysqli_query($con,$sql);
    }
}

//setProdSetArray($con);

// ***************** TABELLE PRODOTTI - PUT THE MARCHI ID *****************
function tabProdMarchiID($con) {
    $result = mysqli_query($con,"SELECT mark_id, mark_nome FROM tabelle_prodotti JOIN marchi ON marchi.mark_nome = tabelle_prodotti.tbpr_mark");
    while($row= mysqli_fetch_array($result)) {
        $mark_id = $row['mark_id'];
        $mark_nome = $row['mark_nome'];
        $sql="UPDATE tabelle_prodotti SET tbpr_mark_id='$mark_id' WHERE tbpr_mark = '$mark_nome'";
        mysqli_query($con,$sql);
    }
}

//tabProdMarchiID($con);

// ***************** COMPOSIZIONI - PUT THE MARCHI ID *****************
function compMarchiID($con) {
    $result = mysqli_query($con,"SELECT mark_id, mark_nome FROM composizioni JOIN marchi ON marchi.mark_nome = composizioni.cmp_mark");
    while($row= mysqli_fetch_array($result)) {
        $mark_id = $row['mark_id'];
        $mark_nome = $row['mark_nome'];
        $sql="UPDATE composizioni SET cmp_mark_id='$mark_id' WHERE cmp_mark = '$mark_nome'";
        mysqli_query($con,$sql);
    }
}

//compMarchiID($con);

// ***************** COMPOSTI - PUT THE MARCHI ID *****************
function cstMarchiID($con) {
    $result = mysqli_query($con,"SELECT mark_id, mark_nome FROM composti JOIN marchi ON marchi.mark_nome = composti.cst_mark");
    while($row= mysqli_fetch_array($result)) {
        $mark_id = $row['mark_id'];
        $mark_nome = $row['mark_nome'];
        $sql="UPDATE composti SET cst_mark_id='$mark_id' WHERE cst_mark = '$mark_nome'";
        mysqli_query($con,$sql);
    }
}

//cstMarchiID($con);

// ***************** COMPOSTI PRODOTTI - PUT THE MARCHI ID *****************
function cstprMarchiID($con) {
    $result = mysqli_query($con,"SELECT mark_id, mark_nome FROM composti_prodotti JOIN marchi ON marchi.mark_nome = composti_prodotti.cstpr_mark");
    while($row= mysqli_fetch_array($result)) {
        $mark_id = $row['mark_id'];
        $mark_nome = $row['mark_nome'];
        $sql="UPDATE composti_prodotti SET cstpr_mark_id='$mark_id' WHERE cstpr_mark = '$mark_nome'";
        mysqli_query($con,$sql);
    }
}

//cstprMarchiID($con);

// ***************** COMPOSTI PRODOTTI - PUT THE MARCHI COMPOSTI ID *****************
function cstprCstMarchiID($con) {
    $result = mysqli_query($con,"SELECT mark_id, mark_nome FROM composti_prodotti JOIN marchi ON marchi.mark_nome = composti_prodotti.cstpr_mark_cst");
    while($row= mysqli_fetch_array($result)) {
        $mark_id = $row['mark_id'];
        $mark_nome = $row['mark_nome'];
        $sql="UPDATE composti_prodotti SET cstpr_mark_cst_id='$mark_id' WHERE cstpr_mark_cst = '$mark_nome'";
        mysqli_query($con,$sql);
    }
}

//cstprCstMarchiID($con);

// ***************** SETTORI COMPOSTI - PUT THE MARCHI ID *****************
function stcstMarchiID($con) {
    $result = mysqli_query($con,"SELECT mark_id, mark_nome FROM settori_composti JOIN marchi ON marchi.mark_nome = settori_composti.stcst_mark");
    while($row= mysqli_fetch_array($result)) {
        $mark_id = $row['mark_id'];
        $mark_nome = $row['mark_nome'];
        $sql="UPDATE settori_composti SET stcst_mark_id='$mark_id' WHERE stcst_mark = '$mark_nome'";
        mysqli_query($con,$sql);
    }
}

//stcstMarchiID($con);

// ***************** ESPOSIZIONI - PUT THE MARCHI ID *****************
function espMarchiID($con) {
    $result = mysqli_query($con,"SELECT mark_id, mark_nome FROM esposizioni JOIN marchi ON marchi.mark_nome = esposizioni.esp_mark");
    while($row= mysqli_fetch_array($result)) {
        $mark_id = $row['mark_id'];
        $mark_nome = $row['mark_nome'];
        $sql="UPDATE esposizioni SET esp_mark_id='$mark_id' WHERE esp_mark = '$mark_nome'";
        mysqli_query($con,$sql);
    }
}

//espMarchiID($con);

// ***************** ESPOSIZIONI PRODOTTI - PUT THE MARCHI ID *****************
function esprMarchiID($con) {
    $result = mysqli_query($con,"SELECT mark_id, mark_nome FROM esposizioni_prodotti JOIN marchi ON marchi.mark_nome = esposizioni_prodotti.espr_mark");
    while($row= mysqli_fetch_array($result)) {
        $mark_id = $row['mark_id'];
        $mark_nome = $row['mark_nome'];
        $sql="UPDATE esposizioni_prodotti SET espr_mark_id='$mark_id' WHERE espr_mark = '$mark_nome'";
        mysqli_query($con,$sql);
    }
}

//esprMarchiID($con);

// ***************** ESPOSIZIONI PRODOTTI - PUT THE MARCHI ESPOSIZIONI ID *****************
function esprEspMarchiID($con) {
    $result = mysqli_query($con,"SELECT mark_id, mark_nome FROM esposizioni_prodotti JOIN marchi ON marchi.mark_nome = esposizioni_prodotti.espr_mark_esp");
    while($row= mysqli_fetch_array($result)) {
        $mark_id = $row['mark_id'];
        $mark_nome = $row['mark_nome'];
        $sql="UPDATE esposizioni_prodotti SET espr_mark_esp_id='$mark_id' WHERE espr_mark_esp = '$mark_nome'";
        mysqli_query($con,$sql);
    }
}

//esprEspMarchiID($con);

// ***************** SETTORI ESPOSIZIONI - PUT THE MARCHI ID *****************
function stesMarchiID($con) {
    $result = mysqli_query($con,"SELECT mark_id, mark_nome FROM settori_esposizioni JOIN marchi ON marchi.mark_nome = settori_esposizioni.stes_mark");
    while($row= mysqli_fetch_array($result)) {
        $mark_id = $row['mark_id'];
        $mark_nome = $row['mark_nome'];
        $sql="UPDATE settori_esposizioni SET stes_mark_id='$mark_id' WHERE stes_mark = '$mark_nome'";
        mysqli_query($con,$sql);
    }
}

//stesMarchiID($con);

// ***************** COMPOSIZIONI - PUT THE LINEE ID *****************
function compLineeID($con) {
    $result = mysqli_query($con,"SELECT line_id, line_nome FROM composizioni JOIN linee ON linee.line_nome = composizioni.cmp_line");
    while($row= mysqli_fetch_array($result)) {
        $line_id = $row['line_id'];
        $line_nome = $row['line_nome'];
        $sql="UPDATE composizioni SET cmp_line_id='$line_id' WHERE cmp_line = '$line_nome'";
        mysqli_query($con,$sql);
    }
}

//compLineeID($con);

// ***************** COMPOSTI - PUT THE LINEE ID *****************
function cstLineeID($con) {
    $result = mysqli_query($con,"SELECT line_id, line_nome FROM composti JOIN linee ON linee.line_nome = composti.cst_line");
    while($row= mysqli_fetch_array($result)) {
        $line_id = $row['line_id'];
        $line_nome = $row['line_nome'];
        $sql="UPDATE composti SET cst_line_id='$line_id' WHERE cst_line = '$line_nome'";
        mysqli_query($con,$sql);
    }
}

//cstLineeID($con);

// ***************** COMPOSTI PRODOTTI - PUT THE LINEE ID *****************
function cstprLineeID($con) {
    $result = mysqli_query($con,"SELECT line_id, line_nome FROM composti_prodotti JOIN linee ON linee.line_nome = composti_prodotti.cstpr_line");
    while($row= mysqli_fetch_array($result)) {
        $line_id = $row['line_id'];
        $line_nome = $row['line_nome'];
        $sql="UPDATE composti_prodotti SET cstpr_line_id='$line_id' WHERE cstpr_line = '$line_nome'";
        mysqli_query($con,$sql);
    }
}

//cstprLineeID($con);

// ***************** COMPOSTI PRODOTTI - PUT THE LINEE COMPOSTI ID *****************
function cstprCstLineeID($con) {
    $result = mysqli_query($con,"SELECT line_id, line_nome FROM composti_prodotti JOIN linee ON linee.line_nome = composti_prodotti.cstpr_line_cst");
    while($row= mysqli_fetch_array($result)) {
        $line_id = $row['line_id'];
        $line_nome = $row['line_nome'];
        $sql="UPDATE composti_prodotti SET cstpr_line_cst_id='$line_id' WHERE cstpr_line_cst = '$line_nome'";
        mysqli_query($con,$sql);
    }
}

//cstprCstLineeID($con);

// ***************** SETTORI COMPOSTI - PUT THE LINEE ID *****************
function stcstLineeID($con) {
    $result = mysqli_query($con,"SELECT line_id, line_nome FROM settori_composti JOIN linee ON linee.line_nome = settori_composti.stcst_line");
    while($row= mysqli_fetch_array($result)) {
        $line_id = $row['line_id'];
        $line_nome = $row['line_nome'];
        $sql="UPDATE settori_composti SET stcst_line_id='$line_id' WHERE stcst_line = '$line_nome'";
        mysqli_query($con,$sql);
    }
}

//stcstLineeID($con);

// ***************** SETTORI COMPOSTI - PUT THE NEW LINE ID *****************
function stcstNwlnID($con) {
    $result = mysqli_query($con,"SELECT line_id, line_nome FROM settori_composti JOIN linee ON linee.line_nome = settori_composti.stcst_nwln");
    while($row= mysqli_fetch_array($result)) {
        $line_id = $row['line_id'];
        $line_nome = $row['line_nome'];
        $sql="UPDATE settori_composti SET stcst_nwln_id='$line_id' WHERE stcst_nwln = '$line_nome'";
        mysqli_query($con,$sql);
    }
}

//stcstNwlnID($con);

// ***************** ESPOSTI - PUT THE LINEE ID *****************
function espLineeID($con) {
    $result = mysqli_query($con,"SELECT line_id, line_nome FROM esposizioni JOIN linee ON linee.line_nome = esposizioni.esp_line");
    while($row= mysqli_fetch_array($result)) {
        $line_id = $row['line_id'];
        $line_nome = $row['line_nome'];
        $sql="UPDATE esposizioni SET esp_line_id='$line_id' WHERE esp_line = '$line_nome'";
        mysqli_query($con,$sql);
    }
}

//espLineeID($con);

// ***************** ESPOSIZIONE PRODOTTI - PUT THE LINEE ID *****************
function esprLineeID($con) {
    $result = mysqli_query($con,"SELECT line_id, line_nome FROM esposizioni_prodotti JOIN linee ON linee.line_nome = esposizioni_prodotti.espr_line");
    while($row= mysqli_fetch_array($result)) {
        $line_id = $row['line_id'];
        $line_nome = $row['line_nome'];
        $sql="UPDATE esposizioni_prodotti SET espr_line_id='$line_id' WHERE espr_line = '$line_nome'";
        mysqli_query($con,$sql);
    }
}

//esprLineeID($con);

// ***************** ESPOSIZIONE PRODOTTI - PUT THE LINEE ESPOSIZIONI ID *****************
function esprEspLineeID($con) {
    $result = mysqli_query($con,"SELECT line_id, line_nome FROM esposizioni_prodotti JOIN linee ON linee.line_nome = esposizioni_prodotti.espr_line_esp");
    while($row= mysqli_fetch_array($result)) {
        $line_id = $row['line_id'];
        $line_nome = $row['line_nome'];
        $sql="UPDATE esposizioni_prodotti SET espr_line_esp_id='$line_id' WHERE espr_line_esp= '$line_nome'";
        mysqli_query($con,$sql);
    }
}

//esprEspLineeID($con);

// ***************** SETTORI ESPOSIZIONI - PUT THE LINEE ID *****************
function stesLineeID($con) {
    $result = mysqli_query($con,"SELECT line_id, line_nome FROM settori_esposizioni JOIN linee ON linee.line_nome = settori_esposizioni.stes_line");
    while($row= mysqli_fetch_array($result)) {
        $line_id = $row['line_id'];
        $line_nome = $row['line_nome'];
        $sql="UPDATE settori_esposizioni SET stes_line_id='$line_id' WHERE stes_line = '$line_nome'";
        mysqli_query($con,$sql);
    }
}

//stesLineeID($con);

// ***************** SETTORI ESPOSIZIONI - PUT THE NEW LINE ID *****************
function stesNwlnID($con) {
    $result = mysqli_query($con,"SELECT line_id, line_nome FROM settori_esposizioni JOIN linee ON linee.line_nome = settori_esposizioni.stes_line");
    while($row= mysqli_fetch_array($result)) {
        $line_id = $row['line_id'];
        $line_nome = $row['line_nome'];
        $sql="UPDATE settori_esposizioni SET stes_nwln_id='$line_id' WHERE stes_nwln = '$line_nome'";
        mysqli_query($con,$sql);
    }
}

//stesNwlnID($con);

// ***************** COMPOSIZIONI - PUT THE SETTORI ID *****************
function compSetID($con) {
    $result = mysqli_query($con,"SELECT cmp_set_5, set_id, set_nome FROM composizioni JOIN settori ON settori.set_nome = composizioni.cmp_set_5");
    while($row= mysqli_fetch_array($result)) {
        if($row['cmp_set_5'] !== NULL) {
            $set_id = $row['set_id'];
            $set_nome = $row['set_nome'];
            $sql="UPDATE composizioni SET cmp_set_5_id = '$set_id' WHERE cmp_set_5 = '$set_nome'";
            mysqli_query($con,$sql);
        } else {
            $sql="UPDATE settori_prodotti SET stpr_set_5_id = 0";
            mysqli_query($con,$sql);
        }
    }
}

//compSetID($con);

// ***************** SETTORI COMPOSTI - PUT THE SETTORI ID *****************
function stcstSetID($con) {
    $result = mysqli_query($con,"SELECT stcst_set_3, set_id, set_nome FROM settori_composti JOIN settori ON settori.set_nome = settori_composti.stcst_set_3");
    while($row= mysqli_fetch_array($result)) {
        if($row['stcst_set_3'] !== NULL) {
            $set_id = $row['set_id'];
            $set_nome = $row['set_nome'];
            $sql="UPDATE settori_composti SET stcst_set_3_id = '$set_id' WHERE stcst_set_3 = '$set_nome'";
            mysqli_query($con,$sql);
        } else {
            $sql="UPDATE settori_composti SET stcst_set_3_id = 0";
            mysqli_query($con,$sql);
        }
    }
}

//stcstSetID($con);

// ***************** SETTORI ESPOSIZIONI - PUT THE SETTORI ID *****************
function stesSetID($con) {
    $result = mysqli_query($con,"SELECT stes_set_4, set_id, set_nome FROM settori_esposizioni JOIN settori ON settori.set_nome = settori_esposizioni.stes_set_4");
    while($row= mysqli_fetch_array($result)) {
        if($row['stes_set_4'] !== NULL) {
            $set_id = $row['set_id'];
            $set_nome = $row['set_nome'];
            $sql="UPDATE settori_esposizioni SET stes_set_4_id = '$set_id' WHERE stes_set_4 = '$set_nome'";
            mysqli_query($con,$sql);
        } else {
            $sql="UPDATE settori_esposizioni SET stes_set_4_id = 0";
            mysqli_query($con,$sql);
        }
    }
}

//stesSetID($con);

// ***************** COMPOSIZIONI - PUT THE SETTORI IN ARRAY WITH ID *****************
function compSetArray($con) {
    $setArray = array();
    $resultSet = mysqli_query($con, "SELECT * FROM settori");
    while($rowSet = mysqli_fetch_array($resultSet)) {
        $rowSetArray = $rowSet['set_id'];
        array_push($setArray, $rowSetArray);
    }
    $resultSetProd = mysqli_query($con, "SELECT * FROM composizioni");
    while($rowSetProd = mysqli_fetch_array($resultSetProd)) {
        $cmp_set_array = array();
        $cmp_id = $rowSetProd['cmp_id'];
        $cmp_set_1_id = $rowSetProd['cmp_set_1_id'];
        $cmp_set_2_id = $rowSetProd['cmp_set_2_id'];
        $cmp_set_3_id = $rowSetProd['cmp_set_3_id'];
        $cmp_set_4_id = $rowSetProd['cmp_set_4_id'];
        $cmp_set_5_id = $rowSetProd['cmp_set_5_id'];
        for($i = 0; $i < count($setArray); $i++){
            if($setArray[$i] == $cmp_set_1_id) array_push($cmp_set_array, (int)$cmp_set_1_id);
            if($setArray[$i] == $cmp_set_2_id) array_push($cmp_set_array, (int)$cmp_set_2_id);
            if($setArray[$i] == $cmp_set_3_id) array_push($cmp_set_array, (int)$cmp_set_3_id);
            if($setArray[$i] == $cmp_set_4_id) array_push($cmp_set_array, (int)$cmp_set_4_id);
            if($setArray[$i] == $cmp_set_5_id) array_push($cmp_set_array, (int)$cmp_set_5_id);
        }
        $arraySrz = json_encode($cmp_set_array);
        $sql="UPDATE composizioni SET cmp_array ='$arraySrz' WHERE cmp_id = '$cmp_id'";
        mysqli_query($con,$sql);
    }
}

//compSetArray($con);

// ***************** SETTORI COMPOSTI - PUT THE SETTORI IN ARRAY WITH ID *****************
function cstSetArray($con) {
    $resultSetProd = mysqli_query($con, "SELECT * FROM settori_composti");
    while($rowSetProd = mysqli_fetch_array($resultSetProd)) {
        $stcst_set_array = array();
        $stcst_id = $rowSetProd['stcst_id'];
        $stcst_set_1_id = $rowSetProd['stcst_set_1_id'];
        $stcst_set_2_id = $rowSetProd['stcst_set_2_id'];
        $stcst_set_3_id = $rowSetProd['stcst_set_3_id'];
        $stcst_set_4_id = $rowSetProd['stcst_set_4_id'];
        $stcst_set_5_id = $rowSetProd['stcst_set_5_id'];
        if($stcst_set_1_id != 0) array_push($stcst_set_array, (int)$stcst_set_1_id);
        if($stcst_set_2_id != 0) array_push($stcst_set_array, (int)$stcst_set_2_id);
        if($stcst_set_3_id != 0) array_push($stcst_set_array, (int)$stcst_set_3_id);
        if($stcst_set_4_id != 0) array_push($stcst_set_array, (int)$stcst_set_4_id);
        if($stcst_set_5_id != 0) array_push($stcst_set_array, (int)$stcst_set_5_id);

        $arraySrz = json_encode($stcst_set_array);
        $sql="UPDATE settori_composti SET stcst_array ='$arraySrz' WHERE stcst_id = '$stcst_id'";
        mysqli_query($con,$sql);
    }
}

//cstSetArray($con);

// ***************** SETTORI ESPOSIZIONI - PUT THE SETTORI IN ARRAY WITH ID *****************
function stesArray($con) {
    $resultSetProd = mysqli_query($con, "SELECT * FROM settori_esposizioni");
    while($rowSetProd = mysqli_fetch_array($resultSetProd)) {
        $stes_set_array = array();
        $stes_id = $rowSetProd['stes_id'];
        $stes_set_1_id = $rowSetProd['stes_set_1_id'];
        $stes_set_2_id = $rowSetProd['stes_set_2_id'];
        $stes_set_3_id = $rowSetProd['stes_set_3_id'];
        $stes_set_4_id = $rowSetProd['stes_set_4_id'];
        $stes_set_5_id = $rowSetProd['stes_set_5_id'];
        if($stes_set_1_id != 0) array_push($stes_set_array, (int)$stes_set_1_id);
        if($stes_set_2_id != 0) array_push($stes_set_array, (int)$stes_set_2_id);
        if($stes_set_3_id != 0) array_push($stes_set_array, (int)$stes_set_3_id);
        if($stes_set_4_id != 0) array_push($stes_set_array, (int)$stes_set_4_id);
        if($stes_set_5_id != 0) array_push($stes_set_array, (int)$stes_set_5_id);

        $arraySrz = json_encode($stes_set_array);
        $sql="UPDATE settori_esposizioni SET stes_array ='$arraySrz' WHERE stes_id = '$stes_id'";
        mysqli_query($con,$sql);
    }
}

//stesArray($con);

// ***************** COMPOSIZIONI PRODOTTI - PUT THE MARCHI ID *****************
function compProdottiMarchiID($con) {
    $result = mysqli_query($con,"SELECT mark_id, mark_nome FROM composizioni_prodotti JOIN marchi ON marchi.mark_nome = composizioni_prodotti.cmpr_mark_cmp");
    while($row= mysqli_fetch_array($result)) {
        $mark_id = $row['mark_id'];
        $mark_nome = $row['mark_nome'];
        $sql="UPDATE composizioni_prodotti SET cmpr_mark_cmp_id='$mark_id' WHERE cmpr_mark_cmp = '$mark_nome'";
        mysqli_query($con,$sql);
    }
}

//compProdottiMarchiID($con);

// ***************** COMPOSIZIONI PRODOTTI - PUT THE LINEE ID *****************
function compProdottiLineeID($con) {
    $result = mysqli_query($con,"SELECT line_id, line_nome FROM composizioni_prodotti JOIN linee ON linee.line_nome = composizioni_prodotti.cmpr_line_cmp");
    while($row= mysqli_fetch_array($result)) {
        $line_id = $row['line_id'];
        $line_nome = $row['line_nome'];
        $sql="UPDATE composizioni_prodotti SET cmpr_line_cmp_id='$line_id' WHERE cmpr_line_cmp = '$line_nome'";
        mysqli_query($con,$sql);
    }
}

//compProdottiLineeID($con);

// ***************** ABBINAMENTI - FROM LAS TO MODULO *****************
function abbinamentiCambiaMarchio($con) {
    $sql="UPDATE abbinamenti SET abb_mark = 'Modulo', abb_mark_id = 49 WHERE abb_line_id = 60";
    mysqli_query($con,$sql);
}

//abbinamentiCambiaMarchio($con);

// ***************** TABELLE FINITURE - FROM LAS TO MODULO *****************
function tabelleFinitureCambiaMarchio($con) {
    $sql="UPDATE tabelle_finiture SET tab_mark = 'Modulo', tab_mark_id = 49 WHERE tab_line_id = 60 OR tab_line_id = 61 OR tab_line_id = 144 OR tab_line_id = 145";
    mysqli_query($con,$sql);
}

//tabelleFinitureCambiaMarchio($con);

// ***************** PRODOTTI - FROM LAS TO MODULO *****************
function prodottiCambiaMarchio($con) {
    $sql="UPDATE prodotti SET prd_mark = 'Modulo', prd_mark_id = 49 WHERE prd_line_id = 60 OR prd_line_id = 61 OR prd_line_id = 144 OR prd_line_id = 145";
    mysqli_query($con,$sql);
}

//prodottiCambiaMarchio($con);

// ***************** COMPOSIZIONI - FROM LAS TO MODULO *****************
function composizioniCambiaMarchio($con) {
    $sql="UPDATE composizioni SET cmp_mark = 'Modulo', cmp_mark_id = 49 WHERE cmp_line_id = 60 OR cmp_line_id = 61 OR cmp_line_id = 144 OR cmp_line_id = 145";
    mysqli_query($con,$sql);
}

//composizioniCambiaMarchio($con);

// ***************** COMPOSIZIONI PRODOTTI - FROM LAS TO MODULO *****************
function composizioniProdottiCambiaMarchio($con) {
    $sql="UPDATE composizioni_prodotti SET cmpr_mark = 'Modulo', cmpr_mark_id = 49, cmpr_mark_cmp = 'Modulo', cmpr_mark_cmp_id = 49 WHERE cmpr_line_id = 60 OR cmpr_line_id = 61 OR cmpr_line_id = 144 OR cmpr_line_id = 145";
    mysqli_query($con,$sql);
}

// ***************** CREAZIONE REGIONI FROM PROVINCE *****************
function regioni($con) {
    $id = 1;
    $result = mysqli_query($con, "SELECT DISTINCT regione FROM  province");
    while($row = mysqli_fetch_array($result)) {
        $nome = addslashes($row['regione']);
        $sql="INSERT INTO regioni (regioni_id, regioni_nome) VALUES ('$id', '$nome')";
        mysqli_query($con,$sql) or die(mysqli_error($con));
        $id++;
    }
}

// ***************** PROVINCE CONVERSIONE REGIONI E NAZIONI *****************
function province($con) {
    $result = mysqli_query($con, "SELECT * FROM regioni");
    while($row = mysqli_fetch_array($result)) {
        $nome = addslashes($row['regioni_nome']);
        $id = $row['regioni_id'];
        $sql="UPDATE province SET regione_id = $id, nazione_id = 1 WHERE regione = '$nome'";
        mysqli_query($con,$sql);
    }
}

//province($con);

// ***************** RIVENDITORI CONVERSIONE PROVINCE, REGIONI, NAZIONI *****************
function rivenditori($con) {
    $result = mysqli_query($con, "SELECT * FROM regioni JOIN province ON regioni.regioni_id = province.regione_id");
    while($row = mysqli_fetch_array($result)) {
        $regione = addslashes($row['regioni_nome']);
        $provincia = addslashes($row['provincia']);
        $id_reg = $row['regioni_id'];
        $id_prv = $row['provincia_id'];
        $sqlR="UPDATE rivenditori SET riv_reg = $id_reg, riv_naz = 1 WHERE riv_reg = '$regione'";
        $sqlP="UPDATE rivenditori SET riv_prov = $id_prv WHERE riv_prov = '$provincia'";
        mysqli_query($con,$sqlR);
        mysqli_query($con,$sqlP);
    }
}

//rivenditori($con);

// ***************** RIVENDITORI MARCHI ARRAY *****************
function rivenditoriArray($con) {
    $result = mysqli_query($con, "SELECT * FROM rivenditori");
    while($row = mysqli_fetch_array($result)) {
        $id = $row['riv_id'];
        $markArray = [];
        $resultM = mysqli_query($con, "SELECT * FROM marchi_rivenditori WHERE riv_id = '$id'");
        while($rowM = mysqli_fetch_array($resultM)) {
            $row_array['i'] = (int)$rowM['mark_id'];
            $row_array['s'] = (int)$rowM['mark_disc'];
            $row_array['v'] = (int)$rowM['mark_show'];

            array_push($markArray, $row_array);
        }

        $arraySrz = json_encode($markArray);

        $sql="UPDATE rivenditori SET riv_mark = '$arraySrz' WHERE riv_id = '$id'";
        mysqli_query($con,$sql);
    }
}

//rivenditoriArray($con);

// ***************** RIVENDITORI AGGIUNTA CONSEGNA IN MARCHI ARRAY *****************
function rivenditoriDelivery($con) {
    $result = mysqli_query($con, "SELECT * FROM rivenditori");
    while($row = mysqli_fetch_array($result)) {
        $id = $row['riv_id'];
        $arraySrz = json_decode($row['riv_mark']);
        for($i = 0; $i < count($arraySrz); $i++){
            $arraySrz[$i]->d = 0;
        }
        $string = json_encode($arraySrz);
        $sql="UPDATE rivenditori SET riv_mark = '$string' WHERE riv_id = '$id'";
        mysqli_query($con,$sql);
    }
}

//rivenditoriDelivery($con);

// ***************** PRODOTTI REMOVE EURO ASCII *****************
function euroRemove($con) {
    $sql="UPDATE prodotti SET prd_note = REPLACE(prd_note, '&euro;', '€') WHERE prd_note LIKE '%&euro;%'";
    mysqli_query($con,$sql);
}

//euroRemove($con);

// ***************** PRODOTTI GIERREGENERALE *****************
function grGenerale($con) {
    $sql="UPDATE prodotti SET prd_lnfn_id = 42 WHERE prd_mark_id = 45 AND prd_line_id != 45 AND prd_line_id != 51 AND prd_line_id != 111 AND prd_line_id != 112 AND prd_line_id != 113";
    mysqli_query($con,$sql);
}

//grGenerale($con);

// ***************** CANCELLARE TUTTI I PRODOTTI IN ESPOSIZIONI SENZA ESPOSIZIONE *****************
function espPrClear($con) {
    $sql="DELETE FROM esposizioni_prodotti WHERE NOT EXISTS(SELECT * FROM esposizioni WHERE esposizioni.esp_id = esposizioni_prodotti.espr_esp)";
    mysqli_query($con,$sql);
}

//espPrClear($con);

// ***************** CANCELLARE TUTTI I SETTORI IN ESPOSIZIONI SENZA ESPOSIZIONE *****************
function espSetClear($con) {
    $sql="DELETE FROM settori_esposizioni WHERE NOT EXISTS(SELECT * FROM esposizioni WHERE esposizioni.esp_id = settori_esposizioni.stes_esp)";
    mysqli_query($con,$sql);
}

// ***************** SPOSTARE DA LINEE A SETTORI LINEE IL MANAGER *****************
function moveManager($con) {
    $sql = "UPDATE settori_linee JOIN linee ON settori_linee.stln_line_id = linee.line_id SET stln_manager = line_manager WHERE stln_line_id = line_id";
    mysqli_query($con, $sql);
}

//moveManager($con);


//espSetClear($con);

//setcookie('user', 'roma', 0, "/");
//setcookie('44-disc', -20, 0, "/");
//setcookie('44-show', 0, 0, "/");
//setcookie('user', '', 0, "/");
//setcookie('44-disc', '', 0, "/");
//setcookie('44-show', '', 0, "/");

