<?php 
require_once("../conexao.php");
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

$tabela = 'usuarios';

$nome = isset($_POST['userName']) ? $_POST['userName'] : null;
$senha = isset($_POST['userPassword']) ? md5($_POST['userPassword']) : null;
$email = isset($_POST['userEmail']) ? $_POST['userEmail'] : null;
$tipo_user = isset($_POST['userType']) ? $_POST['userType'] : null;

$query = $pdo->query("SELECT * FROM $tabela WHERE email_usuario = '$email'");
$res = $query->fetchAll(PDO::FETCH_ASSOC);
$total_reg = count($res);
if ($total_reg > 0) {
    $result = json_encode(array('mensagem' => 'Email já Cadastrado, escolha Outro!', 'success' => false));
    echo $result;    
    exit();
}

$foto_url = '';
if (isset($_FILES['photo']) && $_FILES['photo']['error'] === UPLOAD_ERR_OK) {
    $foto = $_FILES['photo'];
    
    $extensao = pathinfo($foto['name'], PATHINFO_EXTENSION);
    $nome_foto = uniqid() . '.' . $extensao;

    $caminho_foto = './assets/' . $nome_foto;

    if (move_uploaded_file($foto['tmp_name'], $caminho_foto)) {
        $foto_url = $nome_foto;
    } else {
        $result = json_encode(array('mensagem' => 'Falha ao fazer upload da imagem', 'success' => false));
        echo $result;
        exit();
    }
}

$res = $pdo->prepare("INSERT INTO $tabela SET 
    nome_usuario = :nome_usuario, 
    email_usuario = :email_usuario, 
    senha_usuario = :senha_usuario, 
    tipo_usuario = :tipo_usuario, 
    caminho_imagem_usuario = :caminho_imagem_usuario
");

$res->bindValue(":nome_usuario", $nome);
$res->bindValue(":senha_usuario", $senha);
$res->bindValue(":email_usuario", $email);
$res->bindValue(":tipo_usuario", $tipo_user);
$res->bindValue(":caminho_imagem_usuario", $foto_url);

$res->execute();

$result = json_encode(array('mensagem' => 'Salvo com sucesso!', 'success' => true));
echo $result;

?>
