<?php

include "../conexao/conn.php";

$uid = $_GET['UID'];

$sql = "SELECT UID FROM CARTAO WHERE UID = '$uid'";
$result = $pdo->query($sql);
$comp = $result->fetch();

if ($comp['UID'] != $uid) {
    echo "Seu cartão foi cadastrado com sucesso!";
    $pdo->query("INSERT INTO CARTAO (UID, pass) VALUES('$uid', 0);");
} else {
    echo "Seu cartão já está cadastrado";
}