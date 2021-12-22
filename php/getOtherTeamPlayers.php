<?php
require 'startMySQL.php';
session_start();

$user = trim(htmlentities($_POST['user']));
 

$stmt=$mysqli->prepare("select master.nameFirst, master.nameLast 
						from teamplayers
						join master on (teamplayers.playerID = master.playerID)
						where user =?");

$stmt->bind_param('s',$user);
$stmt->execute();

$stmt->bind_result($firstName, $lastName);

$names= array();
$count =0;

while($stmt->fetch()){

	$names[$count] = $firstName." ".$lastName;
	$count =$count+1;
}
$stmt->close();

$stmt=$mysqli->prepare("select comment, userCommented from comments
						where user=?");


$stmt->bind_param('s',$user);
$stmt->execute();
$stmt->bind_result($comments, $usersCommented);
$commentsArray= array();
$usersCommentedArray= array();
$count =0;
while($stmt->fetch()){
	$commentsArray[$count]	= $comments;
	$usersCommentedArray[$count] = $usersCommented;
	
	$count =$count+1;
}

 echo json_encode(array(
         "players"=> $names,
         "user"=>$user,
         "session_user"=>$_SESSION['username'],
         "comments"=>$commentsArray,
         "usersCommented"=>$usersCommentedArray
    ));
    exit;


?>