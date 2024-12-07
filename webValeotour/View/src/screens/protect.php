<?php

    //Inicia a sessão caso não exista
    if(!isset($_SESSION)){
        session_start();
    }

    //Caso não exista a variável ID na sessão, a sessão não está validada, e fará vc voltar para o login
    if(!isset($_SESSION['id'])) {
        die("O seu login não foi validado, volte para pagina de <a href='./login.php'>LOGIN</a>");
    }

?>