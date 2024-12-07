<?php
include("blades/header.php");
?>

<div class="tela-inicial container-fluid">

    <?php
    include("blades/navbar.php");
    include("blades/offcanvas.php")
        ?>

    <div class="row container-fluid conteudo-tela-incial">

        <div class="col-md-5 offset-md-1 area-text-inicial">
            <label class="titulo-inicial">
                Conheça o <label class="txt-valedoribeira">Vale do Ribeira</label>
            </label>
            <br>

            <a href="#tela-cidades">
                <div class="botao-comecar btn btn-light">
                    <label class="txt-botao">COMEÇAR</label>
                    <ion-icon name="arrow-forward-outline" class="arrow"></ion-icon>
                </div>
            </a>

        </div>

        <div class="col-md-6 div-mobile-screens">
            <div class="background-home-image">

                <img src="src/imgs/home_image.png" class="home-image">

            </div>
        </div>
    </div>

</div>

<section class="section" id="tela-cidades"></section>
<div class="row tela-cidades container-fluid">

    <div class="offset-md-3 col-md-6 div-textos-tela2">
        <label class="subtitulo">
            <div class="background-icon-compass"><ion-icon name="compass-outline" class="icon-compass"></ion-icon></div>
            Explore a região
        </label>
        <p class="intertitulo">Descubra a natureza e cultura únicas do Vale do Ribeira, no sul de São Paulo, com suas
            paisagens deslumbrantes, comunidades tradicionais e rica biodiversidade.</p>
    </div>

    <?php
    include("blades/cards-cidade.php");
    ?>

</div>

<section class="section" id="eixos-turisticos"></section>
<div class="tela-eixos-turisticos row container-fluid">
    <div class="area-grids-eixos col-md-6">

        <div class="div-grids-eixos col-md-10">

            <div class="div-grid-eixo1">

                <div class="div-fake-eixo1">

                </div>

                <div class="div-eixo1">
                    <div class="div-add-icon">
                        <ion-icon name="add" style="font-size:32px"></ion-icon>
                    </div>

                    <div class="conteudo-text-eixo">
                        <label class="title-eixo">Histórico</label>
                        <label class="text-eixo">
                            Museus;<br>
                            Monumentos;<br>
                            Sítios arqueológicos;<br>
                            Edifícios históricos.<br>
                        </label>
                    </div>

                    <div class="background-eixo1"></div>

                </div>


                <div class="div-eixo2">
                    <div class="div-add-icon">
                        <ion-icon name="add" style="font-size:32px"></ion-icon>
                    </div>

                    <div class="conteudo-text-eixo">
                        <label class="title-eixo">Gastronômico</label>
                        <label class="text-eixo">
                            Restaurantes;<br>
                            Mercados de alimentos;<br>
                            Vinícolas;<br>
                            Festivais gastronômicos.<br>
                        </label>
                    </div>

                    <div class="background-eixo2"></div>

                </div>


            </div>

            <div class="div-grid-eixo2">



                <div class="div-eixo3">
                    <div class="div-add-icon">
                        <ion-icon name="add" style="font-size:32px"></ion-icon>
                    </div>


                    <div class="conteudo-text-eixo">
                        <label class="title-eixo">Ecológico</label>
                        <label class="text-eixo">
                            Parques nacionais;<br>
                            Reservas naturais;<br>
                            Ecossistemas preservados.<br>
                        </label>
                    </div>

                    <div class="background-eixo3"></div>


                </div>

                <div class="div-eixo4">
                    <div class="div-add-icon">
                        <ion-icon name="add" style="font-size:32px"></ion-icon>
                    </div>


                    <div class="conteudo-text-eixo">
                        <label class="title-eixo">Aventura</label>
                        <label class="text-eixo">
                            Escalada;<br>
                            Trilhas;<br>
                            Rafting; <br>
                            Esportes radicais.<br>
                        </label>
                    </div>

                    <div class="background-eixo4"></div>


                </div>

                <div class="div-fake-eixo2">

                </div>



            </div>

        </div>

    </div>


    <div class="area-text-eixos col-md-6">



        <div class="conteudo-text-eixos col-md-10">
            <div class="green-line-eixo"></div>
            <label class="text-principal-eixos">
                Transforme <br>
                suas <br>
                <label class="text-green">viagens!</label>
            </label>
            <label class="descricao-eixos">
                Descubra guias turísticos experientes que trazem um toque pessoal e conhecimento local único às suas
                viagens.
            </label>
        </div>

    </div>
