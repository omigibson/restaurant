<?php
header("Content-type:application/json");
header("Access-Control-Allow-Origin: *");

$pdo = new PDO(
  "mysql:host=localhost:8889;dbname=restaurant;charset=utf8",
  "root",
  "root"
);
