<?php include("../../blades/header-screens.php"); 

include("../../../controller/php/conexao.php");

if (!isset($_SESSION)) {
    session_start();
}




$email = $_SESSION['email'];
$senha = md5($_SESSION['senha']);
$nome = $_SESSION['nome'];
$telefone = $_SESSION['telefone'];
$eixo = $_SESSION['eixo'];
$tipo = $_SESSION['tipo'];


$rua = $_SESSION['rua'];
$bairro = $_SESSION['bairro'];
$cidade = $_SESSION['cidade'];
$numero = $_SESSION['numero'];

$descricao = $_SESSION['descricao'];
$imagem_principal = $_SESSION['imagem_principal'];

$latitude = $_SESSION['latitude'];
$longitude = $_SESSION['longitude'];


$query_cadastro = "INSERT INTO pontos_turisticos (eixo_pt, tipo_pt, email_pt, senha_pt, nome_pt, telefone_pt, rua_pt, bairro_pt, cidade_pt, numero_pt, descricao_pt, foto_principal_pt, latitude_pt, longitude_pt) VALUES ('$eixo', '$tipo', '$email', '$senha', '$nome', '$telefone', '$rua', '$bairro', '$cidade', '$numero', '$descricao', '$imagem_principal', '$latitude', '$longitude');";

$mysqli->query($query_cadastro) or die("Falha na execução do cadastro principal, código SQL cadastro: " . $mysqli->error);

$id_ponto_turistico_result = $mysqli->query("SELECT id_ponto_turistico FROM pontos_turisticos WHERE email_pt = '$email';");


if ($id_ponto_turistico_result) {

    $row = $id_ponto_turistico_result->fetch_assoc();
    

    if ($row) {
        $id_ponto_turistico = $row['id_ponto_turistico'];
    }
}

$query_verificacao = "INSERT INTO verificacoes_pontos_turisticos (id_ponto_turistico) VALUES ($id_ponto_turistico)";
$mysqli->query($query_verificacao) or die("Falha na execução do cadastro principal, código SQL cadastro: " . $mysqli->error);





$dias = ['segunda', 'terca', 'quarta', 'quinta', 'sexta', 'sabado', 'domingo'];

foreach($dias as $dia){
    $abertura = 'abertura_';
    $fechamento = 'fechamento_';
    $status = 'status_';



    $var_abertura = $abertura . $dia;
    $var_fechamento = $fechamento . $dia;
    $var_status = $status . $dia;
    
    
    $var_abertura = $_SESSION[$var_abertura];
    $var_fechamento = $_SESSION[$var_fechamento];
    $var_status = $_SESSION[$var_status];

    $dia = ucfirst($dia);
    $query_horario_funcionamento = "INSERT INTO horario_funcionamento(dia_da_semana, hora_abertura, hora_fechamento, id_ponto_turistico, status_funcionamento) VALUES ('$dia', '$var_abertura', '$var_fechamento' , $id_ponto_turistico, '$var_status');";
    $mysqli->query($query_horario_funcionamento) or die("Falha na execução do código SQL cadastro: " . $mysqli->error);
}





if (isset($_SESSION['imagens'])) {
    $imagens = $_SESSION['imagens'];

    foreach ($imagens as $imagem) {

        $nome_imagem = $mysqli->real_escape_string($imagem);
        $query_imagens = "INSERT INTO fotos_pontos_turisticos (caminho_imagem_pt, id_ponto_turistico) VALUES ('$nome_imagem', '$id_ponto_turistico')";

        if (!$mysqli->query($query_imagens)) {
            die("Falha na execução do código SQL cadastro: " . $mysqli->error);
        }
    }


    unset($_SESSION['imagens']);
    
} else {
    echo "<script>alert('Nenhuma imagem para cadastrar.');</script>";
}


if($_SESSION['tipo'] == 'Trilha'){
    $tempo_trilha = $_SESSION['tempo_trilha'];
    $dificuldade_trilha = $_SESSION['dificuldade_trilha'];
    $distancia_trilha = $_SESSION['distancia_trilha'];

    $query_trilha = "INSERT INTO trilhas (nome_trilha, distancia_trilha, tempo_trilha, dificuldade_trilha, id_ponto_turistico) VALUES ('$nome', '$distancia_trilha', '$tempo_trilha', '$dificuldade_trilha', $id_ponto_turistico)";

    $mysqli->query($query_trilha) or die("Falha na execução do cadastro principal, código SQL cadastro: " . $mysqli->error);


}


?>

<div class="wrapper-cadastrado">
    <div class="modal-cadastro col-md-6">
        <label>Sua solicitação de cadastro foi realizada com <label class="text-green">sucesso!</label></label>
        <label class="subtitle-cadastrado">aguarde a verificação...</label>
    </div>
</div>



<?php include("../../blades/footer.php"); 


echo '<script>setTimeout(function() { window.location.href = "./login.php";}, 5000);</script>';
$_SESSION = array();
$session_destroy;

?>










