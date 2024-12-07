<?php
//indexando a pagina de conexão
include('../../../controller/php/conexao.php');

// (ISSET)verifica se o email ou a senha estão preenchidos
if (isset($_POST['email']) || isset($_POST['senha']))

    // (STRLEN) puxa a quantidade de caracteres da variável
    // compara se o numero de caracteres da variável não é igual a 0 (VARIAVEL VAZIA)
    if (strlen($_POST['email']) == 0) {
        // pede para preencher o email se ele estiver vazio
        $erroEmail = 'Preencha seu email';
    } else if (strlen($_POST['senha']) == 0) {
        // pede para preencher a senha se ela estiver vazia
        $erroSenha = 'Preencha sua senha';
    } else {

        //Define o valor do campo 'email' como variável emai
        $email = $_POST['email'];
        //Converte o valor do campo 'senha' para um código hash criptografado e salva ele como variável senha
        $senha = md5($_POST['senha']);

        //Define o código SQL a ser executado como uma variavel sql_code 
        $sql_code = "SELECT * FROM pontos_turisticos WHERE email_pt = '$email' AND senha_pt = '$senha'";
        //Executa a variável sql_code a partir da variável mysql da conexão e no caso de algum erro ele cancela o codigo e me envia aonde ocorreu o erro
        $sql_query = $mysqli->query($sql_code) or die("Falha na execução do código SQL: " . $mysqli->error);

        //Puxa o numero de registros do query
        $cadastros = $sql_query->num_rows;

        //Se existir uma linha como retorno existe o usuário
        if ($cadastros == 1) {

            //Salva a query como uma array 
            $estabelecimento = $sql_query->fetch_assoc();

            //Se sessão não estiver definida, inicie
            if (!isset($_SESSION)) {
                session_start();
            }

            ini_set('memory_limit', '1024M');  // Aumenta para 1 GB


            //Salva as variáveis na sessão que foi aberta
            $_SESSION['senha'] = $estabelecimento['senha_pt'];
            $_SESSION['name'] = $estabelecimento['nome_pt'];
            $_SESSION['tipo'] = $estabelecimento['tipo_pt'];
            $_SESSION['email'] = $estabelecimento['email_pt'];
            $_SESSION['rua'] = $estabelecimento['rua_pt'];
            $_SESSION['bairro'] = $estabelecimento['bairro_pt'];
            $_SESSION['numero'] = $estabelecimento['numero_pt'];
            $_SESSION['cidade'] = $estabelecimento['cidade_pt'];
            $_SESSION['telefone'] = $estabelecimento['telefone_pt'];
            $_SESSION['eixo'] = $estabelecimento['eixo_pt'];
            $_SESSION['latitude'] = $estabelecimento['latitude_pt'];
            $_SESSION['longitude'] = $estabelecimento['longitude_pt'];

            $_SESSION['descricao'] = $estabelecimento['descricao_pt'];
            $_SESSION['foto_principal'] = $estabelecimento['foto_principal_pt'];
            $_SESSION['id'] = $estabelecimento['id_ponto_turistico'];


            $code_funcionamento = "SELECT * FROM horario_funcionamento WHERE id_ponto_turistico = " . $estabelecimento['id_ponto_turistico'];
            $query = $mysqli->query($code_funcionamento) or die("Falha na execução do código SQL cadastro: " . $mysqli->error);

            //ENQUANTO EXITIR UMA LINHA A SER LIDA (SEGUNDA, TERÇA, QUARTA...) ELE VAI EXECUTAR O CÓDIGO JOGANDO TODAS LINHAS DA FETCH ASSOC EM UMA ARRAY PARA IR PARA O SESSION
            while ($fetch_funcionamento = $query->fetch_assoc()) {
                $horarios_funcionamento[] = $fetch_funcionamento;
            }

            $_SESSION['horarios_funcionamento'] = $horarios_funcionamento;




            //QUERY COMENTARIOS

            $code_comentario = "SELECT pt.*, u.*, (SELECT AVG(qtd_estrela_avaliacao_pt) FROM avaliacoes_ponto_turisticos WHERE id_ponto_turistico = pt.id_ponto_turistico) AS media_estrelas FROM avaliacoes_ponto_turisticos pt INNER JOIN usuarios u ON pt.id_usuario = u.id_usuario WHERE pt.id_ponto_turistico = " . $estabelecimento['id_ponto_turistico'];


            $query = $mysqli->query($code_comentario) or die("Falha na execução do código SQL cadastro: " . $mysqli->error);

            while ($fetch_comentarios = $query->fetch_assoc()) {
                $comentarios[] = $fetch_comentarios;
            }

            $_SESSION['comentarios'] = $comentarios;


            //QUERY AVALIACAO COMENTARIOS

            $code_avaliacao = "SELECT qtd_estrela_avaliacao_pt from avaliacoes_ponto_turisticos WHERE id_ponto_turistico = " . $estabelecimento['id_ponto_turistico'];

            $query = $mysqli->query($code_avaliacao) or die("Falha na execução do código SQL cadastro: " . $mysqli->error);

            while ($fetch_avaliacao = $query->fetch_assoc()) {
                $avaliacao[] = $fetch_avaliacao;
            }

            $_SESSION['avaliacao'] = $avaliacao;



            //QUERY FOTOS SECUNDARIAS

            $code_fotos = "SELECT caminho_imagem_pt FROM fotos_pontos_turisticos WHERE id_ponto_turistico = " . $estabelecimento['id_ponto_turistico'];
            $query = $mysqli->query($code_fotos) or die("Falha na execução do código SQL cadastro: " . $mysqli->error);

            while ($fetch_fotos = $query->fetch_assoc()) {
                $fotos[] = $fetch_fotos;
            }

            $_SESSION['fotos'] = $fotos;

            //QUERY VERIFICAÇÃO
            $code_verificacao = "SELECT status_verificacao_pt FROM verificacoes_pontos_turisticos WHERE id_ponto_turistico = " . $estabelecimento['id_ponto_turistico'];
            $query = $mysqli->query($code_verificacao) or die("Falha na execução do código SQL cadastro: " . $mysqli->error);

            while ($fetch_verificacao = $query->fetch_assoc()) {
                $verificacao[] = $fetch_verificacao;
            }

            if(!empty($verificacao)) {
                $_SESSION['status_verificacao'] = $verificacao[0]['status_verificacao_pt'];
            }


            //QUERY TRILHA
            if ($estabelecimento['tipo_pt'] == 'Trilha') {
                $code_trilha = "SELECT * FROM trilhas WHERE id_ponto_turistico = " . $estabelecimento['id_ponto_turistico'];
                $query = $mysqli->query($code_trilha) or die("Falha na execução do código SQL cadastro: " . $mysqli->error);

                while ($fetch_trilha = $query->fetch_assoc()) {
                    $trilha[] = $fetch_trilha;
                }

                $_SESSION['trilha'] = $trilha;

            }






            //Direciona para a pagina de perfil
            header("Location: ./perfil-gerenciamento.php");


        }
        //Caso não exista nenhum registro retorna uma mensagem
        else {
            $dadosIncorretos = 'Falha ao logar! E-mail ou senha incorretos';
        }
    }

