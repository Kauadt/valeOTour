<?php

include_once('../conexao.php');

$postjson = json_decode(file_get_contents('php://input'), true);

$id = @$_GET['id'];

$query = $pdo->prepare("SELECT *, (SELECT AVG(qtd_estrela_avaliacao_guia) FROM avaliacoes_guia WHERE id_guia = ag.id_guia) AS media_estrelas FROM avaliacoes_guia ag INNER JOIN usuarios u ON ag.id_usuario = u.id_usuario WHERE ag.id_guia = $id");

$query->execute();

$res = $query->fetchAll(PDO::FETCH_ASSOC);

$dados = [];
$total_registros = 0;

foreach ($res as $row) {
    $dados[] = array(       
        'idComment' => $row['id_avaliacao_guia'],
        'userName' => $row['nome_usuario'],
        'comment' => $row['comentario_avaliacao_guia'],
        'stars' => $row['qtd_estrela_avaliacao_guia'],
        'imagePath' => $row['caminho_imagem_usuario'],
        'totalStars' => $row['media_estrelas'],
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