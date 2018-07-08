<?php
include('connessione.php');

if($_GET['type'] == 'save' && $_GET['type'] != 'db') {

    $data = json_decode(file_get_contents("php://input"));
    $fp = fopen('../json/finiture_tabelle.json', 'w');
    fwrite($fp, json_encode($data));
    fclose($fp);

} elseif ($_GET['type'] == 'db'){

    function tabelleFinitureJson($con) {
        $tabLineeArray = [];
        $resultTabLinee = mysqli_query($con, "SELECT * FROM tabelle_finiture");
        while ($rowTabLinee = mysqli_fetch_array($resultTabLinee)) {
            $rowSetTabLinee_array['i'] = (int)$rowTabLinee['tab_id'];
            $rowSetTabLinee_array['n'] = html_entity_decode($rowTabLinee['tab_nome']);
            $rowSetTabLinee_array['l'] = (int)$rowTabLinee['tab_line_id'];
            $rowSetTabLinee_array['m'] = (int)$rowTabLinee['tab_mark_id'];

            array_push($tabLineeArray, $rowSetTabLinee_array);
        }

        $fp = fopen('../json/finiture_tabelle.json', 'w');
        $out = array_values($tabLineeArray);
        fwrite($fp, json_encode($out));
        fclose($fp);
    }

    tabelleFinitureJson($con);
    
} else {

    $data = json_decode(file_get_contents("php://input"));
    $nome = htmlentities($data->nome, ENT_QUOTES, 'UTF-8');

    switch ($_GET['type']) {
        case 'new':
            $sql="INSERT INTO tabelle_finiture (tab_id, tab_nome, tab_mark_id, tab_line_id) VALUES ('$data->id', '$nome', '$data->mark', '$data->line')";
            mysqli_query($con,$sql) or die(mysqli_error($con));
            break;
        case 'delete':
            $sql="DELETE FROM tabelle_finiture WHERE tab_id='$data->id'";
            mysqli_query($con,$sql) or die(mysqli_error($con));
            break;
        case 'update':
            $sql="UPDATE tabelle_finiture SET tab_nome='$nome', tab_mark_id='$data->mark' , tab_line_id='$data->line' WHERE tab_id='$data->id'";
            mysqli_query($con,$sql) or die(mysqli_error($con));
            break;
    }
}

echo "DONE";

mysqli_close($con);

