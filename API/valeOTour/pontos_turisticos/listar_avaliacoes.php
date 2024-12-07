<?php

include_once('../conexao.php');

$postjson = json_decode(file_get_contents('php://input'), true);

$id = @$_GET['id'];

$query = $pdo->prepare("SELECT * FROM avaliacoes_ponto_turisticos apt INNER JOIN pontos_turisticos pt ON pt.id_ponto_turistico = apt.id_ponto_turistico INNER JOIN usuarios u ON u.id_usuario = apt.id_usuario WHERE pt.id_ponto_turistico = $id ORDER BY apt.id_avaliacao_pt DESC");

$query->execute();

$res = $query->fetchAll(PDO::FETCH_ASSOC);

$dados = [];
$total_registros = 0;

foreach ($res as $row) {
    $dados[] = array(       
        'idRating' => $row['id_avaliacao_pt'],
        'userName' => $row['nome_usuario'],
        'comment' => $row['comentario_avaliacao_pt'],
        'stars' => $row['qtd_estrela_avaliacao_pt'],
        'imagePath' => $row['caminho_imagem_usuario'],
        'date' => $row['data_avaliacao'],
    );
    
}

if (count($res) > 0) {
    $result = json_encode(array('success' => true, 'dados' => $dados));
} else {
    $result = json_encode(array('success' => false, 'resultado' => '0'));
}

echo $result;

?>