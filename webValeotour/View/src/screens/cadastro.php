<?php include("../../blades/header-screens.php");

include('../../../controller/php/conexao.php');

if (isset($_POST['email']) || isset($_POST['senha']) || isset($_POST['nome']) || isset($_POST['telefone'])) {

    if (strlen($_POST['email']) == 0) {
        echo "<script>alert('Preencha seu email');</script>";
    } else if (strlen($_POST['senha']) == 0) {
        echo "<script>alert('Preencha sua senha');</script>";
    } else if (strlen($_POST['nome']) == 0) {
        echo "<script>alert('Preencha seu nome');</script>";
    } else if (strlen($_POST['telefone']) == 0) {
        echo "<script>alert('Preencha seu telefone');</script>";
    } else {

        $email = $_POST['email'];
        $senha = $_POST['senha'];
        $nome = $_POST['nome'];
        $telefone = $_POST['telefone'];


        $email_code = "SELECT * FROM pontos_turisticos WHERE email_pt = '$email'";
        $query_email = $mysqli->query($email_code) or die("Falha na execução do código SQL do email: " . $mysqli->error);

        $email_cadastrado = $query_email->num_rows;

        if ($email_cadastrado > 0) {
            // Falha ao cadastrar-se, esse email já foi cadastrado;
        } else {

            if (!isset($_SESSION)) {
                session_start();
            }


            $eixo = $_POST['eixo-turismo'];

            switch ($eixo) {
                case 'aventura':
                    $_SESSION['eixo'] = 'Aventura';
                    break;
                case 'ecologico':
                    $_SESSION['eixo'] = 'Ecológico';
                    break;
                case 'gastronomico':
                    $_SESSION['eixo'] = 'Gastronômico';
                    break;
                case 'historico':
                    $_SESSION['eixo'] = 'Histórico';
                    break;
                default:
                    $_SESSION['eixo'] = '';
            }

            $tipo = $_POST['tipo-turismo'];

            switch ($tipo) {
                case 'alimentacao':
                    $_SESSION['tipo'] = 'Alimentação';
                    break;
                case 'compras':
                    $_SESSION['tipo'] = 'Compras';
                    break;
                case 'hospedagem':
                    $_SESSION['tipo'] = 'Hospedagem';
                    break;
                case 'trilha':
                    $_SESSION['tipo'] = 'Trilha';
                    break;
                default:
                    $_SESSION['tipo'] = '';
            }




            $_SESSION['email'] = $email;
            $_SESSION['senha'] = $senha;
            $_SESSION['nome'] = $nome;
            $_SESSION['telefone'] = $telefone;

            header("location: cadastro2.php");

        }


    }

}






?>



<div class="tela-cadastro row container-fluid">
    <div class="menu-cadastro col-md-2">
        <a href="../../index.php"><div style="margin-top: 40px"><label class="txt-logo-padrao">ValeOTour!</label></div></a>
        <div class="div-etapas-cadastro">
            <div class="botao-etapa">
                <iconify-icon icon="fluent:data-area-24-regular" class="icon-etapa"></iconify-icon><label
                    class="txt-etapa">Dados Gerais</label>
            </div>


                <div class="botao-etapa-off">
                    <iconify-icon icon="carbon:location" class="icon-etapa-off"></iconify-icon><label
                        class="txt-etapa-off">Endereço</label>
                </div>

                <div class="botao-etapa-off">
                    <iconify-icon icon="ic:baseline-plus" class="icon-etapa-off"></iconify-icon><label
                        class="txt-etapa-off">Adicionais</label>
                </div>
        </div>
    </div>

    <div class="area-cadastro row col-md-10 offset-md-2">

        <div class="div-nome-cadastro">
            <div class="icon-cadastro">
                <iconify-icon icon="mdi:compass-outline" class="icon-compass"></iconify-icon>
            </div>

            <div class="texts-cadastro">
                <label class="titulo-cadastro">Cadastro</label>
                <label class="text-cadastro">Informações de Registro</label>
            </div>
        </div>

        <form action="" method="POST">
            <div class="area-inputs row">

                <div class="div-input-cadastro col-md-5">
                    <label class="label-input">Nome</label>
                    <input type="text" name="nome" id="" class="textbox-cadastro"
                        placeholder="Digite o nome do estabelecimento" required>
                </div>

                <div class="div-input-cadastro col-md-4">
                    <label class="label-input">Tipo</label>
                    <select class="textbox-cadastro" name="tipo-turismo" id="tipo-turismo" required>
                        <option value="" disabled selected>Selecione o Tipo...</option>
                        <option value="alimentacao">Alimentação</option>
                        <option value="compras">Compras</option>
                        <option value="hospedagem">Hospedagem</option>
                        <option value="trilha">Trilha</option>
                    </select>

                </div>

                <div class="div-input-cadastro col-md-5">
                    <label class="label-input">E-mail</label>
                    <input type="text" name="email" id="" class="textbox-cadastro"
                        placeholder="Digite o E-mail do seu estabelecimento" required>

                    <?php if (isset($email_cadastrado) && $email_cadastrado > 0) {
                        echo '<label style="color:#f00;margin-inline:15px;margin-top:5px">Falha ao cadastrar-se, esse email já foi cadastrado</label>';
                    } ?>
                </div>

                <div class="div-input-cadastro col-md-5">
                    <label class="label-input">Senha</label>
                    <input type="password" name="senha" id="" class="textbox-cadastro"
                        placeholder="Digite a senha da sua conta" required>
                </div>

                <div class="div-input-cadastro col-md-4">
                    <label class="label-input">Telefone</label>
                    <input type="tel" name="telefone" id="telefone" class="textbox-cadastro"
                        placeholder="(00) 00000-0000" required>
                    <script>
                        document.getElementById('telefone').addEventListener('input', function (e) {
                            let value = e.target.value;

                            // Remove qualquer caractere que não seja dígito
                            value = value.replace(/\D/g, '');

                            // Aplica o formato de máscara conforme o número de dígitos
                            if (value.length > 0) {
                                value = '(' + value;
                            }
                            if (value.length > 3) {
                                value = value.slice(0, 3) + ') ' + value.slice(3);
                            }
                            if (value.length > 10) {
                                value = value.slice(0, 10) + '-' + value.slice(10, 14);
                            }

                            // Atualiza o valor do input com a máscara aplicada
                            e.target.value = value;
                        });
                    </script>
                </div>


                <div class="div-input-cadastro col-md-3">
                    <label class="label-input">Eixo</label>
                    <select class="textbox-cadastro" name="eixo-turismo" id="eixo-turismo" required>
                        <option value="" disabled selected>Selecione o Eixo...</option>
                        <option value="aventura">Aventura</option>
                        <option value="ecologico">Ecológico</option>
                        <option value="gastronomico">Gastronômico</option>
                        <option value="historico">Histórico</option>
                    </select>

                </div>

            </div>

            <button type="submit" class="button-continuar">Continuar<ion-icon name="arrow-forward-outline"
                    class="arrow-blue"></ion-icon></button>

        </form>



    </div>





</div>

<?php include("../../blades/footer-cadastro.php"); ?>