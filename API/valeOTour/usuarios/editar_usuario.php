<?php
header('Content-Type: application/json');
require_once("../conexao.php");

$userID = $_POST['userID'];
$userName = $_POST['userName'];
$userEmail = $_POST['userEmail'];
$userPassword = $_POST['userPassword'];
$guiaBio = $_POST['userBio'];
$numHour = $_POST['numHour'];
$numPeople = $_POST['numPeople'];
$userType = $_POST['userType'];

$foto_url = null;
if (isset($_FILES['photo']) && $_FILES['photo']['error'] === UPLOAD_ERR_OK) {
    $foto = $_FILES['photo'];

    $extensao = pathinfo($foto['name'], PATHINFO_EXTENSION);
    $nome_foto = uniqid() . '.' . $extensao;

    $caminho_foto = './assets/' . $nome_foto;

    if (move_uploaded_file($foto['tmp_name'], $caminho_foto)) {
        $foto_url = $nome_foto;
    } else {
        echo json_encode(['mensagem' => 'Falha ao fazer upload da imagem', 'success' => false]);
        exit();
    }
}

$query_usuario = "UPDATE usuarios SET 
    nome_usuario = :nome_usuario, 
    email_usuario = :email_usuario,
    senha_usuario = :senha_usuario, 
    tipo_usuario = :tipo_usuario";

if ($foto_url) {
    $query_usuario .= ", caminho_imagem_usuario = :caminho_imagem_usuario";
}

$query_usuario .= " WHERE id_usuario = :id_usuario";

$res = $pdo->prepare($query_usuario);
$res->bindValue(":nome_usuario", $userName);
$res->bindValue(":email_usuario", $userEmail);
$res->bindValue(":senha_usuario", md5($userPassword));
$res->bindValue(":tipo_usuario", $userType);
if ($foto_url) {
    $res->bindValue(":caminho_imagem_usuario", $foto_url);
}
$res->bindValue(":id_usuario", $userID);

try {
    $res->execute();
    $response = ['mensagem' => 'Dados atualizados com sucesso', 'success' => true];
} catch (PDOException $e) {
    $response = ['mensagem' => 'Erro ao atualizar dados: ' . $e->getMessage(), 'success' => false];
    echo json_encode($response);
    exit();
}

if ($userType === 'Guia') {
    $update_guia = $pdo->prepare("UPDATE guias SET 
        taxa_hora_guia = :num_hour, 
        taxa_pessoa_guia = :num_people,
        biografia_guia = :biografia_guia
        WHERE id_usuario = :id_usuario
    ");

    $update_guia->bindValue(":num_hour", $numHour);
    $update_guia->bindValue(":num_people", $numPeople);
    $update_guia->bindValue(":biografia_guia", $guiaBio);
    $update_guia->bindValue(":id_usuario", $userID);

    try {
        $update_guia->execute();
        $response['guia'] = ['mensagem' => 'Dados do guia atualizados com sucesso', 'success' => true];
    } catch (PDOException $e) {
        $response['guia'] = ['mensagem' => 'Erro ao atualizar dados do guia: ' . $e->getMessage(), 'success' => false];
    }
}

echo json_encode($response); 
?>
