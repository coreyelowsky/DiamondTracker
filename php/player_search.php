<?php
require 'startMySQL.php';
session_start();

 
$lastname = trim(htmlentities($_POST['lastname']));




if( (is_null($lastname) || $lastname =="")  || (is_null($lastname) || $lastname =="") ){
	
    echo json_encode(array(
         "search_message"=> "You have left the search field empty",
         "search_success"=>false
    ));
    exit;

}else{

	$stmt = $mysqli->prepare("select nameFirst,nameLast, playerID from master where nameLast = ? order by nameFirst");
	
	$stmt->bind_param('s', $lastname);

	$stmt->execute();

	$stmt->bind_result($first_name, $last_name, $playerID);

	$players = array();
	$playerIDs = array();

	$index = 0;
	 while($stmt->fetch()){

	 	$full_name = $first_name." ".$last_name;
	 	$players[$index] = $full_name;
	 	$playerIDs[$index] = $playerID;
		$index = $index + 1;
	 }

	 $stmt->close();
	
	 //check for players with same name
	 for($i=1; $i<sizeof($players); $i=$i+1){
	 	if($players[$i]==$players[$i-1]){
	 	
	 		$stmt = $mysqli->prepare("select name from teams join appearances on (teams.teamID=appearances.teamID)
	 								  where playerID=? group by appearances.teamID order by count(*) DESC limit 1");
			$stmt->bind_param('s', $playerIDs[$i-1]);
			$stmt->execute();
			$stmt->bind_result($team_name);
				 
			while($stmt->fetch()){
				$players[$i-1] = $players[$i-1]."  (".$team_name.")";
			}
            $stmt-> close();
            
            if($i == (sizeof($players)-1)){
            	$stmt = $mysqli->prepare("select name from teams join appearances on (teams.teamID=appearances.teamID)
	 								  where playerID=? group by appearances.teamID order by count(*) DESC limit 1");
				$stmt->bind_param('s', $playerIDs[$i]);
				$stmt->execute();
				$stmt->bind_result($team_name1);
				 
				while($stmt->fetch()){
					$players[$i] = $players[$i]."  (".$team_name1.")";
				}
            	$stmt-> close();
            }else{

            	if($players[$i] != $players[$i+1]){
            		$stmt = $mysqli->prepare("select name from teams join appearances on (teams.teamID=appearances.teamID)
	 								  where playerID=? group by appearances.teamID order by count(*) DESC limit 1");
					$stmt->bind_param('s', $playerIDs[$i]);
					$stmt->execute();
					$stmt->bind_result($team_name_2);
					while($stmt->fetch()){
						$players[$i] = $players[$i]."  (".$team_name_2.")";
					}
           			$stmt-> close();
            	}
			}        
	 	}
	}


	echo json_encode(array(
         "search_success"=>true,
          "players"=>$players,
          "playerID"=>$playerIDs
	));
    exit;


}	
	


?>