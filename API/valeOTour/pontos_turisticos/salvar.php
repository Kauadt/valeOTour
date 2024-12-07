<?php
require_once("../conexao.php");

$postjson = json_decode(file_get_contents('php://input'), true);

$idUser = @$postjson['userID'];
$idPlace = @$postjson['placeID'];
$comment = @$postjson['comment'];
$stars = @$postjson['stars'];
$type = @$postjson['type'];
$idRating = @$postjson['idRating']; 
$date = @$postjson['date']; 

try {
    if ($type == "Insert") {
        error_log("Tipo de operação: Insert");
        $res = $pdo->prepare("INSERT INTO avaliacoes_ponto_turisticos (comentario_avaliacao_pt, qtd_estrela_avaliacao_pt, id_ponto_turistico, id_usuario, data_avaliacao) VALUES (:comentario_avaliacao_pt, :qtd_estrela_avaliacao_pt, :id_ponto_turistico, :id_usuario, data_avaliacao)");
        $res->bindValue(":comentario_avaliacao_pt", $comment);
        $res->bindValue(":qtd_estrela_avaliacao_pt", $stars);
        $res->bindValue(":id_usuario", $idUser);
        $res->bindValue(":id_ponto_turistico", $idPlace);
        $res->bindValue(":data_avaliacao", $date);
    } else if ($type == "Update") {
        error_log("Tipo de operação: Update");
        $res = $pdo->prepare("UPDATE avaliacoes_ponto_turisticos SET comentario_avaliacao_pt = :comentario_avaliacao_pt, qtd_estrela_avaliacao_pt = :qtd_estrela_avaliacao_pt, data_avaliacao = :data_avaliacao WHERE id_avaliacao_pt = :id_avaliacao_pt");
        $res->bindValue(":comentario_avaliacao_pt", $comment);
        $res->bindValue(":qtd_estrela_avaliacao_pt", $stars);
        $res->bindValue(":id_avaliacao_pt", $idRating);
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
