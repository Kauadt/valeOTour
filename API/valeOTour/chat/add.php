<?php
require_once("../conexao.php");

$postjson = json_decode(file_get_contents('php://input'), true);
echo json_encode($postjson);

$idUser = @$postjson['userID'];
$idGuia = @$postjson['guiaID'];
$channelName = @$postjson['channelName'];

try {
    $res = $pdo->prepare("INSERT INTO canais_chat (id_guia, id_usuario, nome_canal) VALUES (:id_guia, :id_usuario, :nome_canal)");
    $res->bindValue(":id_guia", $idGuia);
    $res->bindValue(":id_usuario", $idUser);
    $res->bindValue(":nome_canal", $channelName);

    $res->execute();
    $result = json_encode(array('mensagem' => 'Salvo com sucesso!', 'success' => true));
    echo $result;

} catch (PDOException $e) {
    $result = json_encode(array('mensagem' => 'Erro ao salvar: ' . $e->getMessage(), 'success' => false));
    echo $result;
}
?>


