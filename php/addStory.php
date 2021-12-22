<?php
require 'startMySQL.php';
session_start();

$pID = trim(htmlentities($_POST['pID']));
$title = trim(htmlentities($_POST['title']));
$link = trim(htmlentities($_POST['link']));
$user = $_SESSION['username'];

if( (is_null($title) || $title =="")  || (is_null($link) || $link =="") ){
	        
        echo json_encode(array(
            "add_success"=> false,
            "add_message"=> "You have left a field empty."
            
        ));
        exit;

}else{ 


	


	$stmt = $mysqli->prepare("insert into stories (userPosted, playerID, title, link) 
							  values (?,?,?,?)");
	$stmt->bind_param('ssss', $user, $pID, $title, $link);
	$stmt->execute();
	$stmt->close();





	echo json_encode(array(
         "add_success"=> true,
         "user"=>$user,
         "title"=>$title,
         "link"=>$link,
         "id"=>mysqli_insert_id($mysqli)
        
    ));
    exit;
}






?>