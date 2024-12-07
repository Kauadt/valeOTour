<?php 

include_once('../conexao.php');

$ids = @$_GET['id']; 
$idArray = explode(',', $ids);

$placeholders = implode(',', array_fill(0, count($idArray), '?'));

$query = $pdo->prepare("SELECT * FROM usuarios WHERE id_usuario IN ($placeholders)");

foreach ($idArray as $index => $id) {
    $query->bindValue(($index + 1), (int)$id, PDO::PARAM_INT);
}

$query->execute();
$res = $query->fetchAll(PDO::FETCH_ASSOC);

$dados = [];

foreach ($res as $row) {
    $dados[] = array(
        'userID' => $row['id_usuario'],
        'userName' => $row['nome_usuario'],
        'imagePath' => $row['caminho_imagem_usuario'],
        'userType' => $row['tipo_usuario'],
    );
}

$result = json_encode(array('success' => count($dados) > 0, 'result' => $dados));
echo $result;
?>
