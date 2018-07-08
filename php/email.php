<?php
include('../dashboard/php/connessione.php');

$data = json_decode(file_get_contents("php://input"));
require '../PHPMailer/PHPMailerAutoload.php';
$mail = new PHPMailer;
//$mail->IsSendmail();
$mail->From = 'info@mobiliperufficio.com';

$mail->IsSMTP(); // telling the class to use SMTP
$mail->SMTPAuth   = true;                  // enable SMTP authentication
$mail->Host       = "mail.mobiliperufficio.com"; // sets the SMTP server
$mail->Port       = 25;                    // set the SMTP port for the GMAIL server
$mail->Username   = "info@mobiliperufficio.com"; // SMTP account username
$mail->Password   = "Nv3y488WD";        // SMTP account password

$mail->isHTML(true);
$mail->CharSet = "UTF-8";

if($data->type === 'menu') {
    $mail->FromName = $data->from;
    $mail->addAddress($data->to);
    $mail->addBCC('info@mobiliperufficio.com', 'mobiliperufficio.com');
	$mail->SetFrom('info@mobiliperufficio.com', 'mobiliperufficio.com');
	$mail->AddReplyTo('info@mobiliperufficio.com', 'mobiliperufficio.com');
    $mail->Subject = $data->from . ' suggerisce mobiliperufficio.com';
    $mail->Body    = $data->from . ' ha condiviso <a href="http://mobiliperufficio.com" target="_blank">mobiliperufficio.com</a> con te.';
    $mail->AltBody = $data->from . ' ha condiviso mobiliperufficio.com con te. Visitaci a questo indirizzo: http://mobiliperufficio.com';
}

if($data->type === 'dwg') {
    $mail->FromName = $data->nome;
    $mail->addAddress('info@mobiliperufficio.com');
	$mail->SetFrom('info@mobiliperufficio.com', 'mobiliperufficio.com');
	$mail->AddReplyTo('info@mobiliperufficio.com', 'mobiliperufficio.com');
    $mail->Subject = 'Richiesta modelli DWG per la linea ' . $data->linea;
    $mail->Body    = $data->nome . ' richiede i modelli DWG per la linea ' . $data->linea . ' al seguente indirizzo di posta: ' . $data->from . ' o al numero di telefono: ' . $data->tel;
    $mail->AltBody = $data->nome . ' richiede i modelli DWG per la linea ' . $data->linea . ' al seguente indirizzo di posta: ' . $data->from . ' o al numero di telefono: ' . $data->tel;
}

if($data->type === 'prodotti') {
    $mail->FromName = $data->from;
    $mail->addAddress($data->to);
    $mail->addBCC('info@mobiliperufficio.com', 'mobiliperufficio.com');
	$mail->SetFrom('info@mobiliperufficio.com', 'mobiliperufficio.com');
	$mail->AddReplyTo('info@mobiliperufficio.com', 'mobiliperufficio.com');
    $mail->Subject = $data->from . ' suggerisce questa pagina da mobiliperufficio.com';
    $mail->Body    = $data->from . ' ha condiviso <a href="http://mobiliperufficio.com' . $data->path . '" target="_blank">questa pagina </a>.';
    $mail->AltBody = $data->from . ' ha condiviso questa pagina da mobiliperufficio.com, al seguente indirizzo: http://mobiliperufficio.com' . $data->path;
}

if($data->type === 'request') {
    $info = $data->data;
    $mail->SetFrom($info->e, $info->n);
    if(!$info->p && $info->u == 'mobiliperufficio.com') {
        $mail->addAddress('info@mobiliperufficio.com');
        $provincia = NULL;
    }
    if(!$info->p && $info->u != 'mobiliperufficio.com') {
        $mail->addAddress($info->r, $info->u);
        $mail->addBCC('info@mobiliperufficio.com', 'mobiliperufficio.com');
        $provincia = NULL;
    };
    if($info->p) {
        $resultRiv = mysqli_query($con, "SELECT riv_email, riv_nome FROM rivenditori WHERE riv_prov = " . $info->p);
        if(mysqli_num_rows($resultRiv) == 1) {
            while($rowRiv = mysqli_fetch_array($resultRiv)) {
                $emailRiv = $rowRiv['riv_email'];
                $nomeRiv = htmlentities($rowRiv['riv_nome']);
                $mail->addAddress($emailRiv, $nomeRiv);
            }
        } else {
            $mail->addAddress('info@mobiliperufficio.com');
            $mail->SetFrom('info@mobiliperufficio.com', 'mobiliperufficio.com');
        }
        $resultPrv = mysqli_query($con, "SELECT provincia FROM province WHERE provincia_id = " . $info->p);
        while($rowPrv = mysqli_fetch_array($resultPrv)) {
            $provincia = "(" . htmlentities($rowPrv['provincia']) . ")";
        }
    };
    $mail->AddReplyTo($info->e, $info->n);
    $mail->FromName = $info->e;
    $mail->Subject = 'mobiliperufficio.com: richiesta informazioni da ' . $info->n . ' ' . $provincia;
    if(isset($info->s) && $info->s != '') $mail->Body = $info->n . ', della società ' . $info->s . ', richiede:<br>';
    $mail->Body .= $info->t . '.<br>' . $info->o . '.<br><br>';
    $mail->Body .= 'Email: ' . $info->e . '.<br>';
    if(isset($info->h) && $info->h != '') $mail->Body .= 'Telefono: ' . $info->h;
    $mail->AltBody = $info->t . '. ' . $info->o;
}

