<?php

include_once ('../conexao.php');

$postjson = json_decode(file_get_contents('php://input'), true);

$query = $pdo->prepare("SELECT u.*, g.*, COALESCE(AVG(a.qtd_estrela_avaliacao_guia), 0) AS totalStars FROM usuarios u INNER JOIN guias g ON u.id_usuario = g.id_usuario LEFT JOIN avaliacoes_guia a ON a.id_guia = g.id_guia WHERE u.tipo_usuario = 'Guia' GROUP BY u.id_usuario, g.id_guia ORDER BY g.id_usuario DESC");

$query->execute();

$res = $query->fetchAll(PDO::FETCH_ASSOC);



for ($i = 0; $i < count($res); $i++) {
    $dados[] = array(
        'guiaID' => $res[$i]['id_guia'],
        'guiaCadastur' => $res[$i]['cadastur_guia'],
        'userID' => $res[$i]['id_usuario'],
        'guiaCity' => $res[$i]['cidade_guia'],
        'guiaName' => $res[$i]['nome_usuario'],
        'imagePath' => $res[$i]['caminho_imagem_usuario'],
        'eixo' => $res[$i]['eixo_guia'],
        'totalStars' => $res[$i]['totalStars'],

    );

}


if (count($res) > 0) {
    $result = json_encode(array('success' => true, 'result' => @$dados));
} else {
    $result = json_encode(array('success' => false, 'result' => '0'));
}

echo $result;

?>