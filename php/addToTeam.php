<?php
require 'startMySQL.php';
session_start();

if(is_null($_SESSION['username'])){
	$_SESSION['username']="guest";
}

if($_SESSION['username']=="guest"){
	echo json_encode(array(
	"add_success"=> false,
	"add_message"=> "Guests do not have a team."
	));
exit;
}


$pID = trim(htmlentities($_POST['pID']));

$stmt = $mysqli->prepare("select playerID from teamplayers where user=?");

$stmt->bind_param('s', $_SESSION['username']);

$stmt->execute();

$stmt->bind_result($players);
 
while($stmt->fetch()){
	
	if($players == $pID){
        $stmt->close();
        echo json_encode(array(
            "add_message"=> "That player is already on your team.",
            "add_success"=> false
        ));
        exit;
     }
 }

 $stmt->close();


$stmt = $mysqli->prepare("insert into teamplayers (user, playerID) values (?, ?)");

$stmt->bind_param('ss', $_SESSION['username'], $pID);
  
$stmt->execute();

$stmt->close();

echo json_encode(array(
	"add_success"=> true,
	"add_message"=> "You have successdully added a player!"
));
exit;

?>