<?php
// redireciona para a página de proteção, para que não seja possível entrar nessa página sem login
include("./protect.php");
include('../../../controller/php/conexao.php');


if (!isset($_SESSION)) {
    session_start();
}

$status_verificacao = $_SESSION['status_verificacao'] == "Aguardando verificação" ? $_SESSION['status_verificacao'] . "..." : $_SESSION['status_verificacao'] . "!";

$nome = $_SESSION['name'];
$tipo = $_SESSION['tipo'];
$email = $_SESSION['email'];
$rua = $_SESSION['rua'];
$bairro = $_SESSION['bairro'];
$numero = $_SESSION['numero'];
$cidade = $_SESSION['cidade'];
$telefone = $_SESSION['telefone'];
$eixo = $_SESSION['eixo'];
$latitude = $_SESSION['latitude'];
$longitude = $_SESSION['longitude'];

$descricao = $_SESSION['descricao'];
$foto_principal = $_SESSION['foto_principal'];
$id_ponto_turistico = $_SESSION['id'];

$horarios_funcionamento = $_SESSION['horarios_funcionamento'];
$comentarios = $_SESSION['comentarios'];
$numero = $numero == 0 ? '' : $numero . ' - ';
$bairro = empty($bairro) ? '' : $bairro . ',';
$endereco = $rua . ', ' . $numero . $cidade . ' - SP';

if (isset($tipo) && $tipo == 'Trilha') {
    $trilha = $_SESSION['trilha'];

    if (isset($trilha[0]['tempo_trilha'])) {
        $tempo_trilha = $trilha[0]['tempo_trilha'];
    }
    if (isset($trilha[0]['dificuldade_trilha'])) {
        $dificuldade_trilha = $trilha[0]['dificuldade_trilha'];
    }
    if (isset($trilha[0]['distancia_trilha'])) {
        $distancia_trilha = $trilha[0]['distancia_trilha'];
    }



}

$fotos = $_SESSION['fotos'];

$avaliacoes = $_SESSION['avaliacao'];

$contagem_estrelas = [
    5 => 0,
    4 => 0,
    3 => 0,
    2 => 0,
    1 => 0
];

if (!empty($avaliacoes)) {
    foreach ($avaliacoes as $avaliacao) {
        $estrela = floor($avaliacao['qtd_estrela_avaliacao_pt']);
        if (isset($contagem_estrelas[$estrela])) {
            $contagem_estrelas[$estrela]++;
        }
    }
}

$estrelas_json = json_encode(array_values($contagem_estrelas));

//QUERY VERIFICAÇÃO
$code_verificacao = "SELECT * FROM verificacoes_pontos_turisticos WHERE id_ponto_turistico = " . $id_ponto_turistico;
$query = $mysqli->query($code_verificacao) or die("Falha na execução do código SQL cadastro: " . $mysqli->error);

while ($fetch_verificacao = $query->fetch_assoc()) {
    $verificacao[] = $fetch_verificacao;
}

?>


<?php include('../../blades/header-screens.php'); ?>

