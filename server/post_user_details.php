<?php
require_once('db.php');
/* To get the JSON-object from POST we need to use file_get_contents to
retreive them and then decode them so that PHP can understand. */
$post = json_decode(file_get_contents('php://input'));
$array = json_decode(json_encode($post), True);

/* The JSON-object is now an associative array and is injected into our SQL-database. */
$statement = $pdo->prepare(
  "INSERT INTO customers (name, email, tel)
  VALUES (:name, :email, :tel)"
  );
$statement->execute(array(
  ":name"     => $array["userName"],
  ":email"     => $array["userEmail"],
  ":tel"    => $array["userTelephone"]
));

/* The ID of the SQL-row is inserted into the associative array. */
$id = $pdo->lastInsertId();
$array['id'] = $id;

/* Before the array is sent back to JavaScript we need to encode it back to JSON.
It is then echoed back to JS. */
echo json_encode($array);
?>