</div>



<section class="section" id="beneficios"></section>
<div class="tela-beneficios-nova container-fluid row">
    <div class="area-texts-beneficios col-md-6">

        <div class="col-md-8 conteudo-text-beneficios">
            <div class="">
                <label class="text-principal-beneficios">
                    Adquira
                    nosso <br>
                    <label class="text-green">aplicativo!</label>
                </label>
                <label class="descricao-beneficios">Customize suas viagens, descubra novos destinos e muito
                    mais.</label>
            </div>

            <div class="button-baixar-app btn btn-primary">
                <label class="">BAIXAR APP</label>
                <ion-icon name="arrow-forward-outline" class="arrow-button-baixar-app"></ion-icon>
            </div>
        </div>

    </div>
    <div class="area-cards-beneficios col-md-6">

        <div class="conteudo-cards-beneficios col-md-11 offset-md-1" id="carrossel-beneficios">
            <div class="card-beneficios">
                <label class="text-beneficio-card">Benefícios</label>
                <label class="title-card-beneficio">Planejamento e Organização</label>
                <label class="descricao-card-beneficio">Com nosso é possível centralizar todas as informações
                    necessárias para planejar e organizar sua viagem, tornando o processo mais eficiente.</label>
                <div class="div-icon-beneficio">
                    <div class="icon-lista"></div>
                </div>
                <div class="background-pin"></div>
            </div>

            <div class="card-beneficios">
                <label class="text-beneficio-card">Benefícios</label>
                <label class="title-card-beneficio">Experiência Personalizada</label>
                <label class="descricao-card-beneficio">O ValeOTuor pode oferecer experiências personalizadas e
                    dinâmicas, ajustando-se as suas necessidades e preferências.</label>
                <div class="div-icon-beneficio">
                    <div class="icon-pen-line"></div>
                </div>
                <div class="background-pin"></div>
            </div>

            <div class="card-beneficios">
                <label class="text-beneficio-card">Benefícios</label>
                <label class="title-card-beneficio">Novos Destinos</label>
                <label class="descricao-card-beneficio">Descubra novos destinos menos conhecidos, explore novas áreas e
                    ganhe a oportunidade de vivenciar experiências autênticas.</label>
                <div class="div-icon-beneficio">
                    <div class="icon-map-marker"></div>
                </div>
                <div class="background-pin"></div>
            </div>



        </div>

        <div class="btn-avancar" id="btn-avancar-beneficios">
            <ion-icon name="arrow-forward-outline" class="arrow-beneficios"></ion-icon>
        </div>


    </div>
</div>

<section class="section" id="colabore"></section>
<div class="tela-colabore row container-fluid">
    <div class="conteudo-tela-colabore">

        <div class="screen-colabore"></div>

        <div class="conteudo-text-colabore col-md-5">
            <label class="title-colabore">Conheça novos <label class="maincolor-text">destinos!</label></label>
            <label class="subtitle-colabore">Sentiu falta do seu estabelecimento? Cadastre novos
                lugares e ajude-nos a explorar o Vale do Ribeira</label>

            <a href="src/screens/cadastro.php" style="text-decoration: none;">
                <div class="botao-cadastro-colabore btn btn-light">
                    <label class="txt-botao">REALIZAR CADASTRO</label>
                    <ion-icon name="arrow-forward-outline" class="arrow"></ion-icon>
                </div>
            </a>

        </div>

    </div>



    <div class="divisao-colabore col-md-12"></div>
</div>


<div class="background-footer">
    <div class="footer container-fluid">
        <div class="conteudo-footer col-md-12">
            <div class="row-sections-footer">
                <label class="text-section-footer">Início</label>
                <label class="text-section-footer">Cidades</label>
                <label class="text-section-footer">Eixos Turísticos</label>
                <label class="text-section-footer">Benefícios</label>
                <label class="text-section-footer">Cadastro</label>
            </div>
            <div class="row-footer2">
                <label>Encontre novos destinos</label>
                <label>Contato</label>
            </div>
            <div class="row-footer3">
                <div class="icons-footer">
                    <ion-icon name="logo-instagram"></ion-icon>
                    <ion-icon name="logo-github"></ion-icon>
                </div>
                <div class="email-valeotour-footer">valleytoup@gmail.com</div>
            </div>
            <hr class="hr-footer col-md-12">
            <label class="text-center">By ValeOTuorGroup</label>
        </div>
    </div>
</div>



<?php
include("blades/footer.php");
?>