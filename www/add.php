<?php
include "conn.php";

$uid = $_GET['UID'];

$sql = "SELECT UID FROM user WHERE UID = '$uid'";
$result = $pdo->query($sql);
$comp = $result->fetch();

if ($comp['UID'] != $uid) {
    echo "CAD";
    $pdo->query("INSERT INTO user (UID) VALUES ('$uid');");
} else {
    echo "JCAD";
}
