<?php

    include('../../conexao/conn.php');

    $sql = "SELECT * FROM TIPO ORDER BY NOME DESC";

    $resultado = $pdo->query($sql);

    if($resultado){
        while($row = $resultado->fetch(PDO::FETCH_ASSOC)){
            $dados[] = array_map(null, $row);
        }
    }

    echo json_encode($dados);