if($data->type === 'print' || $data->type === 'preventivo') {
    $result = mysqli_query($con, "SELECT * FROM preventivi WHERE prev_cod = '$data->cod'");
    while($row = mysqli_fetch_array($result)) {
        $number = $row['prev_id'];
        $array = json_decode($row['prev_array']);
        if($array->u == 0)  { //PREVENTIVO DA MPU
            if($data->RIV != 0){ //DATA->RIV è ID rivenditore associato alla provincia scelta
                //QUI SPEDISCO EMAIL AL RIVENDITORE PRESENTE NELLA PROVINCIA SCELTA DA MPU
                $resultRiv = mysqli_query($con, "SELECT riv_email, riv_nome FROM rivenditori WHERE riv_id = " . $data->RIV);
                while($rowRiv = mysqli_fetch_array($resultRiv)) {
                    $emailRiv = $rowRiv['riv_email'];
                    $nomeRiv = htmlentities($rowRiv['riv_nome']);
                    $mail->addAddress($emailRiv, $nomeRiv);
//                    $mail->AddReplyTo($emailRiv, $nomeRiv);
                    $mail->addBCC('info@mobiliperufficio.com', 'mobiliperufficio.com');
                }
            } else {
                //SE LA PROVINCIA NON HA NESSUN RIVENDITORE ASSOCIATO L'EMAIL VIENE SPEDITA A MPU
                $mail->addAddress('info@mobiliperufficio.com', 'mobiliperufficio.com');
                $mail->AddReplyTo('info@mobiliperufficio.com', 'mobiliperufficio.com');
            }
        } else { //PREVENTIVO DA RIVENDITORE
            $resultRiv = mysqli_query($con, "SELECT riv_email, riv_nome, riv_conv FROM rivenditori WHERE riv_id = " . $array->u);
            while($rowRiv = mysqli_fetch_array($resultRiv)) {
                $riv_conv = $rowRiv['riv_conv'];
                $emailRiv = $rowRiv['riv_email'];
                $nomeRiv = htmlentities($rowRiv['riv_nome']);
                if($riv_conv !== 0) { // SE IL RIVENDITORE E' INSERITO IN UNA CONVEZIONE
                    $resultConv = mysqli_query($con, "SELECT cnv_email, cnv_nome FROM convenzioni WHERE cnv_id = " . $riv_conv);
                    while($rowConv = mysqli_fetch_array($resultConv)) {
                        $cnv_email = $rowConv['cnv_email'];
                        $cnv_nome = $rowConv['cnv_nome'];
                        if($cnv_email !== '') {
                            $mail->addBCC($cnv_email, $cnv_nome); //SPEDISCO COPIA NASCOSTA ALLA CONVEZIONE
                        }
                    }
                }
                $mail->addAddress($emailRiv, $nomeRiv);
//                $mail->AddReplyTo($emailRiv, $nomeRiv);
                $mail->addBCC('info@mobiliperufficio.com', 'mobiliperufficio.com');
                if($array->g != 0) { //SE PRESENTE L'AGENTE SPEDISCO COPIA ALLO STESSO
                    $resultAge = mysqli_query($con, "SELECT agenti_email, agenti_nome FROM agenti WHERE agenti_id = " . $array->g);
                    while($rowAge = mysqli_fetch_array($resultAge)) {
                        $emailAge = $rowAge['agenti_email'];
                        $nomeAge = htmlentities($rowAge['agenti_nome']);
                        $mail->addAddress($emailAge, $nomeAge . ' agente di ' . $nomeRiv);
                    }
                }
            }
        }
        if ($data->type === 'print') {
            $mail->FromName = 'mobiliperufficio.com';
            $mail->Subject = 'Nuovo preventivo numero ' . $number;
            $mail->Body = 'Nuovo <a href="http://mobiliperufficio.com/print/' . $data->loc . '/preventivo/' . $data->cod . '" target="_blank"> preventivo numero ' . $number . '</a>';
            $mail->AltBody = 'Nuovo preventivo numero ' . $number . ' con te. Verificalo a questo indirizzo: http://mobiliperufficio.com/print/' . $data->loc . '/preventivo/' . $data->cod;
        }
        if($data->type === 'preventivo') {
            $mail->FromName = $data->from;
            $mail->addAddress($data->to);
            $mail->Subject = $data->from . ' ha condiviso il preventivo numero ' . $number;
            $mail->Body    = $data->from . ' ha condiviso il <a href="http://mobiliperufficio.com/print/' . $data->loc . '/preventivo/' . $data->cod . '" target="_blank"> preventivo numero ' . $number . '</a>.';
            $mail->AltBody = $data->from . ' ha condiviso il preventivo numero ' . $number . '. Visitaci a questo indirizzo: http://mobiliperufficio.com/print/' . $data->loc . '/preventivo/' . $data->cod;
        }
    }
}


