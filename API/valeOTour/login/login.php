<?php 
include_once('../conexao.php');

$postjson = json_decode(file_get_contents("php://input"), true);
$senha = md5($postjson['userPassword']);
$query_buscar = $pdo->prepare("SELECT * from usuarios where email_usuario = :email_usuario and senha_usuario = :senha_usuario");
$query_buscar->bindValue(":email_usuario", "$postjson[userEmail]");
$query_buscar->bindValue(":senha_usuario", "$senha");
$query_buscar->execute();

$dados_buscar = $query_buscar->fetchAll(PDO::FETCH_ASSOC);

for ($i=0; $i < count($dados_buscar); $i++) { 
    foreach ($dados_buscar[$i] as $key => $value) {
    }
    $id_user = $dados_buscar[$i]['id_usuario'];

    $dados[] = array(
        'userID' => intVal($dados_buscar[$i]['id_usuario']),
        'type' => $dados_buscar[$i]['tipo_usuario'], 
    );
}

if(@count($dados_buscar) > 0){
    $result = json_encode(array('result'=>$dados));
    echo $result;  

}else{
    $result = json_encode(array('result'=>'Dados Incorretos!'));
 	echo $result;
}

?>