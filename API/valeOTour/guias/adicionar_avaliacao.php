<?php
require_once("../conexao.php");

$postjson = json_decode(file_get_contents('php://input'), true);

$idUser = @$postjson['userID'];
$idGuia = @$postjson['guiaID'];
$comment = @$postjson['comment'];
$stars = @$postjson['stars'];
$type = @$postjson['type'];
$idRating = @$postjson['idRating'];
$date = @$postjson['date'];

try {
    if ($type == "Insert") {
        error_log("Tipo de operação: Insert");
        $res = $pdo->prepare("INSERT INTO avaliacoes_guia (comentario_avaliacao_guia, qtd_estrela_avaliacao_guia, id_guia, id_usuario, data_avaliacao) VALUES (:comentario_avaliacao_guia, :qtd_estrela_avaliacao_guia, :id_guia, :id_usuario, :data_avaliacao)");
        $res->bindValue(":comentario_avaliacao_guia", $comment);
        $res->bindValue(":qtd_estrela_avaliacao_guia", $stars);
        $res->bindValue(":id_usuario", $idUser);
        $res->bindValue(":id_guia", $idGuia);
        $res->bindValue(":data_avaliacao", $date);
    } else if ($type == "Update") {
        error_log("Tipo de operação: Update");
        $res = $pdo->prepare("UPDATE avaliacoes_guia SET comentario_avaliacao_guia = :comentario_avaliacao_guia, qtd_estrela_avaliacao_guia = :qtd_estrela_avaliacao_guia, data_avaliacao  = :data_avaliacao WHERE id_avaliacao_guia = :id_avaliacao_guia");
        $res->bindValue(":comentario_avaliacao_guia", $comment);
        $res->bindValue(":qtd_estrela_avaliacao_guia", $stars);
        $res->bindValue(":id_avaliacao_guia", $idRating);
        $res->bindValue(":data_avaliacao", $date);
    }

    $res->execute();
    $result = json_encode(array('mensagem' => 'Salvo com sucesso!', 'success' => true));
    echo $result;

} catch (PDOException $e) {
    $result = json_encode(array('mensagem' => 'Erro ao salvar: ' . $e->getMessage(), 'success' => false));
    echo $result;
}
?>