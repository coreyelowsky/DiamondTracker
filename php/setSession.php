<?php
require 'startMySQL.php';
session_start();


$_SESSION['username']="guest";



echo json_encode(array(
         "session"=> $_SESSION['username']
         
    ));
    exit;

?>