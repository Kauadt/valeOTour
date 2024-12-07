<?php

include_once ('../conexao.php');

$postjson = json_decode(file_get_contents('php://input'), true);

$query = $pdo->prepare("SELECT *, (SELECT AVG(qtd_estrela_avaliacao_pt) FROM avaliacoes_ponto_turisticos WHERE id_ponto_turistico = pt.id_ponto_turistico) AS media_estrelas FROM pontos_turisticos pt INNER JOIN verificacoes_pontos_turisticos vpt ON vpt.id_ponto_turistico = pt.id_ponto_turistico WHERE vpt.status_verificacao_pt = 'Aprovado'");

$query->execute();

$res = $query->fetchAll(PDO::FETCH_ASSOC);



for ($i = 0; $i < count($res); $i++) {
    $dados[] = array(
        'placeID' => $res[$i]['id_ponto_turistico'],
        'placeName' => $res[$i]['nome_pt'],
        'imagePath' => $res[$i]['foto_principal_pt'],
        'type' => $res[$i]['tipo_pt'],
        'longitude' => $res[$i]['longitude_pt'],
        'latitude' => $res[$i]['latitude_pt'],
        'totalStars' => $res[$i]['media_estrelas'],
        'city' => $res[$i]['cidade_pt'],
        'bairro' => $res[$i]['bairro_pt'],
        'street' => $res[$i]['rua_pt'],
    );

}


if (count($res) > 0) {
    $result = json_encode(array('success' => true, 'result' => @$dados));
} else {
    $result = json_encode(array('success' => false, 'result' => '0'));
}

echo $result;

?>