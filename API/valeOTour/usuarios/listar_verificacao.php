<?php 

include_once('../conexao.php');

$id = isset($_GET['id']) ? $_GET['id'] : null;

if ($id) {
    $query = $pdo->prepare("
        SELECT vg.*, COUNT(g.id_guia) as isGuia 
        FROM guias g 
        INNER JOIN verificacoes_guias vg ON g.id_guia = vg.id_guia 
        WHERE g.id_usuario = :id
    ");
    $query->bindParam(':id', $id, PDO::PARAM_INT);
    $query->execute();

    $res = $query->fetch(PDO::FETCH_ASSOC);

    if ($res) {
        $result = json_encode(array(
            'success' => true,
            'dados' => array(
                'isGuia' => $res['isGuia'],
                'name' => $res['nome_v'],
                'status' => $res['status_verificacao'],
                'comment' => $res['comentario_v'],
                'cadastur' => $res['cadastur_v'],
                'cadasturFrente' => $res['cadastur_frente_v'],
                'cadasturVerso' => $res['cadastur_verso_v'],
                'eixo' => $res['eixo_v'],
                'biografia' => $res['biografia_v'],
                'cpf' => $res['cpf_v'],
                'priceHour' => $res['taxa_hora_v'],
                'pricePeople' => $res['taxa_pessoa_v'],
                'imagePath' => $res['imagePath_v'],
                'email' => $res['email_v'],
                'guiaID' => $res['id_guia'],
            )
        ));
    } else {
        $result = json_encode(array('success' => false, 'resultado' => 'Nenhum resultado encontrado.'));
    }
} else {
    $result = json_encode(array('success' => false, 'resultado' => 'ID inválido.'));
}

echo $result;

?>
