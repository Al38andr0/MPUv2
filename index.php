<?php
include('dashboard/php/connessione.php');
function findLoc($title)
{
    $string = substr($_SERVER['REQUEST_URI'], 1);
    $lastSlash = strripos($string, '/');
    $result = substr($string, 0, $lastSlash);
    if ($title) {
        if ($result == '' || $result == 'mpu') {
            return $result = '| Roma | Milano';
        } else {
            return '| ' . $result;
        }
    } else {
        if ($result == '' || $result == 'mpu') {
            return $result = 'Roma';
        } else {
            return $result;
        }
    }
}

?>
<!DOCTYPE html>
<html ng-app="mpu" ng-controller="mainCtrl as vm" ng-cloak>
<head lang="it">
    <meta charset="UTF-8">
    <base href="/mpuV2/">
    <link rel="canonical" href="{{vm.fnz.absoluteUrl()}}">
    <meta name="fragment" content="!">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="stylesheet" type="text/css" href="css/bootstrap.min.css">
    <link rel="stylesheet" type="text/css" href="css/mpu.min.css">
    <link rel="icon" type="image/png" href="img/favicon.ico" title="mobiliperufficio.com"/>
    <link rel="author"href="https://plus.google.com/105034652436636507879">
    <title>{{vm.title}}</title>
    <meta name="description" content="{{vm.description}}"/>
    <!--ANALYTICS-->
    <script>
        (function (i, s, o, g, r, a, m) {
            i['GoogleAnalyticsObject'] = r;
            i[r] = i[r] || function () {
                    (i[r].q = i[r].q || []).push(arguments)
                }, i[r].l = 1 * new Date();
            a = s.createElement(o),
                m = s.getElementsByTagName(o)[0];
            a.async = 1;
            a.src = g;
            m.parentNode.insertBefore(a, m)
        })(window, document, 'script', '//www.google-analytics.com/analytics.js', 'ga');

        ga('create', 'UA-36303247-1', 'mobiliperufficio.com');
        ga('send', 'pageview');

    </script>
</head>

<body>
<div ng-class="{visible : vm.showContatti}" class="redirect overflow">
    <i class="icons-available-not" ng-click="vm.showContatti = false"></i>
    <div class="overlayerContatti">
        <?php
        $telRIV = NULL;
        $emailRIV = NULL;
        $webRIV = NULL;
        $webINT = NULL;
        $regID = NULL;
        $pr = findLoc(false);
        $resultFindReg = mysqli_query($con, "SELECT regione_id FROM province WHERE provincia = '$pr'");
        while ($rowFindReg = mysqli_fetch_array($resultFindReg)) {
            $regID = $rowFindReg['regione_id'];
        }
        function htmlallentities($str)
        {
            $res = '';
            $strlen = strlen($str);
            for ($i = 0; $i < $strlen; $i++) {
                $byte = ord($str[$i]);
                if ($byte < 128) // 1-byte char
                    $res .= $str[$i];
                elseif ($byte < 192) ; // invalid utf8
                elseif ($byte < 224) // 2-byte char
                    $res .= '&#' . ((63 & $byte) * 64 + (63 & ord($str[++$i]))) . ';';
                elseif ($byte < 240) // 3-byte char
                    $res .= '&#' . ((15 & $byte) * 4096 + (63 & ord($str[++$i])) * 64 + (63 & ord($str[++$i]))) . ';';
                elseif ($byte < 248) // 4-byte char
                    $res .= '&#' . ((15 & $byte) * 262144 + (63 & ord($str[++$i])) * 4096 + (63 & ord($str[++$i])) * 64 + (63 & ord($str[++$i]))) . ';';
            }
            return $res;
        }

        $resultRG = mysqli_query($con, "SELECT regioni_id, regioni_nome FROM regioni ORDER BY CASE WHEN regioni_id = '$regID' THEN '1' ELSE regioni_nome END ASC");
        while ($rowRG = mysqli_fetch_array($resultRG)) {
            $regione = utf8_decode($rowRG['regioni_nome']);
            $idRG = $rowRG['regioni_id'];
            ?>
            <h1>Arredamenti per ufficio <?php echo $regione; ?></h1>
            <?php
            $resultPR = mysqli_query($con, "SELECT provincia, provincia_id, riv_id, riv_nome, riv_tel, riv_email, riv_web FROM province LEFT JOIN rivenditori ON provincia_id = riv_prov WHERE regione_id = '$idRG' ORDER BY CASE WHEN provincia = '$pr' THEN '1' ELSE provincia END ASC");
            while ($rowPR = mysqli_fetch_array($resultPR)) {
                $provincia = htmlallentities($rowPR['provincia']);
                $idPR = $rowPR['provincia_id'];
                $idRIV = $rowPR['riv_id'];
                if ($idRIV) {
                    $rivenditore = htmlallentities($rowPR['riv_nome']);
                    $telRIV = $rowPR['riv_tel'];
                    $emailRIV = $rowPR['riv_email'];
                    $webRIV = $rowPR['riv_web'];
                    $webINT = 'mobiliperufficio.com/' . $provincia . '/home';
                } else {
                    $resultMPU = mysqli_query($con, "SELECT riv_nome, riv_tel, riv_email, riv_web FROM rivenditori WHERE riv_id = 1");
                    while ($rowMPU = mysqli_fetch_array($resultMPU)) {
                        $idRIV = 1;
                        $rivenditore = htmlallentities($rowMPU['riv_nome']);
                        $telRIV = $rowMPU['riv_tel'];
                        $emailRIV = $rowMPU['riv_email'];
                        $webRIV = $rowMPU['riv_web'];
                    }
                }
                ?>
                <div class="rivList">
                    <div class="rivInfo">
                        <h2 class="green">Mobili per ufficio <?php echo $provincia; ?>: <?php echo $rivenditore; ?></h2>
                        <p>telefono: <a href="tel:<?php echo $telRIV; ?>"><?php echo $telRIV; ?></a></p>
                        <p>email: <a ng-href="mailto:<?php echo $emailRIV; ?>"
                                     title="scrivi una email a <?php echo $emailRIV; ?>"><?php echo $emailRIV; ?></a>
                        </p>
                        <p class="link">sito web: <a ng-href="http://<?php echo substr($webRIV, 4); ?>" target="_blank"
                                                     title="visita il sito <?php echo $webRIV; ?>"><?php echo $webRIV; ?></a>
                        </p>
                        <?php
                        if ($webINT) {
                            ?>
                            <p class="link"><?php echo $rivenditore; ?>: offerte,  prezzi, mobili ufficio, arredo ufficio, sedie ufficio, pareti ufficio: <a
                                    ng-href="http://mobiliperufficio.com/<?php echo $provincia; ?>/home" target="_blank"
                                    title="visita il sito mobiliperufficio di <?php echo $rivenditore; ?>">www.mobiliperufficio.com/<?php echo $provincia; ?>
                                    /home</a>
                            </p>
                            <?php
                        }
                        ?>
                    </div>
                    <img
                        src="dashboard/archivio_dati/Rivenditori/<?php echo $idRIV; ?>.jpg"
                        alt="Logo <?php echo $rivenditore; ?>"
                        title="<?php echo $rivenditore; ?>, distributore di mobili e sedie per ufficio, <?php echo $provincia; ?>">
                </div>
                <?php
            }
        }
        ?>
    </div>
