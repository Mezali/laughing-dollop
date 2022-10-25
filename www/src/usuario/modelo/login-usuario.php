<?php

// include('../../conexao/conn.php');

// $sql = $pdo->query("SELECT *, count(ID) as achou FROM 
// USUARIO WHERE LOGIN ='".$_REQUEST['LOGIN']."'AND 
// SENHA ='".md5($_REQUEST['SENHA'])."'");

// while ($resultado = $sql->fetch(PDO::FETCH_ASSOC)) {
// if($resultado['achou'] == 1){
//  session_start();
//    $_SESSION['NOME'] = $resultado ['NOME'];
//    $_SESSION['TIPO'] = $resultado ['TIPO_ID'];
//    $dados = array(
//     'tipo' => 'success',
//     'mensagem' => 'Login correto.'
//  );
//  }else{
//    $dados = array(
//     'tipo' => 'error',
//     'mensagem' => 'Login e/ou senha incorretos.'
//     );
//   }
// }

// echo json_encode($dados);