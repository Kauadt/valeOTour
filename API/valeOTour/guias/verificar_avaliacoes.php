<?php

include_once('../conexao.php');

$postjson = json_decode(file_get_contents('php://input'), true);

$guiaID = @$_GET['guiaID'];
$userID = @$_GET['userID'];

$query = $pdo->prepare("SELECT *, COUNT(*) AS commentCount FROM avaliacoes_guia WHERE id_guia = $guiaID AND id_usuario = $userID");

$query->execute();

$res = $query->fetchAll(PDO::FETCH_ASSOC);

$dados = [];

foreach ($res as $row) {
    $dados[] = array(       
        'idRating' => $row['id_avaliacao_guia'],
        'comment' => $row['comentario_avaliacao_guia'],
        'commentCount' => $row['commentCount'],
        'stars' => $row['qtd_estrela_avaliacao_guia'],
    );
    
}

if (count($res) > 0) {
    $result = json_encode(array('success' => true, 'dados' => $dados));
} else {
    $result = json_encode(array('success' => false, 'dados' => '0'));
}

echo $result;

?>