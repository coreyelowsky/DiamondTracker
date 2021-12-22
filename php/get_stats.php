<?php
require 'startMySQL.php';
session_start();

$pID = trim(htmlentities($_POST['pID']));
$side = trim(htmlentities($_POST['side']));

$stmt = $mysqli->prepare("select distinct batting.*,teams.franchID 
						  from batting 
						  join teams on (batting.teamID=teams.teamID)	
						  where playerID = ?
						  order by yearID asc");

$stmt->bind_param('s', $pID);

$stmt->execute();

$stmt->bind_result($playerId,$year, $stint, $teamID, $lgID, $g, $g_batting,
					$ab, $r, $h, $doub, $trip, $hr, $rbi, $sb, $cs,
					$bb, $so, $ibb, $hbp, $sh, $sf, $gidp, $g_old,$fID);

$bstats = array();
$count = 0;

while($stmt->fetch()){

	$bstats[$count] = array($year, $fID,$lgID, $g, 
					$ab, $r, $h, $doub, $trip, $hr, $rbi, $sb, $cs,
					$bb, $so, $ibb, $hbp, $sh, $sf, $gidp);
	$count = $count+1;
}

$stmt-> close();

$stmt = $mysqli->prepare("select distinct pitching.*,teams.franchID 
						  from pitching 
						  join teams on (pitching.teamID=teams.teamID)	
						  where playerID = ?
						  order by yearID asc");

$stmt->bind_param('s', $pID);

$stmt->execute();

$stmt->bind_result($playerId,$year, $stint, $teamID, $lgID, $w, $l,
					$g, $gs, $cg, $sho, $sv, $ipouts, $h, $er, $hr,
					$bb, $so, $baopp, $era, $ibb, $wp,$hbp, $bk, $bfp,
					$gf, $r, $sh, $sf, $gidp,$fID);


$pstats = array();
$count = 0;

while($stmt->fetch()){

	$pstats[$count] = array($year, $fID,$lgID, $w, 
					$l, $era, $g, $gs, $gf, $cg, $sho, $sv, round($ipouts/3,1),
				$h, $r, $er, $hr, $bb, $ibb, $so, $hbp);
     $count = $count+1;
}

$stmt-> close();



$stmt1=$mysqli->prepare("select pk_ID, userPosted, title, link from stories where playerID=?");
$stmt1->bind_param('s', $pID);
$stmt1->execute();
$stmt1-> bind_result($id, $users, $titles, $links);


$titlesArray = array();
$linksArray = array();

$usersArray = array();
$ids = array();

$count = 0;
while($stmt1->fetch()){
	$titlesArray[$count]=$titles;
	$linksArray[$count]=$links;
	$usersArray[$count]=$users;
	$ids[$count] = $id;
	$count = $count+1;
}
$stmt1-> close();
echo json_encode(array(
         "bstats"=> $bstats,
         "pstats"=>$pstats,
         "side"=> $side,
         "pid"=>$pID,
         "titles"=>$titlesArray,
         "links"=>$linksArray,
         "users"=>$usersArray,
         "user"=>$_SESSION["username"],
         "ids"=>$ids
   
    ));
    exit;

?>