<?php
header("Content-type:application/json");
header("Access-Control-Allow-Origin: *");
$post = json_decode(file_get_contents('php://input'));
$array = json_decode(json_encode($post), True);

$to = $array['userEmail'];
$subject = "You just booked a table";

$message = "
<html>
<head>
<title>Confirmation E-mail</title>
</head>
<body>
<table>
<tr>
<p> Your name: " . $array['userName'] . " </p>
<p> Your telephone number: " . $array['userTelephone'] . " </p>
<p> Time: " . $array['time'] . " </p>
<p> Date: " . $array['date'] . " </p>
<p> Guests: " . $array['guests'] . " </p>
<p> Link to cancel: localhost:3000/cancel?id=" . $array['hash'] . "</p>
</tr>
</table>
</body>
</html>
";

// Always set content-type when sending HTML email
$headers = "MIME-Version: 1.0" . "\r\n";
$headers .= "Content-type:text/html;charset=UTF-8" . "\r\n";

// More headers
$headers .= 'From: <noreply@restaurant.com>' . "\r\n";

mail($to,$subject,$message,$headers);
echo json_encode($array);
?>
