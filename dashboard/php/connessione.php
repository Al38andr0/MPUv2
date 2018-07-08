<?php
if($_SERVER['SERVER_ADDR'] == '127.0.0.1')
{
    $db_server = "127.0.0.1" ;
    $db_database = "root" ;
    $db_name = "mobiliperu_db" ;
    $db_pw = "" ;
} else {
    $db_server = "localhost" ;
    $db_database = "mobiliperu_db" ;
    $db_name = "mobiliperu_db" ;
    $db_pw = "xORVjMX0" ;
}

$con= mysqli_connect($db_server,$db_database,$db_pw, $db_name);
mysqli_set_charset($con, "UTF8");

if (!$con)
  {
  die('Could not connect: ' . mysqli_error($con));
  }
mysqli_select_db($con, $db_name) or die( mysqli_error($con));