<?php
try {
    $pdo = new PDO("mysql:host=banco;dbname=docker", "docker", "docker");
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    die("ERROR: Could not connect. " . $e->getMessage());
}
// bosta de php, odeio php, não gosto de php