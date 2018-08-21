<!DOCTYPE html>
<html>
<head lang="it">
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="stylesheet" type="text/css" href="../css%5BOLD%5D/bootstrap.min.css">
    <link rel="stylesheet" type="text/css" href="css/mpuDashboard.css">
    <script type="text/javascript" src="http://ajax.googleapis.com/ajax/libs/jquery/2.1.1/jquery.min.js"></script>
    <link rel="icon" type="image/png" href="../img/favicon.ico" title="mobiliperufficio.com" />
    <title>mobiliperufficio.com - Dashboard</title>
    <?php include('php/connessione.php'); ?>
</head>

<body ng-app="mpuDashboard" ng-controller="mainCtrl">
<?php
function listaProdottiGoogle($con) {
    $message = "wrong answer";
    echo "<script type='text/javascript'>alert('$message');</script>";
    $resultProdotti = mysqli_query($con, "SELECT DISTINCT * FROM prodotti WHERE prd_mark_id = 50");
    while ($rowProdotti = mysqli_fetch_array($resultProdotti)) {
        $id = (int)$rowProdotti['prd_id'];
        $resultM = mysqli_query($con, "SELECT * FROM marchi WHERE mark_id = $rowProdotti[prd_mark_id]");
        while ($rowM = mysqli_fetch_array($resultM)) {
            $marchio = $rowM['mark_nome'];
            $mark_list = $rowM['mark_list'];
            $mark_disc = $rowM['mark_disc'];
        }
        $resultL = mysqli_query($con, "SELECT * FROM linee WHERE line_id = $rowProdotti[prd_line_id]");
        while ($rowL = mysqli_fetch_array($resultL)) {
            $linea = $rowL['line_nome'];
            $line_disc = $rowL['line_disc'];
        }
        $resultS = mysqli_query($con, "SELECT stpr_array FROM settori_prodotti WHERE stpr_prd = $rowProdotti[prd_id]");
        while ($rowS = mysqli_fetch_array($resultS)) {
            $settoreID = json_decode($rowS['stpr_array']);
            $resultSS = mysqli_query($con, "SELECT set_nome, set_cat_id FROM settori WHERE set_id = $settoreID[0]");
            while ($rowSS = mysqli_fetch_array($resultSS)) {
                $settore = $rowSS['set_nome'];
                $catID = $rowSS['set_cat_id'];
                $product_type = 'Arredamento > ' . $settore;
                $resultC = mysqli_query($con, "SELECT cat_nome FROM categorie WHERE cat_id = $catID");
                while ($rowC = mysqli_fetch_array($resultC)) {
                    $categoria = $rowC['cat_nome'];
                    $google_product_category = ($categoria == 'sedute per ufficio') ? '2045' : '6362';
                }
            }
        }
        $link = 'http://mobiliperufficio.com/mpu/articolo?s=' . $settoreID[0] . '&l=' . $rowProdotti['prd_line_id'] .'&a=' . $rowProdotti['prd_id'];
        $image_link = 'http://mobiliperufficio.com/dashboard/archivio_dati/' . str_replace(" ", "_", $marchio) . '/' . str_replace(" ", "_", $linea) . '/Prodotti/' . html_entity_decode($rowProdotti['prd_cod']) . '.jpg';
        $gtin = html_entity_decode($rowProdotti['prd_cod']);
        $title = html_entity_decode($rowProdotti['prd_title']) . ', dim. ' . html_entity_decode($rowProdotti['prd_dim']);
        $price = json_decode($rowProdotti['prd_price_array']);
        $price = $price[0]->z;
        $price = ceil($price + ($price * ($mark_list / 100)) + ($price * ($mark_disc / 100)) + ($price * ($line_disc / 100)));
        $price = $price . ",00";
        $string = "<item>" . PHP_EOL;
        $string .= "<g:id>" . $id . "</g:id>" . PHP_EOL;
        $string .= "<g:mpn>" . $gtin . "</g:mpn>" . PHP_EOL;
        $string .= "<g:brand>ZAD ITALY</g:brand>" . PHP_EOL;
        $string .= "<title>" . $title . "</title>" . PHP_EOL;
        $string .= "<description>" . $title . "</description>" . PHP_EOL;
        $string .= "<g:google_product_category>" . $google_product_category . "</g:google_product_category>" . PHP_EOL;
        $string .= "<g:product_type>" . $product_type . "</g:product_type>" . PHP_EOL;
        $string .= "<link>" . $link . "</link>" . PHP_EOL;
        $string .= "<g:image_link>" . $image_link . "</g:image_link>" . PHP_EOL;
        $string .= "<g:condition>new</g:condition>" . PHP_EOL;
        $string .= "<g:availability>preorder</g:availability>" . PHP_EOL;
        $string .= "<g:price>" . $price . "</g:price>" . PHP_EOL;
        $string .= "<g:shipping>" . PHP_EOL;
        $string .= "<g:country>IT</g:country>" . PHP_EOL;
        $string .= "<g:service>Standard</g:service>" . PHP_EOL;
        $string .= "<g:price>00.00</g:price>" . PHP_EOL;
        $string .= "</g:shipping>" . PHP_EOL;
        $string .= "</item>" . PHP_EOL;
        file_put_contents('../lista.txt', $string, FILE_APPEND);
    }
}

