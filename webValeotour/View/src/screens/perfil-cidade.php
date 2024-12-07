<?php include("../../blades/header-screens.php");

$id = $_GET['id'];
$json = file_get_contents('cidades.json');
$dados = json_decode($json, true);
$nome_cidade = $dados[$id]['nome_cidade'];
$img_cidade = $dados[$id]['img_cidade'];
$text_cidade = $dados[$id]['text_cidade'];
$ov_1 = $dados[$id]['ov_1'];
$ov_2 = $dados[$id]['ov_2'];
$carousel_1 = $dados[$id]['carousel_1'];
$carousel_2 = $dados[$id]['carousel_2'];
$carousel_3 = $dados[$id]['carousel_3'];
$carousel_4 = $dados[$id]['carousel_4'];


?>

<nav class="navbar fixed-top navbar-light">
    <div class="div-navbar">
        <!-- <a data-bs-toggle="offcanvas" data-bs-target="#demo"><ion-icon name="menu-outline"
                class="menu-icon changecolor"></ion-icon></a> -->
        <a href="../../index.php"><label class="txt-logo changecolor">ValeOTour!</label></a>
        <div class="div-labels-navbar">
            <a href="../../index.php"><label class="label-navbar changecolor2">Inicio</label></a>
            <a href="../../index.php#tela-cidades"><label class="label-navbar changecolor2">Cidades</label></a>
            <a href="../../index.php#eixos-turisticos"><label class="label-navbar changecolor2">Eixos
                    Turísticos</label></a>
            <a href="../../index.php#beneficios"><label class="label-navbar changecolor2">Beneficios</label></a>
            <a href="../../index.php#colabore"><label class="label-navbar changecolor2">Colabore</label></a>
        </div>

        <div class="btns-navbar">
            <a href="./src/screens/cadastro.php" style="text-decoration:none !important">
                <div class="btn-login-navbar changecolor2">Sign Up</div>
            </a>
            <a href="./src/screens/login.php">
                <div class="btn-login-navbar changecolor2">Sign In</div>
            </a>
        </div>

    </div>
</nav>




<div class="tela-inicial-cidades row container-fluid">
    <div class="area-text-cidades col-md-5">
        <div class="conteudo-text-cidades col-md-8">
            <label class="cidade-subtitle">Cidade</label>
            <label class="cidade-title">Visite <br><label
                    class="cidade-name-title"><?php echo $nome_cidade; ?></label></label>
            <div class="botao-cidades btn btn-light">
                <label class="txt-botao">COMEÇAR</label>
                <ion-icon name="arrow-forward-outline" class="arrow"></ion-icon>
            </div>
        </div>
    </div>
    <!-- <?php echo $img_cidade; ?> -->

    <div class='area-img-cidades col-md-7'>

        <div class="div-button-cidade col-md-2" id="button-control-cards"><ion-icon name="arrow-back" id="arrow-back"></ion-icon></div>

        <div class="col-md-10 grid-carousel">

            <?php
            for($i = 0; $i < 2; $i++){
                echo $carousel_1;
                echo $carousel_2;
                echo $carousel_3;
                echo $carousel_4;
            }
            
            ?>



        </div>

    </div>
</div>
<div class="tela-mais-informacoes">
    <div class="conteudo-tela-mais-informacoes">
        <div class="title-mais-informacoes">
            <div class="background-icon-compass"><ion-icon name="compass-outline" class="icon-compass"></ion-icon></div>
            História
        </div>
        <label class="text-mais-informacoes"><?php echo $text_cidade; ?></label>
    </div>

    <div class="tela-onde-visitar">
        <div class="title-onde-visitar">
            <div class="background-icon-compass"><ion-icon name="compass-outline" class="icon-compass"></ion-icon></div>
            Onde Visitar?
        </div>

        <div class="wrap-cards-onde-visitar">
            <?php echo $ov_1; ?>
            <?php echo $ov_2; ?>

        </div>
    </div>

    <div style="height:200px"></div>
</div>

<script src="../../../Controller/control_cards.js"></script>

<?php include("../../blades/footer.php"); ?>