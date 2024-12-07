<?php include("../../blades/header-screens.php");

include('../../../controller/php/conexao.php');

//INSERIR DADOS NAS TEXTBOX

if (!isset($_SESSION)) {
    session_start();
}

$input_nome = $_SESSION['name'];
$input_tipo = $_SESSION['tipo'];
$input_email = $_SESSION['email'];
$input_telefone = $_SESSION['telefone'];
$input_eixo = $_SESSION['eixo'];



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

        $alter_email = $_POST['email'];
        $alter_senha = $_POST['senha'];
        $alter_nome = $_POST['nome'];
        $alter_telefone = $_POST['telefone'];


        $email_code = "SELECT * FROM pontos_turisticos WHERE email_pt = '$alter_email'";
        $query_email = $mysqli->query($email_code) or die("Falha na execução do código SQL do email: " . $mysqli->error);


        $email_cadastrado = $query_email->num_rows;

        //O EMAIL TIVER 1 E SER DELE, TIVER 1 E NAO SER DELE, E NAO TIVER NENHUM

        if (($email_cadastrado == 1 && $alter_email == $input_email) || $email_cadastrado == 0) {

            if (!isset($_SESSION)) {
                session_start();
            }


            $alter_eixo = $_POST['eixo-turismo'];

            switch ($alter_eixo) {
                case 'aventura':
                    $_SESSION['alter_eixo'] = 'Aventura';
                    break;
                case 'ecologico':
                    $_SESSION['alter_eixo'] = 'Ecológico';
                    break;
                case 'gastronomico':
                    $_SESSION['alter_eixo'] = 'Gastronômico';
                    break;
                case 'historico':
                    $_SESSION['alter_eixo'] = 'Histórico';
                    break;
                default:
                    $_SESSION['alter_eixo'] = '';
            }

            $alter_tipo = $_POST['tipo-turismo'];

            switch ($alter_tipo) {
                case 'alimentacao':
                    $_SESSION['alter_tipo'] = 'Alimentação';
                    break;
                case 'compras':
                    $_SESSION['alter_tipo'] = 'Compras';
                    break;
                case 'hospedagem':
                    $_SESSION['alter_tipo'] = 'Hospedagem';
                    break;
                case 'trilha':
                    $_SESSION['alter_tipo'] = 'Trilha';
                    break;
                default:
                    $_SESSION['alter_tipo'] = '';
            }




            $_SESSION['alter_email'] = $alter_email;
            $_SESSION['alter_senha'] = $alter_senha;
            $_SESSION['alter_nome'] = $alter_nome;
            $_SESSION['alter_telefone'] = $alter_telefone;

            header("location: alterar-dados2.php");

        }


    }

}




?>



<div class="tela-cadastro row container-fluid">
    <div class="menu-cadastro col-md-2">
        <div style="margin-top: 40px"><label class="txt-logo-padrao">ValeOTour!</label></div>
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
                <label class="titulo-cadastro">Alterar Dados</label>
                <label class="text-cadastro">Informações de Registro</label>
            </div>
        </div>

        <form action="" method="POST">
            <div class="area-inputs row">

                <div class="div-input-cadastro col-md-5">
                    <label class="label-input">Nome</label>
                    <input type="text" name="nome" id="" class="textbox-cadastro"
                        placeholder="Digite o nome do estabelecimento" value="<?php echo $input_nome; ?>" required>
                </div>

                <div class="div-input-cadastro col-md-4">
                    <label class="label-input">Tipo</label>
                    <select class="textbox-cadastro" name="tipo-turismo" id="tipo-turismo" required>
                        <option value="" disabled <?php if (!$input_tipo)
                            echo 'selected'; ?>>Selecione o Tipo...
                        </option>
                        <option value="alimentacao" <?php if ($input_tipo == 'Alimentacao')
                            echo 'selected'; ?>>
                            Alimentação</option>
                        <option value="compras" <?php if ($input_tipo == 'Compras')
                            echo 'selected'; ?>>Compras</option>
                        <option value="hospedagem" <?php if ($input_tipo == 'Hospedagem')
                            echo 'selected'; ?>>Hospedagem
                        </option>
                        <option value="trilha" <?php if ($input_tipo == 'Trilha')
                            echo 'selected'; ?>>Trilha</option>
                    </select>

                </div>

                <div class="div-input-cadastro col-md-5">
                    <label class="label-input">E-mail</label>
                    <input type="text" name="email" id="" class="textbox-cadastro"
                        placeholder="Digite o E-mail do seu estabelecimento" value="<?php echo $input_email; ?>"
                        required>

                    <?php if (isset($email_cadastrado) && isset($alter_email) && isset($input_email) && $email_cadastrado <= 1 && $alter_email != $input_email) {
                        echo '<label style="color:#f00;margin-top:5px; font-size:14px">Falha ao alterar dados, esse e-mail já está sendo usado</label>';
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
                        placeholder="(00) 00000-0000" value="<?php echo $input_telefone; ?>" required>
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
                        <option value="" disabled <?php if (!$input_eixo)
                            echo 'selected'; ?>>Selecione o Eixo...
                        </option>
                        <option value="aventura" <?php if ($input_eixo == 'Aventura')
                            echo 'selected'; ?>>Aventura
                        </option>
                        <option value="ecologico" <?php if ($input_eixo == 'Ecológico')
                            echo 'selected'; ?>>Ecológico
                        </option>
                        <option value="gastronomico" <?php if ($input_eixo == 'Gastronômico')
                            echo 'selected'; ?>>
                            Gastronômico</option>
                        <option value="historico" <?php if ($input_eixo == 'Histórico')
                            echo 'selected'; ?>>Histórico
                        </option>
                    </select>

                </div>

            </div>

            <button type="submit" class="button-continuar">Continuar<ion-icon name="arrow-forward-outline"
                    class="arrow-blue"></ion-icon></button>

        </form>



    </div>





</div>

<?php include("../../blades/footer-cadastro.php"); ?>