</div>
<div ng-if="vm.loaded" ng-include="'include/menu.html'" id="menu" ng-ftscroller ftoptions="vm.ftscroller"></div>
<div ng-if="vm.loaded" ng-include="'include/newMenuMobile.html'" id="newMenuMobile"></div>
<div ng-if="vm.loaded" ng-view id="view"></div>

<footer ng-if="vm.loaded" id="footer" ng-include="'include/footer.html'"></footer>

<i class="icons-up scrollToTop" title="Torna su" ng-click="vm.fnz.scrollTop()" ng-class="{visible : vm.showScroll}"></i>

<div ng-if="!vm.loaded" class="loading" ng-include="'include/loader.html'"></div>

<div class="loading" ng-if="vm.added"></div>

<div class="added" ng-class="{visible : vm.added}">
    <i class="icons-available-not" ng-click="vm.added = false"></i>
    <span>preventivo aggiornato</span>
    <button class="btn btn-info" ng-click="vm.added = false">Prosegui la ricerca</button>
    <button class="btn btn-success" ng-click="vm.fnz.goToPrev()">Visualizza il preventivo</button>
</div>

<div class="redirect" ng-show="request.u">
    <div class="onePx"></div>
    <request class="request" request="request" prv="dt.province" riv="data.rivenditore"></request>
</div>

<div ng-if="!vm.cookies" class="cookies up" ng-include="'include/privacy.html'"></div>

<script type="text/javascript">
    /* <![CDATA[ */
    let google_conversion_id = 1043998809;
    let google_conversion_language = "it";
    let google_custom_params = window.google_tag_params;
    let google_conversion_format = "3";
    let google_conversion_color = "ffffff";
    let google_conversion_label = "KXc4CP3DilkQ2dDo8QM";
    let google_remarketing_only = true;
    /* ]]> */
</script>
<script type="text/javascript" src="//www.googleadservices.com/pagead/conversion.js">
</script>
<noscript>
    <div style="display:inline;">
        <img height="1" width="1" style="border-style:none;" alt=""
             src="//www.googleadservices.com/pagead/conversion/1043998809/?label=KXc4CP3DilkQ2dDo8QM&amp;guid=ON&amp;script=0"/>
    </div>
</noscript>
</body>
<!--<script type="text/javascript" src="https://code.angularjs.org/1.7.2/angular.min.js"></script>-->
<script type="text/javascript" src="https://code.angularjs.org/1.7.2/angular.js"></script>
<script type="text/javascript" src="js/underscore-min.js"></script>
<script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/angular-ui-router/1.0.18/angular-ui-router.js"></script>
<script type="text/javascript" src="https://code.angularjs.org/1.7.2/angular-sanitize.min.js"></script>
<script type="text/javascript" src="https://code.angularjs.org/1.7.2/angular-cookies.min.js"></script>
<script type="text/javascript" src="https://code.angularjs.org/1.7.2/angular-touch.min.js"></script>
<script type="text/javascript" src="js/modules.js"></script>
<script type="text/javascript" src="js/routes.js"></script>
<script type="text/javascript" src="js/controllers/mainCtrl.js"></script>
</html>