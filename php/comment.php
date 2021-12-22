<?php
require 'startMySQL.php';
session_start();

$userCommented = $_SESSION['username'];
$user = trim(htmlentities($_POST['user']));
$comment = trim(htmlentities($_POST['comment']));

$stmt=$mysqli->prepare("insert into comments (user, userCommented, comment)
						values (?,?,?)");

$stmt->bind_param('sss',$user, $userCommented, $comment);
$stmt->execute();
$stmt->close();

echo json_encode(array(
    "userCommented"=> $userCommented,
    "comment"=>$comment
    
));
exit;

?>