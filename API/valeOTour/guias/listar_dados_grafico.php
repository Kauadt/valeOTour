<?php

include_once('../conexao.php');

$postjson = json_decode(file_get_contents('php://input'), true);

$guiaID = $_GET['id'];

$query = $pdo->prepare("SELECT YEAR(data_agendamento) AS ano, MONTHNAME(data_agendamento) AS mes_nome, COUNT(*) AS quantidade_agendamentos FROM agendamentos_guia WHERE id_guia = $guiaID AND status_agendamento = 'Aceito' GROUP BY ano, MONTH(data_agendamento) ORDER BY ano, MONTH(data_agendamento)");

$query->execute();

$res = $query->fetchAll(PDO::FETCH_ASSOC);



for ($i = 0; $i < count($res); $i++) {
    $dados[] = array(
        'year' => $res[$i]['ano'],
        'month' => $res[$i]['mes_nome'],
        'countScheduling' => $res[$i]['quantidade_agendamentos'],
    );
}


if (count($res) > 0) {
    $result = json_encode(array('success' => true, 'result' => @$dados));
} else {
    $result = json_encode(array('success' => false, 'result' => '0'));
}

echo $result;

?>