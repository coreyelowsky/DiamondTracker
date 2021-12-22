<?php
require 'startMySQL.php';
session_start();

$pID = trim(htmlentities($_POST['pID']));

$stmt = $mysqli->prepare("delete from teamplayers where user =? and playerID = ?");
	
$stmt->bind_param('ss',  $_SESSION['username'], $pID);

$stmt->execute();

$stmt->close();

echo json_encode(array(
         "delete_message"=>"Successfully Delete Player",
         "pID"=> $pID
       
 	));
 exit;
?>