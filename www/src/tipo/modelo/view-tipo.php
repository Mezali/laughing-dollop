<?php

    // Inclusão do banco de dados
    include('../../conexao/conn.php');

    // Executo a recepção do id a ser buscado no banco de dados
    $ID = $_REQUEST['ID'];

    // Gero a querie de consulta no banco de dados
    $sql = "SELECT * FROM TIPO WHERE ID = $ID";

    // Executar nossa querie de consulta ao banco de dados
    $resultado = $pdo->query($sql);

    // Testar a minha consulta de banco de dados
    if($resultado){
        $dadosEixo = array();
        while($row = $resultado->fetch(PDO::FETCH_ASSOC)){
            $dadosEixo = array_map('utf8_encode', $row);
        }
        $dados = array(
            'tipo' => 'success',
            'mensagem' => '',
            'dados' => $dadosEixo
        );
    } else {
        $dados = array(
            'tipo' => 'error',
            'mensagem' => 'Não foi possível obter o registro solicitado.',
            'dados' => array()
        );
    }

    echo json_encode($dados);
