<?php 

include_once('../conexao.php');

$id = @$_GET['id'];
$tipo_usuario = @$_GET['tipo_usuario'];

if ($tipo_usuario == 'Comum') {
    $query = $pdo->prepare("SELECT * from usuarios where id_usuario = :id");
} else if ($tipo_usuario == 'Guia') {
    $query = $pdo->prepare("SELECT * from usuarios u INNER JOIN guias g ON g.id_usuario = u.id_usuario WHERE u.id_usuario = :id");
} else {
    echo json_encode(array('success' => false, 'message' => 'Tipo de usuário inválido'));
    exit;
}

$query->bindParam(':id', $id, PDO::PARAM_INT);
$query->execute();

$res = $query->fetchAll(PDO::FETCH_ASSOC);

if (count($res) > 0) {
    for ($i=0; $i < count($res); $i++) { 
        if ($tipo_usuario == 'Comum') {
            $dados = array(        
                'nome' => $res[$i]['nome_usuario'],        
                'email' => $res[$i]['email_usuario'],
                'tipo' => $res[$i]['tipo_usuario'],
                'imagePath' => $res[$i]['caminho_imagem_usuario'],
                'userID' => $res[$i]['id_usuario'],
            );
        } else {
            $dados = array(        
                'nome' => $res[$i]['nome_usuario'],        
                'email' => $res[$i]['email_usuario'],
                'tipo' => $res[$i]['tipo_usuario'],
                'imagePath' => $res[$i]['caminho_imagem_usuario'],
                'biografia' => $res[$i]['biografia_guia'],
                'cadastur' => $res[$i]['cadastur_guia'],
                'userID' => $res[$i]['id_usuario'],
                'guiaID' => $res[$i]['id_guia'],
            );
        }
    }

    $result = json_encode(array('success' => true, 'dados' => $dados));
} else {
    $result = json_encode(array('success' => false, 'resultado' => '0'));
}

echo $result;

?>
