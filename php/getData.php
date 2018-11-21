<?php
include "../_dashboard/php/connessione.php";

switch($_GET['i']) {
    case 'marchi':
        function jsonList($con)
        {
            $array = [];
            $resultMarchi = mysqli_query($con, "SELECT * FROM marchi");
            while ($rowMarchi = mysqli_fetch_array($resultMarchi)) {
                $rowMarchi_array['i'] = (int)$rowMarchi['mark_id'];
                $rowMarchi_array['n'] = html_entity_decode($rowMarchi['mark_nome']);
                $rowMarchi_array['s'] = (int)$rowMarchi['mark_disc'];
                $rowMarchi_array['b'] = (int)$rowMarchi['mark_list'];
                $rowMarchi_array['v'] = (int)$rowMarchi['mark_show'];
                $rowMarchi_array['g'] = json_decode($rowMarchi['mark_cat_array']);

                array_push($array, $rowMarchi_array);
            }
            return json_encode($array);
        }

        print_r(jsonList($con));
        break;
    case 'prodotti':
        function jsonList($con)
        {
            $array = [];
            $resultProdotti = mysqli_query($con, "SELECT * FROM prodotti");
            while ($rowProdotti = mysqli_fetch_array($resultProdotti)) {
                $rowProdotti_array['i'] = (int)$rowProdotti['prd_id'];
                $rowProdotti_array['m'] = (int)$rowProdotti['prd_mark_id'];
                $rowProdotti_array['l'] = (int)$rowProdotti['prd_line_id'];
                $rowProdotti_array['c'] = html_entity_decode($rowProdotti['prd_cod']);
                $rowProdotti_array['n'] = html_entity_decode($rowProdotti['prd_title']);
                $rowProdotti_array['t'] = (int)$rowProdotti['prd_tbpr'];
                $rowProdotti_array['d'] = html_entity_decode($rowProdotti['prd_dim']);
                $rowProdotti_array['y'] = (int)$rowProdotti['prd_pos'];
                $rowProdotti_array['x'] = (int)$rowProdotti['prd_lnfn_id'];
                $rowProdotti_array['o'] = html_entity_decode($rowProdotti['prd_note']);
                $rowProdotti_array['a'] = (int)$rowProdotti['prd_abb'];
                $rowProdotti_array['f'] = (int)$rowProdotti['prd_fin'];
                $rowProdotti_array['z'] = json_decode($rowProdotti['prd_price_array']);

                array_push($array, $rowProdotti_array);
            }
            return json_encode($array);
        }

        print_r(jsonList($con));
        break;
    case 'prodottiSettori':
        function jsonList($con)
        {
            $array = [];
            $result = mysqli_query($con, "SELECT * FROM settori_prodotti JOIN prodotti ON prodotti.prd_id = settori_prodotti.stpr_prd");
            while ($row = mysqli_fetch_array($result)) {
                $stpr_array['h'] = json_decode($row['stpr_array']);
                $stpr_array['i'] = (int)$row['stpr_id'];
                $stpr_array['m'] = (int)$row['stpr_mark_id'];
                $stpr_array['l'] = (int)$row['stpr_line_id'];
                $stpr_array['w'] = (int)$row['stpr_nwln_id'];
                $stpr_array['c'] = (int)$row['stpr_prd'];
                $stpr_array['n'] = html_entity_decode($row['prd_cod']);

                array_push($array, $stpr_array);
            }
            return json_encode($array);
        }
        print_r(jsonList($con));
        break;
    case 'settori':
        function jsonList($con)
        {
            $array = [];
            $result = mysqli_query($con, "SELECT cat_id FROM categorie ORDER BY cat_pos");
            while ($row = mysqli_fetch_array($result)) {
                $cat_id = $row['cat_id'];

                $resultSet = mysqli_query($con, "SELECT * FROM settori WHERE set_cat_id = '$cat_id' ORDER BY set_pos");
                while ($rowSet = mysqli_fetch_array($resultSet)) {
                    $rowSet_array['i'] = (int)$rowSet['set_id'];
                    $rowSet_array['n'] = html_entity_decode($rowSet['set_nome']);
                    $rowSet_array['g'] = (int)$rowSet['set_cat_id'];
                    $rowSet_array['y'] = (int)$rowSet['set_pos'];
                    $rowSet_array['v'] = (int)$rowSet['set_show'];
                    $rowSet_array['x'] = html_entity_decode($rowSet['set_txt']);
                    $rowSet_array['o'] = (int)$rowSet['set_home'];

                    array_push($array, $rowSet_array);
                }
                return json_encode($array);
            }
        }
        print_r(jsonList($con));
        break;
    case 'categorie':
        function jsonList($con)
        {
            $array = [];
            $result = mysqli_query($con, "SELECT * FROM categorie ORDER BY cat_pos");
            while ($row = mysqli_fetch_array($result)) {
                $row_array['i'] = (int)$row['cat_id'];
                $row_array['n'] = html_entity_decode($row['cat_nome']);
                $row_array['y'] = (int)$row['cat_pos'];
                $row_array['v'] = (int)$row['cat_show'];
                $row_array['x'] = html_entity_decode($row['cat_txt']);

                array_push($array, $row_array);
            }
            return json_encode($array);
        }

        print_r(jsonList($con));
        break;
    case 'marchiTabelle':
        function jsonList($con) {
            $array = [];
            $resultTabProd = mysqli_query($con,"SELECT * FROM tabelle_prodotti ORDER BY tbpr_pos ASC");
            while($rowTabProd = mysqli_fetch_array($resultTabProd)) {
                $rowTabProd_array['i'] = (int)$rowTabProd['tbpr_id'];
                $rowTabProd_array['n'] = html_entity_decode($rowTabProd['tbpr_nome']);
                $rowTabProd_array['y'] = (int)$rowTabProd['tbpr_pos'];
                $rowTabProd_array['m'] = (int)$rowTabProd['tbpr_mark_id'];
                array_push($array, $row_array);
            }
            return json_encode($array);
        }
        print_r(jsonList($con));
        break;
    case 'vetrineProdotti':
        function jsonList($con) {
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
            return json_encode($array);
        }
        print_r(jsonList($con));
        break;
    case 'composti':
        function jsonList($con) {
            $array = [];
            $result = mysqli_query($con,"SELECT * FROM composti");
            while($row = mysqli_fetch_array($result)) {
                $row_array['i'] = (int)$row['cst_id'];
                $row_array['m'] = (int)$row['cst_mark_id'];
                $row_array['l'] = (int)$row['cst_line_id'];
                $row_array['c'] = $row['cst_cod'];
                $row_array['f'] = $row['cst_fin'];
                $row_array['y'] = (int)$row['cst_pos'];
                $row_array['n'] = html_entity_decode($row['cst_nome']);
                array_push($array,$row_array);
            }
            return json_encode($array);
        }
        print_r(jsonList($con));
        break;
    case 'compostiSettori':
        function jsonList($con) {
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
            return json_encode($array);
        }
        print_r(jsonList($con));
        break;
    case 'compostiProdotti':
        function jsonList($con) {
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
            return json_encode($array);
        }
        print_r(jsonList($con));
        break;
    case 'abbinamenti':
        function jsonList($con) {
            $array = [];
            $resultAbb = mysqli_query($con, "SELECT * FROM abbinamenti");
            while ($rowAbb = mysqli_fetch_array($resultAbb)) {
                $rowAbb_array['i'] = (int)$rowAbb['abb_id'];
                $rowAbb_array['c'] = $rowAbb['abb_cod'];
                $rowAbb_array['m'] = (int)$rowAbb['abb_mark_id'];
                $rowAbb_array['l'] = (int)$rowAbb['abb_line_id'];
                $rowAbb_array['u'] = (int)$rowAbb['abb_tab'];
                $rowAbb_array['f'] = json_decode($rowAbb['abb_array']);
                array_push($array,$row_array);
            }
            return json_encode($array);
        }
        print_r(jsonList($con));
        break;
    case 'finiture':
        function jsonList($con) {
            $array = array();
            $resultFin = mysqli_query($con,"SELECT * FROM finiture");
            while($rowFin = mysqli_fetch_array($resultFin)) {
                $rowFin_array['i'] = (int)$rowFin['fin_id'];
                $rowFin_array['c'] = $rowFin['fin_cod'];
                $rowFin_array['n'] = html_entity_decode($rowFin['fin_nome']);
                $rowFin_array['m'] = (int)$rowFin['fin_mark_id'];
                $rowFin_array['v'] = (int)$rowFin['fin_show'];
                $rowFin_array['p'] = (int)$rowFin['fin_type_id'];
                array_push($array,$row_array);
            }
            return json_encode($array);
        }
        print_r(jsonList($con));
        break;
    case 'finitureTabelle':
        function jsonList($con) {
            $array = [];
            $resultTabLinee = mysqli_query($con, "SELECT * FROM tabelle_finiture");
            while ($rowTabLinee = mysqli_fetch_array($resultTabLinee)) {
                $rowSetTabLinee_array['i'] = (int)$rowTabLinee['tab_id'];
                $rowSetTabLinee_array['n'] = html_entity_decode($rowTabLinee['tab_nome']);
                $rowSetTabLinee_array['l'] = (int)$rowTabLinee['tab_line_id'];
                $rowSetTabLinee_array['m'] = (int)$rowTabLinee['tab_mark_id'];
                array_push($array, $rowSetTabLinee_array);
            }
            return json_encode($array);
        }
        print_r(jsonList($con));
        break;
    case 'rivenditori':
        function jsonList($con)
        {
            $array = [];
            $result = mysqli_query($con, "SELECT * FROM rivenditori");
            while ($row = mysqli_fetch_array($result)) {
                $row_array['i'] = (int)$row['riv_id'];
                $row_array['n'] = html_entity_decode($row['riv_nome']);
                $row_array['z'] = (int)$row['riv_naz'];
                $row_array['r'] = (int)$row['riv_reg'];
                $row_array['p'] = (int)$row['riv_prov'];
                $row_array['v'] = (int)$row['riv_conv'];
                $row_array['x'] = html_entity_decode($row['riv_rif']);
                $row_array['s'] = html_entity_decode($row['riv_sede']);
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
                $row_array['y'] = json_decode($row['riv_mark']);
                array_push($array, $row_array);
            }
            return json_encode($array);
        }
        print_r(jsonList($con));
        break;
    case 'agenti':
        function jsonList($con)
        {
            $array = [];
            $result = mysqli_query($con, "SELECT * FROM agenti");
            while ($row = mysqli_fetch_array($result)) {
                $row_array['i'] = (int)$row['agenti_id'];
                $row_array['n'] = html_entity_decode($row['agenti_nome']);
                $row_array['e'] = $row['agenti_email'];
                $row_array['p'] = $row['agenti_psw'];
                $row_array['t'] = $row['agenti_tel'];
                $row_array['r'] = (int)$row['agenti_riv'];
                array_push($array, $row_array);
            }
            return json_encode($array);
        }
        print_r(jsonList($con));
        break;
    case 'province':
        function jsonList($con) {
            $array = [];
            $result = mysqli_query($con,"SELECT * FROM province");
            while($row = mysqli_fetch_array($result)) {
                $row_array['i'] = (int)$row['provincia_id'];
                $row_array['n'] = html_entity_decode($row['provincia']);
                $row_array['c'] = $row['sigla'];
                $row_array['r'] = (int)$row['regione_id'];
                $row_array['z'] = (int)$row['nazione_id'];
                $row_array['t'] = (int)$row['trasporto'];
                $row_array['j'] = (int)$row['trasporto_type'];
                $row_array['m'] = (int)$row['montaggio'];
                $row_array['k'] = (int)$row['montaggio_type'];
                $row_array['l'] = (int)$row['limite'];
                $row_array['b'] = (int)$row['minimo'];
                array_push($array, $row_array);
            }
            return json_encode($array);
        }
        print_r(jsonList($con));
        break;
    case 'regioni':
        function jsonList($con) {
            $array = [];
            $result = mysqli_query($con,"SELECT * FROM regioni");
            while($row = mysqli_fetch_array($result)) {
                $row_array['i'] = (int)$row['regioni_id'];
                $row_array['n'] = html_entity_decode($row['regioni_nome']);
                $row_array['z'] = (int)$row['regioni_nazione'];
                array_push($array, $row_array);
            }
            return json_encode($array);
        }
        print_r(jsonList($con));
        break;
    case 'nazioni':
        function jsonList($con) {
            $array = [];
            $result = mysqli_query($con,"SELECT * FROM nazioni ORDER BY nazioni_nome");
            while($row= mysqli_fetch_array($result)) {
                $row_array['i'] = (int)$row['nazioni_id'];
                $row_array['n'] = html_entity_decode($row['nazioni_nome']);
                $row_array['v'] = (int)$row['nazioni_show'];
                $row_array['x'] = (int)$row['nazioni_prefisso'];
                array_push($array, $row_array);
            }
            return json_encode($array);
        }
        print_r(jsonList($con));
        break;
    case 'lineeSettori':
        function jsonList($con) {
            $array = [];
            $result = mysqli_query($con,"SELECT * FROM settori_linee ORDER BY stln_id");
            while($row = mysqli_fetch_array($result)) {
                $row_array['i'] = (int)$row['stln_id'];
                $row_array['m'] = (int)$row['stln_mark_id'];
                $row_array['l'] = (int)$row['stln_line_id'];
                $row_array['h'] = (int)$row['stln_set_id'];
                $row_array['v'] = (int)$row['stln_show'];
                $row_array['z'] = (int)$row['stln_price'];
                $row_array['q'] = json_decode($row['stln_manager']);
                array_push($array, $row_array);
            }
            return json_encode($array);
        }
        print_r(jsonList($con));
        break;
    case 'linee':
        function jsonList($con) {
            $array = [];
            $resultLinee = mysqli_query($con,"SELECT * FROM linee ORDER BY line_id");
            while($rowLinee= mysqli_fetch_array($resultLinee)) {
                $rowLinee_array['i'] = (int)$rowLinee['line_id'];
                $rowLinee_array['n'] = html_entity_decode($rowLinee['line_nome']);
                $rowLinee_array['m'] = (int)$rowLinee['line_mark_id'];
                $rowLinee_array['e'] = (int)$rowLinee['line_time'];
                $rowLinee_array['w'] = (int)$rowLinee['line_war'];
                $rowLinee_array['s'] = (int)$rowLinee['line_disc'];
                $rowLinee_array['k'] = (int)$rowLinee['line_pdf_file'];
                $rowLinee_array['j'] = (int)$rowLinee['line_spec_file'];
                array_push($array, $row_array);
            }
            return json_encode($array);
        }
        print_r(jsonList($con));
        break;
    case 'vetrine':
        function jsonList($con) {
            $array = [];
            $resultComp = mysqli_query($con, "SELECT * FROM composizioni");
            while ($rowComp = mysqli_fetch_array($resultComp)) {
                $rowComp_array['i'] = (int)$rowComp['cmp_id'];
                $rowComp_array['c'] = html_entity_decode($rowComp['cmp_nome']);
                $rowComp_array['m'] = (int)$rowComp['cmp_mark_id'];
                $rowComp_array['l'] = (int)$rowComp['cmp_line_id'];
                $rowComp_array['v'] = (int)$rowComp['cmp_show'];
                $rowComp_array['y'] = (int)$rowComp['cmp_pos'];
                $rowComp_array['n'] = html_entity_decode($rowComp['cmp_title']);
                $rowComp_array['o'] = html_entity_decode($rowComp['cmp_note']);
                $rowComp_array['h'] = json_decode($rowComp['cmp_array']);
                array_push($array, $row_array);
            }
            return json_encode($array);
        }
        print_r(jsonList($con));
        break;
}


mysqli_close($con);

