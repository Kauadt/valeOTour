<?php 

include_once('../conexao.php');

$postjson = json_decode(file_get_contents('php://input'), true);

$id = @$_GET['id'];

$query = $pdo->prepare("SELECT * FROM usuarios u INNER JOIN guias g ON u.id_usuario = g.id_usuario WHERE u.id_usuario = $id");


$query->execute();

$res = $query->fetchAll(PDO::FETCH_ASSOC);

for ($i=0; $i < count($res); $i++) { 
    foreach ($res[$i] as $key => $value) {
    }

    $dados = array(        
        'guiaID' => $res[$i]['id_guia'],
        'guiaCadastur' => $res[$i]['cadastur_guia'],        
        'userID' => $res[$i]['id_usuario'],
        'guiaCity' => $res[$i]['cidade_guia'],
        'guiaName' => $res[$i]['nome_usuario'],
        'imagePath' => $res[$i]['caminho_imagem_usuario'], 
        'guiaBio' => $res[$i]['biografia_guia'], 
        'userType' => $res[$i]['tipo_usuario'],
        'pricePeople' => $res[$i]['taxa_pessoa_guia'],
        'priceHour' => $res[$i]['taxa_hora_guia'],

    );
}

if(count($res) > 0){
    $result = json_encode(array('success'=>true, 'dados'=>$dados));
}else{
    $result = json_encode(array('success'=>false, 'resultado'=>'0'));
}

echo $result;

?>