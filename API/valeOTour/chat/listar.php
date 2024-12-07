<?php

include_once ('../conexao.php');

$postjson = json_decode(file_get_contents('php://input'), true);

$query = $pdo->prepare("SELECT * FROM canais_chat");

$query->execute();

$res = $query->fetchAll(PDO::FETCH_ASSOC);



for ($i = 0; $i < count($res); $i++) {
    $dados[] = array(
        'guiaID' => $res[$i]['id_guia'],
        'channelName' => $res[$i]['nome_canal'],
        'userID' => $res[$i]['id_usuario'],
    );

}


if (count($res) > 0) {
    $result = json_encode(array('success' => true, 'result' => @$dados));
} else {
    $result = json_encode(array('success' => false, 'result' => '0'));
}

echo $result;

?>