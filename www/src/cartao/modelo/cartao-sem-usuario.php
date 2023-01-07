<?php

include('../../conexao/conn.php');

$sql = "SELECT CARTAO FROM USUARIO WHERE CARTAO != ''";
$sql = $pdo->prepare($sql);
$sql->execute();
$resultado = $sql->fetchAll(PDO::FETCH_ASSOC);

$uids = [];

foreach ($resultado as $r) {

    $uids[] = $r['CARTAO'];

}

$sql = "SELECT UID FROM CARTAO WHERE UID != '' ";

foreach ($uids as $u) {

    $sql .= "AND UID != ? ";

}

$sql = $pdo->prepare($sql);
$sql->execute($uids);
$dados = $sql->fetchAll(PDO::FETCH_ASSOC);

echo json_encode($dados);