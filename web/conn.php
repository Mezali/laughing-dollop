<?php
try {
    $pdo = new PDO("mysql:host=localhost;dbname=banquinho", "root", "");
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    die("ERROR: Could not connect. " . $e->getMessage());
}
// bosta de php, odeio php, não gosto de php