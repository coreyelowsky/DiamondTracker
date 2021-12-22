<?php
require 'startMySQL.php';
session_start();

$sID = trim(htmlentities($_POST['sID']));


$stmt = $mysqli->prepare("delete from stories where pk_ID=?");
$stmt->bind_param('s', $sID);
$stmt->execute();
$stmt->close();

echo json_encode(array(
         "sid"=> $sID
         
   
    ));
    exit;



?>