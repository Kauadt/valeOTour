<?php

include_once('../conexao.php');

$postjson = json_decode(file_get_contents('php://input'), true);

$id = @$_GET['id'];

$query = $pdo->prepare("SELECT ag.*, u.nome_usuario FROM agendamentos_guia ag INNER JOIN guias g ON ag.id_guia = g.id_guia INNER JOIN usuarios u ON g.id_usuario = u.id_usuario WHERE ag.id_usuario = $id AND status_agendamento = 'Aceito' LIMIT 3");

$query->execute();

$res = $query->fetchAll(PDO::FETCH_ASSOC);

$dados = [];
$total_registros = 0;

foreach ($res as $row) {
    $dados[] = array(       
        'schedulingID' => $row['id_agendamento'],
        'guiaName' => $row['nome_usuario'],
        'date' => $row['data_agendamento'],
    );
    
}

if (count($res) > 0) {
    $result = json_encode(array('success' => true, 'dados' => $dados));
} else {
    $result = json_encode(array('success' => false, 'resultado' => '0'));
}

echo $result;

?>