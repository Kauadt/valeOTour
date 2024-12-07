<?php

include_once('../conexao.php');

$postjson = json_decode(file_get_contents('php://input'), true);

$id = @$_GET['id'];

$query = $pdo->prepare("SELECT * FROM fotos_pontos_turisticos fpt INNER JOIN pontos_turisticos pt ON pt.id_ponto_turistico = fpt.id_ponto_turistico WHERE pt.id_ponto_turistico = $id");


$query->execute();

$res = $query->fetchAll(PDO::FETCH_ASSOC);

for ($i = 0; $i < count($res); $i++) {
    foreach ($res[$i] as $key => $value) {
    }

    $dados[] = array(
        'idImages' => $res[$i]['id_foto_pt'],
        'imagePath' => $res[$i]['caminho_imagem_pt'],
    );
}

if (count($res) > 0) {
    $result = json_encode(array('success' => true, 'dados' => $dados));
} else {
    $result = json_encode(array('success' => false, 'resultado' => '0'));
}

echo $result;

?>