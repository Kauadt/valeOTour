<?php 
include_once('../conexao.php');

$postjson = json_decode(file_get_contents('php://input'), true);

$id = @$_GET['id'];

$query = $pdo->query("DELETE FROM usuarios WHERE id_usuario = '$id'");

if ($query) {
    $result = json_encode(array('success' => true));
} else {
    $result = json_encode(array('success' => false));
}

echo $result;
?>