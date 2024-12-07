<?php

include_once('../conexao.php');

$postjson = json_decode(file_get_contents('php://input'), true);

$placeID = @$_GET['placeID'];
$userID = @$_GET['userID'];

$query = $pdo->prepare("SELECT *, COUNT(*) AS commentCount FROM avaliacoes_ponto_turisticos WHERE id_ponto_turistico = $placeID AND id_usuario = $userID");

$query->execute();

$res = $query->fetchAll(PDO::FETCH_ASSOC);

$dados = [];
$total_registros = 0;

foreach ($res as $row) {
    $dados[] = array(       
        'idRating' => $row['id_avaliacao_pt'],
        'comment' => $row['comentario_avaliacao_pt'],
        'commentCount' => $row['commentCount'],
        'stars' => $row['qtd_estrela_avaliacao_pt'],
    );
    
}

if (count($res) > 0) {
    $result = json_encode(array('success' => true, 'dados' => $dados));
} else {
    $result = json_encode(array('success' => false, 'dados' => '0'));
}

echo $result;

?>