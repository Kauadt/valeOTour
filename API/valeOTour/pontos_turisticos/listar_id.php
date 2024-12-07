<?php 

include_once('../conexao.php');

$postjson = json_decode(file_get_contents('php://input'), true);

$id = @$_GET['id'];

$query = $pdo->prepare("SELECT pt.*, fpt.*, IFNULL((SELECT AVG(qtd_estrela_avaliacao_pt) FROM avaliacoes_ponto_turisticos WHERE id_ponto_turistico = pt.id_ponto_turistico), 0) AS media_estrelas FROM pontos_turisticos pt INNER JOIN fotos_pontos_turisticos fpt ON pt.id_ponto_turistico = fpt.id_ponto_turistico LEFT JOIN avaliacoes_ponto_turisticos apt ON pt.id_ponto_turistico = apt.id_ponto_turistico WHERE pt.id_ponto_turistico = $id");


$query->execute();

$res = $query->fetchAll(PDO::FETCH_ASSOC);

for ($i=0; $i < count($res); $i++) { 
    foreach ($res[$i] as $key => $value) {
    }


    $dados = array(        
        'placeID' => $res[$i]['id_ponto_turistico'],
        'placeName' => $res[$i]['nome_pt'],
        'imagePath' => $res[$i]['foto_principal_pt'],
        'description' => $res[$i]['descricao_pt'],
        'street' => $res[$i]['rua_pt'],
        'bairro' => $res[$i]['bairro_pt'],
        'numero' => $res[$i]['numero_pt'],
        'city' => $res[$i]['cidade_pt'],
        'telefone' => $res[$i]['telefone_pt'],
        'stars' => $res[$i]['media_estrelas'],
        'type' => $res[$i]['tipo_pt'],
        'longitude' => $res[$i]['longitude_pt'],
        'latitude' => $res[$i]['latitude_pt'],

    );
}

if(count($res) > 0){
    $result = json_encode(array('success'=>true, 'dados'=>$dados));
}else{
    $result = json_encode(array('success'=>false, 'resultado'=>'0'));
}

echo $result;

?>