function siteMapProdottiGoogle($con) {
    $resultProdotti = mysqli_query($con, "SELECT * FROM prodotti");
    while ($rowProdotti = mysqli_fetch_array($resultProdotti)) {
        $id = (int)$rowProdotti['prd_id'];
        $link = 'http://mobiliperufficio.com/mpu/articolo?&a=' . $id;
        $string = "<url>" . PHP_EOL;
        $string .= "<loc>" . $link . "</loc>" . PHP_EOL;
        $string .= "<changefreq>monthly</changefreq>" . PHP_EOL;
        $string .= "<priority>0.5</priority>" . PHP_EOL;
        $string .= "</url>" . PHP_EOL;
        file_put_contents('../sitemap.txt', $string, FILE_APPEND);
    }
}

function siteMapCategorieGoogle($con) {
    $resultProdotti = mysqli_query($con, "SELECT cat_id FROM categorie");
    while ($rowProdotti = mysqli_fetch_array($resultProdotti)) {
        $id = (int)$rowProdotti['cat_id'];
        $link = 'http://mobiliperufficio.com/mpu/categoria?c=' . $id;
        $string = "<url>" . PHP_EOL;
        $string .= "<loc>" . $link . "</loc>" . PHP_EOL;
        $string .= "<changefreq>weekly</changefreq>" . PHP_EOL;
        $string .= "<priority>1</priority>" . PHP_EOL;
        $string .= "</url>" . PHP_EOL;
        file_put_contents('../sitemapCategorie.txt', $string, FILE_APPEND);
    }
}

function siteMapSettoriGoogle($con) {
    $resultProdotti = mysqli_query($con, "SELECT set_id FROM settori");
    while ($rowProdotti = mysqli_fetch_array($resultProdotti)) {
        $id = (int)$rowProdotti['set_id'];
        $link = 'http://mobiliperufficio.com/mpu/settore?s=' . $id;
        $string = "<url>" . PHP_EOL;
        $string .= "<loc>" . $link . "</loc>" . PHP_EOL;
        $string .= "<changefreq>weekly</changefreq>" . PHP_EOL;
        $string .= "<priority>1</priority>" . PHP_EOL;
        $string .= "</url>" . PHP_EOL;
        file_put_contents('../sitemapSettori.txt', $string, FILE_APPEND);
    }
}

function siteMapRivGoogle($con) {
    $resultProdotti = mysqli_query($con, "SELECT provincia FROM province");
    while ($rowProdotti = mysqli_fetch_array($resultProdotti)) {
        $id = preg_replace('/\s+/', '', $rowProdotti['provincia']);;
        $link = 'http://mobiliperufficio.com/' . $id . '/home';
        $string = "<url>" . PHP_EOL;
        $string .= "<loc>" . $link . "</loc>" . PHP_EOL;
        $string .= "<changefreq>monthly</changefreq>" . PHP_EOL;
        $string .= "<priority>1</priority>" . PHP_EOL;
        $string .= "</url>" . PHP_EOL;
        file_put_contents('../sitemapProvince.txt', $string, FILE_APPEND);
    }
}

//listaProdottiGoogle($con);
//siteMapProdottiGoogle($con);
//siteMapCategorieGoogle($con);
//siteMapSettoriGoogle($con);
//siteMapRivGoogle($con);
?>
<div class="background"></div>
<div ng-include="'include/menu.html'" id="menu" ng-ftscroller ftoptions="vm.ftscroller"></div>
<div ng-view id="view"></div>
<div class="notification" ng-if="saving">
    <span>Loading data</span>
    <i class="icons-loader"></i>
</div>
<!--<div ng-include=""></div>   FOOTER  -->
<?php mysqli_close($con); ?>
</body>

<script type="text/javascript" src="../js%5BOLD%7D/underscore-min.js"></script>
<script type="text/javascript" src="http://ajax.googleapis.com/ajax/libs/angularjs/1.4.2/angular.min.js"></script>
<script type="text/javascript" src="http://ajax.googleapis.com/ajax/libs/angularjs/1.4.2/angular-route.js"></script>
<script type="text/javascript" src="http://ajax.googleapis.com/ajax/libs/angularjs/1.4.2/angular-animate.js"></script>
<script type="text/javascript" src="http://ajax.googleapis.com/ajax/libs/angularjs/1.4.2/angular-sanitize.js"></script>
<script type="text/javascript" src="http://ajax.googleapis.com/ajax/libs/angularjs/1.4.2/angular-cookies.js"></script>
<script type="text/javascript" src="../js%5BOLD%7D/ui-bootstrap-tpls-0.13.0.min.js"></script>
<script type='text/javascript' src='http://rawgithub.com/ftlabs/ftscroller/master/lib/ftscroller.js'></script>
<script type="text/javascript" src="../lib/ng-ftscroller.js"></script>
<script type="text/javascript" src="js/mpuDashboard.js"></script>
<script type="text/javascript" src="js/configure.js"></script>
<script type="text/javascript" src="js/services.js"></script>
<script type="text/javascript" src="js/controllers.js"></script>
<script type="text/javascript" src="js/directives.js"></script>
<script type="text/javascript" src="js/filters.js"></script>
</html>