<div class="wrapper-perfil container-fluid row">

    <div class="col-md-2 menu-perfil">
        <a href="#"><label class="txt-logo text-maincolor mt-4">ValeOTour!</label></a>

        <div class="border-foto-perfil">
            <div class="foto-perfil">
                <style>
                    .foto-perfil {
                        background-image: url('../../../../valeotour/pontos_turisticos/assets/<?php echo $_SESSION['foto_principal']; ?>');
                    }
                </style>
            </div>
        </div>

        <label class="nome-perfil"><?php echo ucwords($nome); ?></label>
        <label class="endereco-menu">
            <ion-icon name="location-outline"></ion-icon>
            <?php echo $cidade ?>
        </label>

        <a href="./alterar-dados.php">
            <div class="btn-alterar-dados btn botao btn-primary mt-5">
                <ion-icon class="icon-pencil" name="pencil"></ion-icon> Alterar Dados
            </div>
        </a>

        <a href="./logout.php">
            <div class="btn-logout btn botao">
                <ion-icon class="icon-exit" name="exit-outline"></ion-icon>Sair da Conta
            </div>
        </a>

    </div>

    <div class="area-perfil col-md-10 offset-md-2">

        <div class="conteudo-perfil">

            <div class="icon-text-perfil">
                <div class="background-icon-perfil">
                    <ion-icon class="icon-perfil" name="person-outline"></ion-icon>
                </div>

                <div class="title-perfil">
                    <label>Informações do Perfil</label>
                    <div class="subtitle-perfil">Informações de Registro</div>
                </div>
            </div>

            <div class="aviso-verificacao col-md-12" <?php echo $status_verificacao == 'Reprovado!' ? 'id="abrir-modal"' : '';?>>

                <div class="background-domain-verification">
                    <iconify-icon icon="ic:round-domain-verification" class="icon-domain-verification"></iconify-icon>
                </div>

                <label class="txt-verificacao">Status da verificação: <label
                        style="font-weight:500"><?php echo $status_verificacao; ?></label></label>

                <iconify-icon icon="ic:outline-info" class="icon-info"></iconify-icon>

            </div>

            <div class="conteudo-cards-infos col-md-12">

                <div class="grid-cards-gerais col-md-7 row">



                    <div class="card-dados-gerais col-md-6 row">

                        <div class="title-dados-gerais col-md-12">Dados Gerais</div>

                        <div class="celula-dados-gerais col-md-5">

                            <div class="title-celula-dg">
                                Nome
                            </div>

                            <div class="text-celula-dg">
                                <?php if (!isset($nome)) {
                                    echo 'Não preenchido<label style="color:#f00">*</label>';
                                } else {
                                    echo $nome;
                                } ?>
                            </div>

                        </div>

                        <div class="celula-dados-gerais col-md-5">

                            <div class="title-celula-dg">
                                Tipo
                            </div>

                            <div class="text-celula-dg">
                                <?php if (!isset($tipo)) {
                                    echo 'Não preenchido<label style="color:#f00">*</label>';
                                } else {
                                    echo $tipo;
                                } ?>
                            </div>

                        </div>

                        <div class="celula-dados-gerais col-md-5">

                            <div class="title-celula-dg">
                                E-mail
                            </div>

                            <div class="text-celula-dg" style="word-break: break-all;">
                                <?php if (!isset($email)) {
                                    echo 'Não preenchido<label style="color:#f00">*</label>';
                                } else {
                                    echo $email;
                                } ?>
                            </div>

                        </div>

                        <div class="celula-dados-gerais col-md-5">

                            <div class="title-celula-dg">
                                Endereço
                            </div>

                            <div class="text-celula-dg">
                                <?php if (!isset($endereco)) {
                                    echo 'Não preenchido<label style="color:#f00">*</label>';
                                } else {
                                    echo $endereco;
                                } ?>
                            </div>

                        </div>

                        <div class="celula-dados-gerais col-md-5">

                            <div class="title-celula-dg">
                                Telefone
                            </div>

                            <div class="text-celula-dg">
                                <?php if (!isset($_SESSION['telefone'])) {
                                    echo 'Não preenchido<label style="color:#f00">*</label>';
                                } else {
                                    echo $_SESSION['telefone'];
                                } ?>
                            </div>

                        </div>

                        <div class="celula-dados-gerais col-md-5">

                            <div class="title-celula-dg">
                                Eixo
                            </div>

                            <div class="text-celula-dg">
                                <?php if (!isset($eixo)) {
                                    echo 'Não preenchido<label style="color:#f00">*</label>';
                                } else {
                                    echo $eixo;
                                } ?>
                            </div>

                        </div>



                    </div>

                    <div class="card-funcionamento col-md-5">

                        <div class="title-funcionamento">Funcionamento</div>

                        <div class="grid-dias-semana">

                            <?php
                            foreach ($horarios_funcionamento as $dados_funcionamento) {
                                echo '<div class="row-dia-semana row">';
                                echo '<div class="text-dia-semana col-md-6">' . $dados_funcionamento['dia_da_semana'] . '</div>';

                                if ($dados_funcionamento['hora_abertura'] == '00:00:00' && $dados_funcionamento['hora_fechamento'] == '00:00:00') {
                                    echo '<div class="horario-dia-semana col-md-6">Fechado</div>';
                                } else {
                                    // Remove os segundos
                                    $hora_abertura = substr($dados_funcionamento['hora_abertura'], 0, 5); // pega "HH:MM"
                                    $hora_fechamento = substr($dados_funcionamento['hora_fechamento'], 0, 5); // pega "HH:MM"
                            
                                    echo '<div class="horario-dia-semana col-md-6">' . $hora_abertura . '-' . $hora_fechamento . '</div>';
                                }

                                echo '</div>';
                            }
                            ?>
                        </div>


                    </div>

                    <div class="card-descricao col-md-<?php if (!empty($_SESSION['avaliacao'])) {
                        echo '6';
                    } else {
                        echo '12';
                    } ?> ">

                        <div class="title-descricao">Descrição</div>

                        <div class="text-descricao"><?php echo $_SESSION['descricao']; ?></div>

                    </div>

                    <?php
                    if (!empty($_SESSION['avaliacao'])) {
                        echo '
                        <div class="card-estatisticas col-md-5">
                        <div class="title-estatisticas">Estatísticas</div>
                        <div class="text-media-avaliacao">' . round($comentarios[0]["media_estrelas"], 1) . '<ion-icon name="star"></ion-icon></div>

                        <canvas id="graficoEstrelas" class="grafico-estrelas"></canvas>


                    </div>
                        ';
                    }
                    ?>

                    <script>
                        // Puxa as contagens de estrelas do PHP
                        const estrelasData = <?php echo $estrelas_json; ?>;

                        // Labels e cores para o gráfico
                        const labels = ['5 Estrelas', '4 Estrelas', '3 Estrelas', '2 Estrelas', '1 Estrela'];
                        const backgroundColors = [
                            '#1E90FF', // Azul
                            '#00BFFF', // Azul claro
                            '#87CEFA', // Azul mais claro
                            '#4682B4', // Azul mais escuro
                            '#B0C4DE'  // Azul claro metálico
                        ];

                        // Configuração do gráfico
                        const data = {
                            labels: labels,
                            datasets: [{
                                data: estrelasData,
                                backgroundColor: backgroundColors,
                                hoverOffset: 4
                            }]
                        };

                        const config = {
                            type: 'doughnut', // Tipo do gráfico (doughnut para gráfico de anel)
                            data: data,
                            options: {
                                plugins: {
                                    legend: {
                                        position: 'right',
                                    },
                                    datalabels: {
                                        color: '#fff',           // Cor dos números
                                        font: {
                                            weight: 'bold',
                                            size: 16
                                        },
                                        formatter: (value, context) => {
                                            return value;         // Mostra o valor (quantidade de estrelas)
                                        }
                                    }
                                },
                                responsive: true
                            }
                        };

                        // Renderiza o gráfico na página
                        const ctx = document.getElementById('graficoEstrelas').getContext('2d');
                        const graficoEstrelas = new Chart(ctx, config);
                    </script>



                    <div class="card-fotos-secundarias col-md-11-5">

                        <div class="title-fotos-secundarias">
                            Fotos Secudárias
                        </div>

                        <div class="grid-fotos-secundarias col-md-12 row">


                            <?php
                            if (!empty($fotos)) {
                                foreach ($fotos as $foto) {
                                    echo '<img src="../../../../valeotour/pontos_turisticos/assets/' . $foto['caminho_imagem_pt'] . '" class="foto-secundaria col-md-3-5" style="margin-bottom: 20px;"> <br>';
                                }
                            } else {
                                echo '<label class="mt-5 text-center">Sem fotos secundarias</label>';
                            }


                            ?>



                            <!-- <img src="../../../../valeotour/pontos_turisticos/assets/<?php echo $_SESSION['foto_principal']; ?>"
                                class="foto-secundaria col-md-3-5"> <br> -->



                        </div>

                    </div>

                    <div class="card-endereco col-md-<?php if (isset($tipo) && $tipo == 'Trilha') {
                        echo '6';
                    } else {
                        echo '12';
                    } ?> >">

                        <div class="title-endereco">
                            Endereço
                        </div>

                        <div class="mapa-endereco col-md-12" id="mapa-endereco">
                            <script
                                src="https://maps.googleapis.com/maps/api/js?key=AIzaSyDZnbTIFfvqwB9EUvj9M_5A853CaxD3SqM"></script>

                            <script>
                                var latitude = <?php echo $latitude; ?>;
                                var longitude = <?php echo $longitude; ?>;

                                function initMap() {
                                    var map = new google.maps.Map(document.getElementById('mapa-endereco'), {
                                        zoom: 13,
                                        center: { lat: latitude, lng: longitude },
                                        streetViewControl: false,
                                        mapTypeControl: false
                                    });

                                    var marker = new google.maps.Marker({
                                        position: { lat: latitude, lng: longitude },
                                        map: map
                                    });

                                    // var infoWindow = new google.maps.InfoWindow({
                                    //     content: 'Seu estabelecimento'
                                    // });

                                    infoWindow.open(map, marker);

                                    marker.addListener('click', function () {
                                        infoWindow.open(map, marker);
                                    });
                                }

                                initMap();
                            </script>
                        </div>


                    </div>

                    <?php
                    if (isset($tipo) && $tipo == 'Trilha') {
                        echo '
                            <div class="card-trilha col-md-5">

                                <div class="title-trilha">Trilha</div>

                                <div class="grid-trilha">
                                    <div class="subtitle-text-trilha">
                                        <div class="subtitle-trilha">Distancia</div>
                                        <div class="text-trilha">';
                        echo $distancia_trilha;
                        echo 'Km</div>
                                    </div>

                                    <div class="subtitle-text-trilha">
                                        <div class="subtitle-trilha">Dificuldade</div>
                                        <div class="text-trilha">';
                        echo $dificuldade_trilha;
                        echo '</div>
                                    </div>

                                    <div class="subtitle-text-trilha">
                                        <div class="subtitle-trilha">Tempo Médio</div>
                                        <div class="text-trilha">';
                        echo substr($tempo_trilha, 0, 5);
                        echo 'h</div>
                                    </div>
                                </div>
                            </div>
                        ';
                    }

                    ?>

                </div>

                <div class="grid-comentarios-perfil col-md-4">

                    <div class="top-grid-comentario">
                        <div class="title-grid-comentario">
                            Comentários
                        </div>

                        <div class="filtro-grid-comentario">
                            <ion-icon class="icon-filtro" name="filter"></ion-icon>
                        </div>
                    </div>

                    <div class="cards-grid-comentario col-md-12">




                        <!-- para cada comentario ele vai criar uma div com o comentario -->
                        <?php
                        if (!empty($comentarios)) {
                            foreach ($comentarios as $comentario) {
                                echo '<div class="card-comentario row col-md-11"><div class="area-foto-comentario col-md-2"><div class="foto-comentario" style="background-image: url(\'../../../../valeotour/usuarios/assets/' . $comentario['caminho_imagem_usuario'] . '\')"></div>';
                                echo '</div><div class="conteudo-text-comentario col-md-10"><div class="nome-comentario">';
                                echo $comentario['nome_usuario'];
                                echo '</div><div class="text-comentario">';
                                echo $comentario['comentario_avaliacao_pt'];
                                echo '</div><div class="footer-comentario col-md-12"><div class="avaliacao-comentario">';
                                echo $comentario['qtd_estrela_avaliacao_pt'];
                                echo '<ion-icon name="star"></ion-icon></div><div class="data-comentario">';
                                $data = $comentario['data_avaliacao'];
                                $data = date("d/m/Y", strtotime($data));
                                echo $data;
                                echo '</div></div></div></div>';

                            }
                        } else {
                            echo '<label class="mt-5">Sem comentários</label>';
                        }

                        ?>




                    </div>

                </div>

            </div>



        </div>


    </div>

