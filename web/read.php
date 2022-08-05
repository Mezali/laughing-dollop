<?php
ini_set('error_reporting', E_ALL);
ini_set('display_errors', 1);

include "conn.php";

$uid = $_GET['UID'];

$sql = "SELECT pass FROM user WHERE UID = '$uid'";
$result = $pdo->query($sql);
$r = $result->fetch();
$nPass = $r['pass'];

if ($nPass == 0) {
  echo "negado";
} else {
  $update = "UPDATE user SET pass= pass - 1 WHERE UID = '$uid'";
  $resultado = $pdo->query($update);
  echo $nPass - 1;
}

unset($pdo);