if($data->type === 'order') {
    $result = mysqli_query($con, "SELECT * FROM preventivi WHERE prev_cod = " . $data->ID);
    while($row = mysqli_fetch_array($result)) {
        $number = $row['ord_id'];
        $array = json_decode($row['prev_array']);
        $cliente = json_decode($row['prev_cliente']);
        $emailCliente = $cliente->e;
        $nomeCliente = $cliente->n;
        $mail->addAddress($emailCliente, $nomeCliente);//SPEDISCO COPIA AL CLIENTE
        $mail->addBCC('info@mobiliperufficio.com', 'mobiliperufficio.com');//SPEDISCO COPIA NASCOSTA A MPU
        if($array->u == 0)  { //ORDINE A MPU
            $mail->FromName = 'mobiliperufficio.com';
            $mail->SetFrom('info@mobiliperufficio.com', 'mobiliperufficio.com');
            $mail->AddReplyTo('info@mobiliperufficio.com', 'mobiliperufficio.com');
            $nomeRiv = 'mobiliperufficio.com';
            if($data->RIV != 0){ //DATA->RIV è ID rivenditore associato alla provincia scelta
                //QUI SPEDISCO EMAIL AL RIVENDITORE PRESENTE NELLA PROVINCIA SCELTA DA MPU
                $resultRiv = mysqli_query($con, "SELECT riv_email, riv_nome FROM rivenditori WHERE riv_id = " . $data->RIV);
                while($rowRiv = mysqli_fetch_array($resultRiv)) {
                    $emailRiv = $rowRiv['riv_email'];
                    $nomeRiv = htmlentities($rowRiv['riv_nome']);
                    $mail->addBCC($emailRiv, $nomeRiv);
                }
            }
        } else { //ORDINE A RIVENDITORE
            $resultRiv = mysqli_query($con, "SELECT riv_email, riv_nome, riv_conv FROM rivenditori WHERE riv_id = " . $array->u);
            while($rowRiv = mysqli_fetch_array($resultRiv)) {
                $riv_conv = $rowRiv['riv_conv'];
                $emailRiv = $rowRiv['riv_email'];
                $nomeRiv = htmlentities($rowRiv['riv_nome']);
                if($riv_conv !== 0) { // SE IL RIVENDITORE E' INSERITO IN UNA CONVEZIONE
                    $resultConv = mysqli_query($con, "SELECT cnv_email, cnv_nome FROM convenzioni WHERE cnv_id = " . $riv_conv);
                    while($rowConv = mysqli_fetch_array($resultConv)) {
                        $cnv_email = $rowConv['cnv_email'];
                        $cnv_nome = $rowConv['cnv_nome'];
                        if($cnv_email !== '') {
                            $mail->addBCC($cnv_email, $cnv_nome); //SPEDISCO COPIA NASCOSTA ALLA CONVEZIONE
                        }
                    }
                }
                $mail->FromName = $nomeRiv;
                $mail->SetFrom($emailRiv, $nomeRiv);
                $mail->AddReplyTo($emailRiv, $nomeRiv);
                $mail->addBCC($emailRiv, $nomeRiv);
                if($array->g != 0) { //SE PRESENTE L'AGENTE SPEDISCO COPIA ALLO STESSO
                    $resultAge = mysqli_query($con, "SELECT agenti_email, agenti_nome FROM agenti WHERE agenti_id = " . $array->g);
                    while($rowAge = mysqli_fetch_array($resultAge)) {
                        $emailAge = $rowAge['agenti_email'];
                        $nomeAge = htmlentities($rowAge['agenti_nome']);
                        $mail->addBCC($emailAge, $nomeAge . ' agente di ' . $nomeRiv);
                    }
                }
            }
        }
        $mail->Subject = 'Richiesta conferma d\'ordine numero ' . $number;
        $mail->Body    = 'Gentile ' . $cliente->n . ',<br/><br/>troverà in <a href="http://mobiliperufficio.com/print/' . $data->loc . '/ordine/' . $data->ID . '" target="_blank"> questa pagina</a> i dettagli della sua richiesta d\'ordine numero ' . $number . '<br/><br/> Restiamo a sua completa disposizione per informazioni, modifiche o ulteriori ordini.<br/><br/>Ringraziandola nuovamente per averci scelto, le porgiamo i nostri più cordiali saluti,<br/><br/>' . $nomeRiv;
        $mail->AltBody = 'Gentile ' . $cliente->n . ', \n\n troverà nella pagina http://mobiliperufficio.com/print/' . $data->loc . '/ordine/' . $data->ID . ' i dettagli della sua richiesta d\'ordine numero ' . $number . '\n\n Restiamo a sua completa disposizione per informazioni, modifiche o ulteriori ordini.\n\n Ringraziandola nuovamente per averci scelto, le porgiamo i nostri più cordiali saluti,\n\n ' . $nomeRiv;
    }
}

if(!$mail->send()) {
    echo 'Mailer Error: ' . $mail->ErrorInfo;
    echo 0;
} else {
    echo 1;
}
mysqli_close($con);
