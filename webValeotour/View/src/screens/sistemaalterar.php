<?php include("../../blades/header-screens.php"); 

include("../../../controller/php/conexao.php");

if (!isset($_SESSION)) {
    session_start();
}



$id_ponto_turistico = $_SESSION['id'];
$email = $_SESSION['alter_email'];
$senha = md5($_SESSION['alter_senha']);
$nome = $_SESSION['alter_nome'];
$telefone = $_SESSION['alter_telefone'];
$eixo = $_SESSION['alter_eixo'];
$tipo = $_SESSION['alter_tipo'];


$rua = $_SESSION['alter_rua'];
$bairro = $_SESSION['alter_bairro'];
$cidade = $_SESSION['alter_cidade'];
$numero = $_SESSION['alter_numero'];

$descricao = $_SESSION['alter_descricao'];
$imagem_principal = $_SESSION['imagem_principal'];

$latitude = $_SESSION['latitude'];
$longitude = $_SESSION['longitude'];


$query_alter = "UPDATE pontos_turisticos SET 
    eixo_pt = '$eixo', 
    tipo_pt = '$tipo', 
    email_pt = '$email', 
    senha_pt = '$senha', 
    nome_pt = '$nome', 
    telefone_pt = '$telefone', 
    rua_pt = '$rua', 
    bairro_pt = '$bairro', 
    cidade_pt = '$cidade', 
    numero_pt = '$numero', 
    descricao_pt = '$descricao', 
    foto_principal_pt = '$imagem_principal', 
    latitude_pt = '$latitude', 
    longitude_pt = '$longitude' 
WHERE id_ponto_turistico = $id_ponto_turistico;";

$mysqli->query($query_alter) or die("Falha na execução do cadastro principal, código SQL cadastro: " . $mysqli->error);


$query_verificacao = "UPDATE verificacoes_pontos_turisticos SET
    status_verificacao_pt = 'Aguardando verificação',
    nome_v = 'Aguardando verificação',
    descricao_v = 'Aguardando verificação',
    tipo_v = 'Aguardando verificação',
    rua_v = 'Aguardando verificação',
    bairro_v = 'Aguardando verificação',
    numero_v = 'Aguardando verificação',
    cidade_v = 'Aguardando verificação',
    latitude_v = 'Aguardando verificação',
    longitude_v = 'Aguardando verificação',
    foto_principal_v = 'Aguardando verificação',
    telefone_v = 'Aguardando verificação',
    comentario_v = 'Aguardando verificação',
    eixo_v = 'Aguardando verificação'
WHERE id_ponto_turistico = '$id_ponto_turistico';";

$mysqli->query($query_verificacao) or die("Falha na execução do cadastro principal, código SQL cadastro: " . $mysqli->error);

//CADASTRO DE DIAS DA SAMANA

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

    $query_horario_funcionamento = "UPDATE horario_funcionamento SET
    hora_abertura = '$var_abertura',
    hora_fechamento = '$var_fechamento',
    status_funcionamento = '$var_status'
    WHERE id_ponto_turistico = '$id_ponto_turistico' AND dia_da_semana = '$dia';";

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
    // echo "<script>alert('Nenhuma imagem para cadastrar.');</script>";
}


if($_SESSION['tipo'] == 'Trilha' && $_SESSION['alter_tipo'] == "Trilha"){
    $tempo_trilha = $_SESSION['alter_tempo'];
    $dificuldade_trilha = $_SESSION['alter_dificuldade'];
    $distancia_trilha = $_SESSION['alter_distancia'];

    //TEM Q USAR ALTER
    // $query_trilha = "INSERT INTO trilhas (nome_trilha, distancia_trilha, tempo_trilha, dificuldade_trilha, id_ponto_turistico) VALUES ('$nome', '$distancia_trilha', '$tempo_trilha', '$dificuldade_trilha', $id_ponto_turistico)";
    $query_trilha = "UPDATE trilhas SET nome_trilha = '$nome', distancia_trilha = '$distancia_trilha', tempo_trilha = '$tempo_trilha', dificuldade_trilha = '$dificuldade_trilha' WHERE id_ponto_turistico = $id_ponto_turistico";


    $mysqli->query($query_trilha) or die("Falha na execução do cadastro principal, código SQL cadastro: " . $mysqli->error);


} else if($_SESSION['tipo'] != 'Trilha' && $_SESSION['alter_tipo'] == 'Trilha'){
    $tempo_trilha = $_SESSION['alter_tempo'];
    $dificuldade_trilha = $_SESSION['alter_dificuldade'];
    $distancia_trilha = $_SESSION['alter_distancia'];

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










