<?php
include_once('../conexao.php');

$postjson = json_decode(file_get_contents("php://input"), true);

try {
    $pdo->beginTransaction();
    $query = $pdo->prepare("INSERT INTO agendamentos_guia SET data_agendamento = :data_agendamento, numero_pessoas_agendamento = :numero_pessoas_agendamento, id_guia = :id_guia, latitude_agendamento = :latitude_agendamento, longitude_agendamento = :longitude_agendamento, numero_horas_agendamento = :numero_horas_agendamento, id_usuario = :id_usuario, horario_inicio_agendamento = :horario_inicio_agendamento");

    $query->bindValue(":data_agendamento", $postjson['dbDate']);
    $query->bindValue(":numero_pessoas_agendamento", $postjson['numPeople']);
    $query->bindValue(":id_guia", $postjson['guiaID']);
    $query->bindValue(":id_usuario", $postjson['userID']);
    $query->bindValue(":latitude_agendamento", $postjson['latitude']);
    $query->bindValue(":longitude_agendamento", $postjson['longitude']);
    $query->bindValue(":numero_horas_agendamento", $postjson['numHour']);
    $query->bindValue(":horario_inicio_agendamento", $postjson['dbTime']);

    $query->execute();

    $lastInsertId = $pdo->lastInsertId();
    $pdo->commit();

    $result = json_encode(array('success' => true, 'id_agendamento' => $lastInsertId));
    echo $result;

} catch (PDOException $e) {
    $pdo->rollBack();
    error_log("Erro no PDO: " . $e->getMessage());

    $result = json_encode(array('success' => false, 'error' => $e->getMessage()));
    echo $result;
}

?>
