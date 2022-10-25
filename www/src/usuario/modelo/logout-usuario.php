<?php

    session_start();

    session_destroy();

   $dados = array(
     'tipo' => 'success',
     'mensagem' => 'Sessão encerrada.'
  );

  echo json_encode($dados);