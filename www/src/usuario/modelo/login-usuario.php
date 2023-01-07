<?php

include('../../conexao/conn.php');

$sql = $pdo->query("SELECT *, count(ID) as achou FROM 
USUARIO WHERE LOGIN ='".$_REQUEST['LOGIN']."'AND 
SENHA ='".($_REQUEST['SENHA'])."'");

while ($resultado = $sql->fetch(PDO::FETCH_ASSOC)) {
if($resultado['achou'] == 1){
 session_start();
   $_SESSION['NOME'] = $resultado ['NOME'];
   $_SESSION['LOGIN'] = $resultado ['LOGIN'];
   $_SESSION['TIPO'] = $resultado ['TIPO_ID'];
   $_SESSION['CARTAO'] = $resultado ['CARTAO'];
   $dados = array(
    'tipo' => 'success',
    'mensagem' => 'Login correto.',
    'user' => $_SESSION['TIPO']
 );
 }else{
   $dados = array(
    'tipo' => 'error',
    'mensagem' => 'Login e/ou senha incorretos.'
    );
  }
}

echo json_encode($dados);