<?php

    //Inicia a sessão caso não exista
if(!isset($_SESSION)) {
    session_start();
}

//Finaliza a sessão existente
session_destroy();

//Volta para a tela inicial do site
header("Location: ../../index.php");

?>