?>


<!DOCTYPE html>
<html lang="pt-br">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>ValeOTour!</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet"
        integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossorigin="anonymous">
    <link rel="stylesheet" href="../../css/style.css">
    <link rel="shortcut icon" type="imagex/png" href="../../../icon.ico">


</head>

<body>

    <div class="wrapper container-fluid">

        <div class="nav-login">
        <a href="../../index.php"><label class="txt-logo maingreen">ValeOTour!</label></a>
            <div class="display-row"><label>Ainda não tem uma conta?</label><a href="./cadastro.php">
                    <div class="btn-login maincolor-text changecolor2">Sign Up</div>
                </a></div>
        </div>

        <div class="area-text-login col-md-5">
            <div class="conteudo-text-login col-md-9 offset-md-1">
                <div class="background-icon-login">
                    <ion-icon name="map-outline" class="icon-map"></ion-icon>
                </div>

                <div class="title-login"><label>Não importa <br> o <label class="text-green">destino!</label></label>
                </div>
                <div class="div-descricao-login">
                    <div class="line-descricao-login"></div>
                    <div class="text-descricao-login">
                        Descubra o Vale do Ribeira com o <b class="text-green">ValeOTour!</b> Crie experiências
                        personalizadas, explore lugares únicos. Cada viagem torna-se uma nova oportunidade de explorar o
                        novo!
                        <label class="autor-login">— By ValeOTour</label>
                    </div>
                </div>
            </div>
        </div>

        <div class="area-inputs-login col-md-7">

            <div class="conteudo-inputs-login col-md-7">


                <div class="title-inputs-login">Sign In</div>
                <div class="subtitle-inputs-login">Insira seus dados para avançar</div>

                <form action="" method="POST">


                    <div class="div-inputs-login">

                        <div class="div-input">
                            <div class="text-input">Email</div>
                            <input type="text" name="email" class="input-login">
                            <br><label><?php if (isset($erroEmail)) {
                                echo $erroEmail;
                            }
                            unset($erroEmail); ?></label>
                        </div>

                        <div class="div-input">
                            <div class="text-input">Senha</div>
                            <input type="password" name="senha" class="input-login">
                            <br><label><?php if (isset($erroSenha)) {
                                echo $erroSenha;
                            }
                            unset($erroSenha); ?></label><label><?php if (isset($dadosIncorretos)) {
                                 echo $dadosIncorretos;
                             }
                             unset($dadosIncorretos); ?></label>
                        </div>


                    </div>

                    <button type="submit" class="btn botao btn-primary mt-5 txt-botao">ENTRAR</button>


                </form>



            </div>
        </div>

    </div>



    <script type="module" src="https://unpkg.com/ionicons@7.1.0/dist/ionicons/ionicons.esm.js"></script>
    <script nomodule src="https://unpkg.com/ionicons@7.1.0/dist/ionicons/ionicons.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"
        integrity="sha384-YvpcrYf0tY3lHB60NNkmXc5s9fDVZLESaAA55NDzOxhy9GkcIdslK1eN7N6jIeHz"
        crossorigin="anonymous"></script>

    <script src="../../../Controller/modal.js"></script>
</body>

</html>