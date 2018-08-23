<?php
require_once('db.php');
$post = json_decode(file_get_contents('php://input'));
$array = json_decode(json_encode($post), True);

$statement = $pdo->prepare("DELETE FROM bookings WHERE hash = :hash");
$statement->execute(array(":hash" => $array["hash"]));

echo json_encode($array["hash"]);
