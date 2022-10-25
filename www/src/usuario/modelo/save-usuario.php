<?php

// Obter a nossa conexão com o banco de dados
include('../../conexao/conn.php');

// Obter os dados enviados do formulário via $_REQUEST
$requestData = $_REQUEST;

// Verificação de campo obrigatórios do formulário
if (empty($requestData['NOME'])) {
    // Caso a variável venha vazia eu gero um retorno de erro do mesmo
    $dados = array(
        "tipo" => 'error',
        "mensagem" => 'Existe(m) campo(s) obrigatório(s) não preenchido(s).'
    );
}else{
    // Caso não exista campo em vazio, vamos gerar a requisição
    $ID = isset($requestData['ID']) ? $requestData['ID'] : '';
    $operacao = isset($requestData['operacao']) ? $requestData['operacao'] : '';

    // Verifica se é para cadastrar um novo registro
    if ($operacao == 'insert') {
        // Prepara o comando INSERT para ser executado
        try {
            $stmt = $pdo->prepare('INSERT INTO USUARIO (NOME, CELULAR, LOGIN, SENHA, TIPO_ID) VALUES (:a, :b, :c, :d, :e)');
            $stmt->execute(array(
                ':a' => $requestData['NOME'],
                ':b' => $requestData['CELULAR'],
                ':c' => $requestData['LOGIN'],
                ':d' => md5($requestData['SENHA']),
                ':e' => $requestData['TIPO_ID']
            ));
            $dados = array(
                "tipo" => 'success',
                "mensagem" => 'Registro salvo com sucesso.'
            );
        } catch (PDOException $e) {
            $dados = array(
                "tipo" => 'error',
                "mensagem" => 'Não foi possível efetuar o cadastro do curso.'
            );
        }
    } else {
        // Se minha variável operação estiver vazia então devo gerar os scripts de update
        try {
            $stmt = $pdo->prepare('UPDATE USUARIO SET NOME = :a, CELULAR = :b, LOGIN = :c, SENHA = :d, TIPO_ID = :e WHERE ID = :id');
            $stmt->execute(array(
                ':id' => $ID,
                ':a' => $requestData['NOME'],
                ':b' => $requestData['CELULAR'],
                ':c' => $requestData['LOGIN'],
                ':d' => md5($requestData['SENHA']),
                ':e' => $requestData['TIPO_ID']
            ));
            $dados = array(
                "tipo" => 'success',
                "mensagem" => 'Registro atualizado com sucesso.'
            );
        } catch (PDOException $e) {
            $dados = array(
                "tipo" => 'error',
                "mensagem" => 'Não foi possível efetuar o alteração do registro.'
            );
        }
    }
}

// Converter um array de dados para a representação JSON
echo json_encode($dados);
