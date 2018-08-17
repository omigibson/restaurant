<?php
require_once('db.php');
/* We select all the content from bookings. */
$statement = $pdo->prepare("SELECT *
  FROM bookings
  INNER JOIN customers ON bookings.userID");
$statement->execute();
$posts = $statement->fetchAll(PDO::FETCH_ASSOC);

/* In order for JavaScript to receive the MySQL-data we need to echo the
response. Also it is decoded from an associative array to JSON. */
echo json_encode($posts);
?>
