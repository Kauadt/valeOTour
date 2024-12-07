<?php

include_once('../conexao.php');

$postjson = json_decode(file_get_contents('php://input'), true);

$id = @$_GET['id'];

$query = $pdo->prepare("SELECT COUNT(*) AS total_agendamentos FROM agendamentos_guia ag WHERE ag.id_guia = $id AND ag.status_agendamento = 'Aceito'");

$query->execute();

$res = $query->fetchAll(PDO::FETCH_ASSOC);

$dados = [];
$total_registros = 0;

foreach ($res as $row) {
    $dados[] = array(       
        'countScheduling' => $row['total_agendamentos'],
    );
    
}

if (count($res) > 0) {
    $result = json_encode(array('success' => true, 'dados' => $dados));
} else {
    $result = json_encode(array('success' => false, 'resultado' => '0'));
}

echo $result;

?>