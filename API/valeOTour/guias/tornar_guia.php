<?php
include_once('../conexao.php');

$postjson = json_decode(file_get_contents("php://input"), true);

try {
	$pdo->beginTransaction();

	$query = $pdo->prepare("UPDATE usuarios SET tipo_usuario = :tipo_usuario WHERE id_usuario = :id_usuario");

	$query->bindValue(":id_usuario", $postjson['userID']);
	$query->bindValue(":tipo_usuario", $postjson['userType']);
	$query->execute();
	$pdo->commit();

	$result = json_encode(array('success' => true));
	echo $result;


} catch (PDOException $e) {
	$pdo->rollBack();
	error_log("Erro no PDO: " . $e->getMessage());
	$result = json_encode(array('success' => false, 'error' => $e->getMessage()));
	echo $result;
}


?>