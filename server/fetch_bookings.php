<?php
require_once('db.php');

$statement = $pdo->prepare("SELECT * FROM bookings");
$statement->execute();
$posts = $statement->fetchAll(PDO::FETCH_ASSOC);

echo json_encode($posts);
?>
