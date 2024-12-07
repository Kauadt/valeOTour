<?php
include_once('../conexao.php');

$postjson = json_decode(file_get_contents("php://input"), true);

try {
	$pdo->beginTransaction();

	$query = $pdo->prepare("UPDATE agendamentos_guia SET status_agendamento = :status_agendamento WHERE id_agendamento = :id_agendamento");

	$query->bindValue(":id_agendamento", $postjson['id']);
	$query->bindValue(":status_agendamento", $postjson['status']);
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