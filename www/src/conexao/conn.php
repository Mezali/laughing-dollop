<?php

$hostname = "banco";
$dbname = "banco";
$username = "root";
$password = "242704";

try{
    $pdo = new PDO('mysql:host='.$hostname.';dbname='.$dbname, $username, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    //echo 'conexão realizada com sucesso!';
} catch (PDOException $e){
    echo 'Error: '.$e->getMessage();
}