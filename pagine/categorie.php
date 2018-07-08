<?php
include ('../dashboard/php/connessione.php');
$id = $_GET['c'];
$txt = null;
$nome = null;

function htmlallentities($str){
    $res = '';
    $strlen = strlen($str);
    for($i=0; $i<$strlen; $i++){
        $byte = ord($str[$i]);
        if($byte < 128) // 1-byte char
            $res .= $str[$i];
        elseif($byte < 192); // invalid utf8
        elseif($byte < 224) // 2-byte char
            $res .= '&#'.((63&$byte)*64 + (63&ord($str[++$i]))).';';
        elseif($byte < 240) // 3-byte char
            $res .= '&#'.((15&$byte)*4096 + (63&ord($str[++$i]))*64 + (63&ord($str[++$i]))).';';
        elseif($byte < 248) // 4-byte char
            $res .= '&#'.((15&$byte)*262144 + (63&ord($str[++$i]))*4096 + (63&ord($str[++$i]))*64 + (63&ord($str[++$i]))).';';
    }
    return $res;
}

$result = mysqli_query($con, "SELECT * FROM categorie WHERE cat_id = '$id'");
while ($row = mysqli_fetch_array($result)) {
    $nome = utf8_decode($row['cat_nome']);
    $txt = htmlallentities($row['cat_txt']);
}
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
    <title>mobiliperufficio.com | <?php echo $nome; ?></title>
    <meta name="Description" content="<?php echo $txt; ?>" />
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
<div class="home">
    <div class="imgBg" style="background : url('../dashboard/archivio_dati/Categorie/<?php echo $id; ?>.jpg') no-repeat right" title="<?php echo $nome; ?>"></div>
    <div class="testo right">
        <h1 class="text-uppercase"><?php echo $nome; ?></h1>
        <p><?php echo $txt; ?></p>
    </div>
</div>
<div class="home">
    <h2>Settori disponibili nella categoria <?php echo $nome; ?></h2>
</div>
<?php
$result = mysqli_query($con, "SELECT * FROM settori WHERE set_cat_id = '$id' AND set_show = 1 ORDER BY set_pos");
while ($row = mysqli_fetch_array($result)) {
    $id = $row['set_id'];
    $nome = utf8_decode($row['set_nome']);
    $txt = htmlallentities($row['set_txt']);
    ?>
    <div class="home">
        <div class="imgBg"
             style="background : url('../dashboard/archivio_dati/Settori/<?php echo $id; ?>.jpg') no-repeat right"
             title="<?php echo $nome; ?>"></div>
        <div class="testo right">
            <h1><?php echo $nome; ?></h1>
            <p><?php echo $txt; ?></p>
        </div>
    </div>
    <?php
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