</div>

<?php
if ($status_verificacao == "Reprovado!") {
    echo '
    <div class="background-modal" id="background-modal"></div>
    <div class="modal-notificacao" id="modal">
        <div class="row-close-modal" id="cancelar-modal"><iconify-icon icon="ion:close" class="icon-close-modal"></iconify-icon></div>
        <div class="row-cadastro-recusado">
            <div class="background-alert"><iconify-icon icon="line-md:alert-loop" class="icon-alert"></iconify-icon></div>
            <label class="title-modal">Cadastro Reprovado</label>
        </div>
        <div style="display:flex;flex-direction:row;width:100%;margin-top:40px">
            <div class="row-conteudo-modal">
                <label>Parece que houve um problema com as informações fornecidas para cadastro de <b
                        style="color:#2d2d2e">' . $nome . '</b>. Por favor, verifique:</label>
                <label class="lista-verificacao">';
                include("./query_verificacao.php");
    echo '      </label>
            </div>
            <div class="row-comentario-modal">
                <label class="title-comentario">Comentário do administrador:</label>
                <label class="comentario">' . 
                    ($verificacao[0]["comentario_v"] != "Aguardando verificação" ? $verificacao[0]["comentario_v"] : "") . 
                '</label>
            </div>
        </div>
        <div class="row-botoes-modal">
            <div class="button-cancelar-modal" id="cancelar-modal">Cancelar</div>
            <div class="button-alterar-modal" id="alterar-modal">Alterar</div>
        </div>
    </div>
    ';
}
?>



<?php include('../../blades/footer.php'); ?>9