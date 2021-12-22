<?php
require 'startMySQL.php';

$username = trim(htmlentities($_POST['username']));
$password = trim(htmlentities($_POST['password']));

if( (is_null($username) || $username =="")  || (is_null($password) || $password =="") ){
	
        //if either username or password field is empty, send back an error message and exit
        
        echo json_encode(array(
            "register_message"=> "You have left a field empty",
            "register_success"=> false
        ));
        exit;

}else{ 

    // ask databases for all the registered usernames
    
    $select = $mysqli->prepare("select username from users");
    
    $select->execute();
 
    $select->bind_result($allUsers);
 
    // checks if the potential username already exists
   
    while($select->fetch()){
	
        if($allUsers == $username){
        
            // if the username alredy exists, send back an error message an exit
                
            echo json_encode(array(
            "register_message"=> "Username already exists",
            "register_success"=> false
             ));
            exit;
        }
    }

    $select->close();
 
 
    //Will only have reached this point if username and password are valid
    $stmt = $mysqli->prepare("insert into users (username, password) values (?, ?)");
  
    $hashed_pass = crypt($password);

    $stmt->bind_param('ss', $username, $hashed_pass);
 
    $stmt->execute();

    $stmt->close();
    
    

    //send back successfull registrtion message
    echo json_encode(array(
    "register_message"=> "Congratulations ".$username." you have successfully registered!",
    "register_success"=> true
    ));
    exit;
}

?>