<?php

$usuario = 'root';
$senha = '';
$database = 'valeotour';
$host = 'localhost';

$mysqli = new mysqli($host, $usuario, $senha, $database);


// Definir o charset como UTF-8
if (!$mysqli->set_charset("utf8")) {
    die("Erro ao definir o charset UTF-8: " . $mysqli->error);
}

?>
