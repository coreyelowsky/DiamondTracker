<?php
require 'startMySQL.php';
session_start();

if($_SESSION['username']=="guest"){

	echo json_encode(array(
         "otherSuccess"=> false
   
    ));
    exit;
}

$stmt=$mysqli->prepare("select username from users");

 $stmt->execute();
 $stmt->bind_result($users);

$names= array();
$count =0;

while($stmt->fetch()){

	$names[$count] = $users;
	$count =$count+1;
}
$stmt->close();

 echo json_encode(array(
         "otherSuccess"=> true,
         "users"=> $names
    ));
    exit;


?>