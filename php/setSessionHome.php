<?php
require 'startMySQL.php';
session_start();


if(is_null($_SESSION['username'])){
	$_SESSION['username']='guest';
}



echo json_encode(array(
         "session"=> $_SESSION['username']
         
    ));
    exit;

?>