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

        $cidade = $_POST['cidade'];

        switch ($cidade) {
            case 'cananeia':
                $_SESSION['cidade'] = 'Cananéia';
                break;
            case 'iguape':
                $_SESSION['cidade'] = 'Iguape';
                break;
            case 'ilha-comprida':
                $_SESSION['cidade'] = 'Ilha Comprida';
                break;
            case 'iporanga':
                $_SESSION['cidade'] = 'Iporanga';
                break;
            case 'miracatu':
                $_SESSION['cidade'] = 'Miracatu';
                break;
            default:
                $_SESSION['cidade'] = '';
        }


        $_SESSION['rua'] = $rua;
        $_SESSION['bairro'] = $bairro;
        $_SESSION['numero'] = $numero;



        header("location: cadastro3.php");

        // echo "<script> alert('".$_SESSION['rua']. " " .$_SESSION['bairro']. " " .$_SESSION['cidade']. " " .$_SESSION['numero']. "')</script>";

        // $query_cadastro = "UPDATE pousadas SET rua_pousada = '$rua', bairro_pousada = '$bairro', cidade_pousada = '$cidade', numero_pousada = '$numero' WHERE email_pousada = 'teste'";

        // $mysqli->query($query_cadastro) or die("Falha na execução do código SQL cadastro: " . $mysqli->error);

        // echo "<script> alert('cadastrado com sucesso, efetue seu login')</script>";



    }

}


?>

<div class="tela-cadastro row container-fluid">
    <div class="menu-cadastro col-md-2">
    <a href="../../index.php"><div style="margin-top: 40px"><label class="txt-logo-padrao">ValeOTour!</label></div></a>
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
                <label class="titulo-cadastro">Cadastro</label>
                <label class="text-cadastro">Informações de Registro</label>
            </div>
        </div>

        <form action="" method="POST">
            <div class="area-inputs row">

                <div class="div-input-cadastro col-md-5">
                    <label class="label-input">Rua</label>
                    <input type="text" name="rua" id="" class="textbox-cadastro"
                        placeholder="Digite a rua do estabelecimento" required>
                </div>

                <div class="div-input-cadastro col-md-5">
                    <label class="label-input">Cidade</label>
                    <select class="textbox-cadastro" name="cidade" id="cidade" required>
                        <option value="" disabled selected>Selecione a cidade...</option>
                        <option value="cananeia">Cananéia</option>
                        <option value="iguape">Iguape</option>
                        <option value="ilha-comprida">Ilha Comprida</option>
                        <option value="iporanga">Iporanga</option>
                        <option value="miracatu">Miracatu</option>
                    </select>
                </div>

                <div class="div-input-cadastro col-md-5">
                    <label class="label-input">Número</label>
                    <input type="number" name="numero" id="" oninput="this.value = Math.max(0, Math.min(this.value, 999));"  class="textbox-cadastro"
                        placeholder="Digite o número do estabelecimento" required>
                </div>

                <div class="div-input-cadastro col-md-5">
                    <label class="label-input">Bairro</label>
                    <input type="text" name="bairro" id="" class="textbox-cadastro"
                        placeholder="Digite o bairro do estabelecimento" required>
                </div>

            </div>


    <div class="div-button-continuar">
               <button type="submit" class="button-continuar">Continuar<ion-icon name="arrow-forward-outline"
                     class="arrow-blue"></ion-icon></button>
            </div><div class="espacamento-final"></div>

      </form>


    </div>


















</div>

<?php include("../../blades/footer-cadastro.php"); ?>