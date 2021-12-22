<?php
require 'startMySQL.php';
session_start();

if(is_null($_SESSION['username'])){
	$_SESSION['username'] = "guest";
	exit;
}

$stmt = $mysqli->prepare("select master.nameFirst, master.nameLast, master.playerID
						  from teamplayers
						  join master on (teamplayers.playerID=master.playerID)
						  where user=?");
	
$stmt->bind_param('s', $_SESSION['username']);

$stmt->execute();

$stmt->bind_result($first_name, $last_name, $id);

$ids = array();
$players = array();

$count = 0;
while($stmt->fetch()){
	$players[$count] = $first_name." ".$last_name;
	$ids[$count] = $id;
	$count = $count + 1;
}

$stmt->close();

echo json_encode(array(
         "myPlayers"=>$players,
         "pIds" => $ids,
         "user"=>$_SESSION['username']
 	));
 exit;


?>