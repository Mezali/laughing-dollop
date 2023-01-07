<?php

include('../../conexao/conn.php');
    
session_start();

if(!isset($_SESSION['LOGIN']) && !isset($_SESSION['TIPO_ID'])){

    $dados = array(

        'tipo' =>'error',
        'mensagem' =>'Usuário ou senha incorretos, acesso negado.'

    );
} else {

    $sql = "SELECT PASS FROM CARTAO WHERE UID = '".$_SESSION['CARTAO']."'";
    $sql = $pdo->query($sql);
    $resultado = $sql->fetch(PDO::FETCH_ASSOC);

    $_SESSION['PASS'] = $resultado['PASS'];

    $dados = array(

        'tipo' =>'success',
        'mensagem' =>'Seja bem-vindo '.$_SESSION['LOGIN'],
        'user' => $_SESSION['TIPO'],
        'nome' => $_SESSION['LOGIN'],
        'cartao' => $_SESSION['CARTAO'],
        'pass' => intval($_SESSION['PASS'])

    );
}
echo json_encode($dados);