<?php include("../../blades/header-screens.php");

include('../../../controller/php/conexao.php');

include('../../../controller/php/conexao.php');

if (isset($_POST['rua']) || isset($_POST['bairro']) || isset($_POST['numero'])) {

    if (strlen($_POST['rua']) == 0) {
        echo "<script>alert('Preencha seu rua');</script>";
    } else if (strlen($_POST['bairro']) == 0) {
        echo "<script>alert('Preencha sua bairro');</script>";
    } else if (strlen($_POST['numero']) == 0) {
        echo "<script>alert('Preencha seu numero');</script>";
    } else {

        $rua = $_POST['rua'];
        $bairro = $_POST['bairro'];
        $cidade = $_POST['cidade'];
        $numero = $_POST['numero'];


        if (!isset($_SESSION)) {
            session_start();
        }


        switch ($cidade) {
            case 'cananeia':
                $_SESSION['alter_cidade'] = 'Cananéia';
                break;
            case 'iguape':
                $_SESSION['alter_cidade'] = 'Iguape';
                break;
            case 'ilha-comprida':
                $_SESSION['alter_cidade'] = 'Ilha Comprida';
                break;
            case 'iporanga':
                $_SESSION['alter_cidade'] = 'Iporanga';
                break;
            case 'miracatu':
                $_SESSION['alter_cidade'] = 'Miracatu';
                break;
            default:
                $_SESSION['alter_cidade'] = '';
        }


        $_SESSION['alter_rua'] = $rua;
        $_SESSION['alter_bairro'] = $bairro;
        $_SESSION['alter_numero'] = $numero;



        header("location: alterar-dados3.php");

        // echo "<script> alert('".$_SESSION['rua']. " " .$_SESSION['bairro']. " " .$_SESSION['cidade']. " " .$_SESSION['numero']. "')</script>";

        // $query_cadastro = "UPDATE pousadas SET rua_pousada = '$rua', bairro_pousada = '$bairro', cidade_pousada = '$cidade', numero_pousada = '$numero' WHERE email_pousada = 'teste'";

        // $mysqli->query($query_cadastro) or die("Falha na execução do código SQL cadastro: " . $mysqli->error);

        // echo "<script> alert('cadastrado com sucesso, efetue seu login')</script>";



    }

}



//INSERIR DADOS NAS TEXTBOX

if (!isset($_SESSION)) {
    session_start();
}

$input_rua = $_SESSION['rua'];
$input_cidade = $_SESSION['cidade'];
$input_numero = $_SESSION['numero'];
$input_bairro = $_SESSION['bairro'];







?>

<div class="tela-cadastro row container-fluid">
    <div class="menu-cadastro col-md-2">
        <div style="margin-top: 40px"><label class="txt-logo-padrao">ValeOTour!</label></div>
        <div class="div-etapas-cadastro">
            <a href="./cadastro.php">
                <div class="botao-etapa-off">
                    <iconify-icon icon="fluent:data-area-24-regular" class="icon-etapa-off"></iconify-icon><label
                        class="txt-etapa-off">Dados Gerais</label>
                </div>
            </a>

            <div class="botao-etapa">
                <iconify-icon icon="carbon:location" class="icon-etapa"></iconify-icon><label
                    class="txt-etapa">Endereço</label>
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
                    <label class="label-input">Rua</label>
                    <input type="text" name="rua" id="" class="textbox-cadastro"
                        placeholder="Digite a rua do estabelecimento" value="<?php echo $input_rua; ?>" required>
                </div>

                <div class="div-input-cadastro col-md-5">
                    <label class="label-input">Cidade</label>
                    <select class="textbox-cadastro" name="cidade" id="cidade" required>
                        <option value="" disabled <?php if (!$input_cidade)
                            echo 'selected'; ?>>Selecione a cidade...
                        </option>
                        <option value="cananeia" <?php if ($input_cidade === 'Cananéia')
                            echo 'selected'; ?>>Cananéia
                        </option>
                        <option value="iguape" <?php if ($input_cidade === 'Iguape')
                            echo 'selected'; ?>>Iguape</option>
                        <option value="ilha-comprida" <?php if ($input_cidade === 'Ilha Comprida')
                            echo 'selected'; ?>>
                            Ilha Comprida</option>
                        <option value="iporanga" <?php if ($input_cidade === 'Iporanga')
                            echo 'selected'; ?>>Iporanga
                        </option>
                        <option value="miracatu" <?php if ($input_cidade === 'Miracatu')
                            echo 'selected'; ?>>Miracatu
                        </option>
                    </select>
                </div>

                <div class="div-input-cadastro col-md-5">
                    <label class="label-input">Número</label>
                    <input type="number" name="numero" id="" oninput="this.value = Math.max(0, Math.min(this.value, 999));" class="textbox-cadastro"
                        placeholder="Digite o número do estabelecimento" value="<?php echo $input_numero; ?>" required>
                </div>

                <div class="div-input-cadastro col-md-5">
                    <label class="label-input">Bairro</label>
                    <input type="text" name="bairro" id="" class="textbox-cadastro"
                        placeholder="Digite o bairro do estabelecimento" value="<?php echo $input_bairro; ?>" required>
                </div>

            </div>


            <div class="div-button-continuar">
                <button type="submit" class="button-continuar">Continuar<ion-icon name="arrow-forward-outline"
                        class="arrow-blue"></ion-icon></button>
            </div>
            <div class="espacamento-final"></div>

        </form>


    </div>


















</div>

<?php include("../../blades/footer-cadastro.php"); ?>