<?php

include_once('../conexao.php');

$id = @$_GET['id'];

$query = $pdo->prepare("SELECT cc.*, g.*, u.* FROM canais_chat cc INNER JOIN guias g ON cc.id_guia = g.id_usuario INNER JOIN usuarios u ON g.id_usuario = u.id_usuario WHERE cc.id_usuario = :id OR cc.id_guia = :id");
$query->bindValue(':id', $id, PDO::PARAM_INT);

$query->execute();
$res = $query->fetchAll(PDO::FETCH_ASSOC);

$dados = [];

for ($i = 0; $i < count($res); $i++) {
    $dados[] = array(
        'guiaID' => $res[$i]['id_guia'],
        'channelName' => $res[$i]['nome_canal'],
        'userID' => $res[$i]['id_usuario'],
        'channelID' => $res[$i]['id_canal_chat'],
        'userName' => $res[$i]['nome_usuario'],
    );
}

if (count($res) > 0) {
    $result = json_encode(array('success' => true, 'result' => $dados));
} else {
    $result = json_encode(array('success' => false, 'message' => 'Nenhum canal encontrado.'));
}

echo $result;
?>