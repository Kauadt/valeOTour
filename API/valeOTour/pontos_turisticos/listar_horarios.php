<?php

include_once ('../conexao.php');

$postjson = json_decode(file_get_contents('php://input'), true);

$id = @$_GET['id'];

$query = $pdo->prepare("SELECT * FROM horario_funcionamento WHERE id_ponto_turistico = $id");

$query->execute();

$res = $query->fetchAll(PDO::FETCH_ASSOC);



for ($i = 0; $i < count($res); $i++) {
    $dados[] = array(
        'timeID' => $res[$i]['id_horario'],
        'day' => $res[$i]['dia_da_semana'],
        'openingTime' => $res[$i]['hora_abertura'],
        'closingTime' => $res[$i]['hora_fechamento'],
        'status' => $res[$i]['status_funcionamento'],
    );

}


if (count($res) > 0) {
    $result = json_encode(array('success' => true, 'result' => @$dados));
} else {
    $result = json_encode(array('success' => false, 'result' => '0'));
}

echo $result;

?>