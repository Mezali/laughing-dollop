<?php
error_reporting(E_ERROR | E_PARSE);
try {
    $pdo = new PDO("mysql:host=database;dbname=docker", "root", "tiger");
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    die("ERROR: Could not connect. " . $e->getMessage());
}
// bosta de php, odeio php, não gosto de php