<?php
include ('../dashboard/php/connessione.php');
?>
<!DOCTYPE html>
<html>
<head lang="it">
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="stylesheet" type="text/css" href="../css/bootstrap.min.css">
    <link rel="stylesheet" type="text/css" href="../css/pages.min.css">
    <link rel="icon" type="image/png" href="../img/favicon.ico" title="mobiliperufficio.com" />
    <link rel="author" href="http://mobiliperufficio.com/humans.txt">
    <title>mobiliperufficio.com | Rivenditori in tutta Italia</title>
    <meta name="Description" content="mobiliperufficio.com: negozi e showroom a Roma, Milano, Torino, Firenze, Napoli, Palermo, Cagliari, Bari, Bologna, Genova, Venezia, Brescia, Catania, Bergamo, Salerno" />
    <!--ANALYTICS-->
    <script>
        (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
                (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
            m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
        })(window,document,'script','//www.google-analytics.com/analytics.js','ga');

        ga('create', 'UA-36303247-1', 'mobiliperufficio.com');
        ga('send', 'pageview');

    </script>
</head>
<body>
<div class="overlayerContatti">
    <?php
    $articoloRG = 'in';
    $resultRG = mysqli_query($con, "SELECT regioni_id, regioni_nome FROM regioni");
    while ($rowRG = mysqli_fetch_array($resultRG)) {
        $regione = utf8_decode($rowRG['regioni_nome']);
        $idRG = $rowRG['regioni_id'];
        if($idRG == 8 || $idRG == 12 || $idRG == 13 || $idRG == 21) $articoloRG = 'nel';
        if($idRG == 11) $articoloRG = 'nelle';
    ?>
    <h1>Arredamenti per ufficio <?php echo $articoloRG . " " . $regione; ?></h1>
        <?php
        $resultPR = mysqli_query($con, "SELECT provincia, provincia_id, riv_id, riv_nome, riv_tel, riv_email, riv_web FROM province LEFT JOIN rivenditori ON provincia_id = riv_prov WHERE regione_id = '$idRG'");
        while ($rowPR = mysqli_fetch_array($resultPR)) {
        $provincia = utf8_decode($rowPR['provincia']);
        $idPR = $rowPR['provincia_id'];
        $idRIV = $rowPR['riv_id'];
        if($idRIV) {
            $rivenditore = utf8_decode($rowPR['riv_nome']);
            $telRIV = $rowPR['riv_tel'];
            $emailRIV = $rowPR['riv_email'];
            $webRIV = $rowPR['riv_web'];
        } else {
            $resultMPU = mysqli_query($con, "SELECT riv_nome, riv_tel, riv_email, riv_web FROM rivenditori WHERE riv_id = 1");
            while ($rowMPU = mysqli_fetch_array($resultMPU)) {
                $idRIV = 1;
                $rivenditore = utf8_decode($rowMPU['riv_nome']);
                $telRIV = $rowMPU['riv_tel'];
                $emailRIV = $rowMPU['riv_email'];
                $webRIV = $rowMPU['riv_web'];
            }
        }
        ?>
            <div class="rivList">
                <div class="rivInfo">
                    <h2 class="green">Mobili per ufficio <?php echo $provincia; ?>: <?php echo $rivenditore; ?></h2>
                    <p>telefono: <?php echo $telRIV; ?></p>
                    <p>email: <a ng-href="mailto:<?php echo $emailRIV; ?>"
                                 title="scrivi una email a <?php echo $emailRIV; ?>"><?php echo $emailRIV; ?></a></p>
                    <p class="link">sito web: <a ng-href="http://<?php echo $webRIV; ?>" target="_blank"
                                                 title="visita il sito <?php echo $webRIV; ?>"><?php echo $webRIV; ?></a>
                    </p>
                </div>
                <img src="../dashboard/archivio_dati/Rivenditori/<?php echo $idRIV; ?>.jpg"
                     alt="Logo <?php echo $rivenditore; ?>" title="Logo <?php echo $rivenditore; ?>">
            </div>
            <?php
    }
}
?>
<script type="text/javascript">
    /* <![CDATA[ */
    var google_conversion_id = 1043998809;
    var google_conversion_language = "it";
    var google_custom_params = window.google_tag_params;
    var google_conversion_format = "3";
    var google_conversion_color = "ffffff";
    var google_conversion_label = "KXc4CP3DilkQ2dDo8QM";
    var google_remarketing_only = true;
    /* ]]> */
</script>
<script type="text/javascript" src="//www.googleadservices.com/pagead/conversion.js">
</script>
<noscript>
    <div style="display:inline;">
        <img height="1" width="1" style="border-style:none;" alt="" src="//www.googleadservices.com/pagead/conversion/1043998809/?label=KXc4CP3DilkQ2dDo8QM&amp;guid=ON&amp;script=0"/>
    </div>
</noscript>
</body>
</html>