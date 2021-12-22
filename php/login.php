<?php
require 'startMySQL.php';
session_start();


$username = trim(htmlentities($_POST['username']));
$password = trim(htmlentities($_POST['password']));
  

if( (is_null($username) || $username =="")  || (is_null($password) || $password =="") ){
	
        
    echo json_encode(array(
         "login_message"=> "You have left a field empty",
         "login_success"=> false
    ));
    exit;

}else{
	
	$stmt = $mysqli->prepare("select userName,password from users");
     
    $stmt->execute();

	$stmt->bind_result($user, $hashed_pass);

	while($stmt->fetch()){
                
        if($username == $user && crypt($password, $hashed_pass)==$hashed_pass ){
                
                   
    		$_SESSION['username'] = $username;
            $stmt->close();
                        
            echo json_encode(array(
            "login_message"=> "Welcome to Diamond Tracker ".$username."!",
             "login_success" => true
            ));
     		exit;
        }	
    }	
     	$stmt->close();
       
       	$_SESSION['username'] = "guest";
         echo json_encode(array(
        "login_message"=> "Username and passowrd do not match.",
        "login_success" => false
           ));
       
} 



?>