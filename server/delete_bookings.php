<?php
require_once('db.php');

$post = json_decode(file_get_contents('php://input'));
$array = json_decode(json_encode($post), True);


/* We select all the content from bookings. */
$statement = $pdo->prepare("DELETE FROM bookings WHERE bookingID = :bookingID");
$statement->execute(array(
  ":bookingID"     => $array[itemToDelete]
  )
);
$posts = $statement->fetchAll(PDO::FETCH_ASSOC);

/* In order for JavaScript to receive the MySQL-data we need to echo the
response. Also it is decoded from an associative array to JSON. */
echo json_encode($posts);
?>
