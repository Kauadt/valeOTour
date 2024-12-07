<?php
require_once("../conexao.php");
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);


$biografia = isset($_POST['biografia']) ? $_POST['biografia'] : null;
$cadastur = isset($_POST['cadastur']) ? $_POST['cadastur'] : null;
$city = isset($_POST['city']) ? $_POST['city'] : null;
$pricePeople = isset($_POST['pricePeople']) ? $_POST['pricePeople'] : null;
$priceTime = isset($_POST['priceTime']) ? $_POST['priceTime'] : null;
$userID = isset($_POST['userID']) ? $_POST['userID'] : null;
$cpf = isset($_POST['cpf']) ? $_POST['cpf'] : null;
$tourismType = isset($_POST['tourismType']) ? $_POST['tourismType'] : null;

$query = $pdo->query("SELECT * FROM guias WHERE cadastur_guia = '$cadastur'");
$res = $query->fetchAll(PDO::FETCH_ASSOC);
$total_reg = count($res);
if ($total_reg > 0) {
    $result = json_encode(array('mensagem' => 'Cadastur já cadastrado!', 'success' => false));
    echo $result;
    exit();
}

$foto_frente_url = '';
$foto_verso_url = '';

if (isset($_FILES['photoFrente']) && $_FILES['photoFrente']['error'] === UPLOAD_ERR_OK) {
    $foto_frente = $_FILES['photoFrente'];
    $extensao_frente = pathinfo($foto_frente['name'], PATHINFO_EXTENSION);
    $nome_foto_frente = uniqid() . '_frente.' . $extensao_frente;
    $caminho_foto_frente = './assets/' . $nome_foto_frente;
    
    if (move_uploaded_file($foto_frente['tmp_name'], $caminho_foto_frente)) {
        $foto_frente_url = $nome_foto_frente;
    } else {
        $result = json_encode(array('mensagem' => 'Falha ao fazer upload da imagem frente', 'success' => false));
        echo $result;
        exit();
    }
}

if (isset($_FILES['photoVerso']) && $_FILES['photoVerso']['error'] === UPLOAD_ERR_OK) {
    $foto_verso = $_FILES['photoVerso'];
    $extensao_verso = pathinfo($foto_verso['name'], PATHINFO_EXTENSION);
    $nome_foto_verso = uniqid() . '_verso.' . $extensao_verso;
    $caminho_foto_verso = './assets/' . $nome_foto_verso;
    
    if (move_uploaded_file($foto_verso['tmp_name'], $caminho_foto_verso)) {
        $foto_verso_url = $nome_foto_verso;
    } else {
        $result = json_encode(array('mensagem' => 'Falha ao fazer upload da imagem verso', 'success' => false));
        echo $result;
        exit();
    }
}

$res = $pdo->prepare("INSERT INTO guias SET 
    cpf_guia = :cpf_guia, 
    biografia_guia = :biografia_guia, 
    cadastur_guia = :cadastur_guia, 
    cidade_guia = :cidade_guia, 
    taxa_pessoa_guia = :taxa_pessoa_guia, 
    taxa_hora_guia = :taxa_hora_guia,
    id_usuario = :id_usuario,
    cadastur_frente = :cadastur_frente,
    cadastur_verso = :cadastur_verso,
    eixo_guia = :eixo_guia
");

$res->bindValue(":cpf_guia", $cpf);
$res->bindValue(":biografia_guia", $biografia);
$res->bindValue(":cadastur_guia", $cadastur);
$res->bindValue(":cidade_guia", $city);
$res->bindValue(":taxa_pessoa_guia", $pricePeople);
$res->bindValue(":taxa_hora_guia", $priceTime);
$res->bindValue(":id_usuario", $userID);
$res->bindValue(":eixo_guia", $tourismType);
$res->bindValue(":cadastur_frente", $foto_frente_url);
$res->bindValue(":cadastur_verso", $foto_verso_url);

$res->execute();

$lastId = $pdo->lastInsertId();

$queryVerify = $pdo->prepare("INSERT INTO verificacoes_guias SET id_guia = :id_guia");
$queryVerify->bindValue(":id_guia", $lastId);
$queryVerify->execute();

$result = json_encode(array('mensagem' => 'Salvo com sucesso!', 'success' => true));
echo $result;

?>
