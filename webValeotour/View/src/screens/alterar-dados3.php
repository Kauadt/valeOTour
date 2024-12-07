<?php include("../../blades/header-screens.php");

include('../../../controller/php/conexao.php');

if (!isset($_SESSION)) {
   session_start();
}

if (isset($_POST['descricao'])) {
   $_SESSION['alter_descricao'] = $_POST['descricao'];
}

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
   $latitude = $_POST['latitude'];
   $longitude = $_POST['longitude'];

   $_SESSION['latitude'] = $latitude;
   $_SESSION['longitude'] = $longitude;
}




if (isset($_POST['dias']) && in_array('segunda', $_POST['dias'])) {
   $_SESSION['abertura_segunda'] = $_POST['abertura_segunda'];
   $_SESSION['fechamento_segunda'] = $_POST['fechamento_segunda'];
   $_SESSION['status_segunda'] = 'Aberto';

} else {
   $_SESSION['abertura_segunda'] = null;
   $_SESSION['fechamento_segunda'] = null;
   $_SESSION['status_segunda'] = 'Fechado';
}

// Terça-feira
if (isset($_POST['dias']) && in_array('terca', $_POST['dias'])) {
   $_SESSION['abertura_terca'] = $_POST['abertura_terca'];
   $_SESSION['fechamento_terca'] = $_POST['fechamento_terca'];
   $_SESSION['status_terca'] = 'Aberto';

} else {
   $_SESSION['abertura_terca'] = null;
   $_SESSION['fechamento_terca'] = null;
   $_SESSION['status_terca'] = 'Fechado';
}

// Quarta-feira
if (isset($_POST['dias']) && in_array('quarta', $_POST['dias'])) {
   $_SESSION['abertura_quarta'] = $_POST['abertura_quarta'];
   $_SESSION['fechamento_quarta'] = $_POST['fechamento_quarta'];
   $_SESSION['status_quarta'] = 'Aberto';

} else {
   $_SESSION['abertura_quarta'] = null;
   $_SESSION['fechamento_quarta'] = null;
   $_SESSION['status_quarta'] = 'Fechado';
}

// Quinta-feira
if (isset($_POST['dias']) && in_array('quinta', $_POST['dias'])) {
   $_SESSION['abertura_quinta'] = $_POST['abertura_quinta'];
   $_SESSION['fechamento_quinta'] = $_POST['fechamento_quinta'];
   $_SESSION['status_quinta'] = 'Aberto';
} else {
   $_SESSION['abertura_quinta'] = null;
   $_SESSION['fechamento_quinta'] = null;
   $_SESSION['status_quinta'] = 'Fechado';
}

// Sexta-feira
if (isset($_POST['dias']) && in_array('sexta', $_POST['dias'])) {
   $_SESSION['abertura_sexta'] = $_POST['abertura_sexta'];
   $_SESSION['fechamento_sexta'] = $_POST['fechamento_sexta'];
   $_SESSION['status_sexta'] = 'Aberto';
} else {
   $_SESSION['abertura_sexta'] = null;
   $_SESSION['fechamento_sexta'] = null;
   $_SESSION['status_sexta'] = 'Fechado';
}

// Sábado
if (isset($_POST['dias']) && in_array('sabado', $_POST['dias'])) {
   $_SESSION['abertura_sabado'] = $_POST['abertura_sabado'];
   $_SESSION['fechamento_sabado'] = $_POST['fechamento_sabado'];
   $_SESSION['status_sabado'] = 'Aberto';
} else {
   $_SESSION['abertura_sabado'] = null;
   $_SESSION['fechamento_sabado'] = null;
   $_SESSION['status_sabado'] = 'Fechado';
}

// Domingo
if (isset($_POST['dias']) && in_array('domingo', $_POST['dias'])) {
   $_SESSION['abertura_domingo'] = $_POST['abertura_domingo'];
   $_SESSION['fechamento_domingo'] = $_POST['fechamento_domingo'];
   $_SESSION['status_domingo'] = 'Aberto';
} else {
   $_SESSION['abertura_domingo'] = null;
   $_SESSION['fechamento_domingo'] = null;
   $_SESSION['status_domingo'] = 'Fechado';
}

if (isset($_SESSION['alter_tipo']) && $_SESSION['alter_tipo'] == 'Trilha' && isset($_POST['distancia_trilha']) && isset($_POST['tempo_trilha'])) {


   $dificuldade = $_POST['dificuldade_trilha'];

   switch ($dificuldade) {
      case 'facil':
         $_SESSION['alter_dificuldade'] = 'Fácil';
         break;
      case 'medio':
         $_SESSION['alter_dificuldade'] = 'Médio';
         break;
      case 'dificil':
         $_SESSION['alter_dificuldade'] = 'Difícil';
         break;
      default:
         $_SESSION['alter_dificuldade'] = '';
   }

   $_SESSION['alter_distancia'] = $_POST['distancia_trilha'];
   $_SESSION['alter_tempo'] = $_POST['tempo_trilha'];

}







if ($_SERVER['REQUEST_METHOD'] == 'POST') {
   // Verifica se o campo 'imagem_principal' existe em $_FILES e se o arquivo foi enviado sem erros
   if (isset($_FILES['imagem_principal']) && $_FILES['imagem_principal']['error'] === UPLOAD_ERR_OK) {
      $arquivo = $_FILES['imagem_principal'];

      $photo_name = basename($arquivo['name']);
      $extensao = pathinfo($photo_name, PATHINFO_EXTENSION);

      $random_name = rand(1000, 1000000) . "-" . pathinfo($photo_name, PATHINFO_FILENAME);

      $nomeArquivo = $random_name . '.' . $extensao;

      $_SESSION['imagem_principal'] = $nomeArquivo;

      $diretorio = "../../../../valeotour/pontos_turisticos/assets";

      $destino = $diretorio . "/" . $nomeArquivo;

      if (move_uploaded_file($arquivo['tmp_name'], $destino)) {
         $_SESSION['arquivo'] = $nomeArquivo;
         echo "Arquivo enviado com sucesso! Nome do arquivo: " . $nomeArquivo;
         $imagem_antiga = '../../../../valeOTour/pontos_turisticos/assets/' . $_SESSION['foto_principal'];
         if (file_exists($imagem_antiga)) {
            unlink($imagem_antiga);
         }
      } else {
         echo "Falha ao enviar o arquivo.";
      }
   } else {
      if (isset($_FILES['imagem_principal'])) {
         $erro = $_FILES['imagem_principal']['error'];
         echo "Erro no upload do arquivo. Código do erro: $erro";
      } else {
         echo "Nenhum arquivo foi enviado.";
      }
   }
}


$errors = [];


if ($_SERVER['REQUEST_METHOD'] == 'POST') {
   if (isset($_FILES['imagens']) && !empty($_FILES['imagens']['name'][0])) {
      $files = $_FILES['imagens'];
      $diretorio = "../../../../valeotour/pontos_turisticos/assets";

      // Verifica se o diretório existe; caso contrário, cria-o
      if (!is_dir($diretorio)) {
         echo "O diretório não existe.";
         header("Location: sistemaalterar.php");
         // exit; // Certifique-se de que o script não continue após o redirecionamento
      }

      $total_files = count($files['name']);
      $imagens = []; // Array para armazenar os nomes dos arquivos
      $errors = []; // Array para armazenar os erros

      for ($i = 0; $i < $total_files; $i++) {
         $fileName = $files['name'][$i];
         $tmpName = $files['tmp_name'][$i];
         $error = $files['error'][$i];
         $size = $files['size'][$i];

         // Verifica se não houve erro no upload
         if ($error === UPLOAD_ERR_OK) {
            $extensao = pathinfo($fileName, PATHINFO_EXTENSION);

            // Gere um nome de arquivo único
            $random_name = rand(1000, 1000000) . "-" . pathinfo($fileName, PATHINFO_FILENAME);
            $nomeArquivo = $random_name . '.' . $extensao;

            // Define o caminho para o arquivo
            $destino = $diretorio . "/" . $nomeArquivo;

            // Move o arquivo para o diretório de destino
            if (move_uploaded_file($tmpName, $destino)) {
               $imagens[] = $nomeArquivo; // Adiciona o nome do arquivo ao array
            } else {
               $errors[] = "Falha ao enviar o arquivo $fileName.";
            }
         } else {
            $errors[] = "Erro no upload do arquivo $fileName. Código do erro: $error";
         }
      }

      // Armazena os nomes das imagens na sessão, se houver
      if (!empty($imagens)) {
         $_SESSION['imagens'] = $imagens;
      }

      // Se houver erros, você pode tratá-los ou exibi-los
      if (!empty($errors)) {
         foreach ($errors as $error) {
            echo $error . "<br>";
         }
      }

      // Após o processamento, redireciona para a página
      header("Location: sistemaalterar.php");
      // exit;
   } else {
      // Caso nenhuma imagem tenha sido enviada
      header("Location: sistemaalterar.php");
      // exit;
   }
}






//INSERIR DADOS NAS TEXTBOX

if (!isset($_SESSION)) {
   session_start();
}

$input_descricao = $_SESSION['descricao'];
$input_latitude = $_SESSION['latitude'];
$input_longitude = $_SESSION['longitude'];

if (isset($_SESSION['trilha'][0]['distancia_trilha'])) {
   $input_distancia = $_SESSION['trilha'][0]['distancia_trilha'];
}

if (isset($_SESSION['trilha'][0]['dificuldade_trilha'])) {
   $input_dificuldade = $_SESSION['trilha'][0]['dificuldade_trilha'];
}

if (isset($_SESSION['trilha'][0]['tempo_trilha'])) {
   $input_tempo = $_SESSION['trilha'][0]['tempo_trilha'];
}




?>

<div class="tela-cadastro3 row container-fluid">

   <div class="menu-cadastro col-md-2">
      <div style="margin-top: 40px"><label class="txt-logo-padrao-off">ValeOTour!</label></div>
      <div class="div-etapas-cadastro">
         <a href="./cadastro.php">
            <div class="botao-etapa-off">
               <iconify-icon icon="fluent:data-area-24-regular" class="icon-etapa-off"></iconify-icon><label
                  class="txt-etapa-off">Dados Gerais</label>
            </div>
         </a>

         <a href="./cadastro2.php">
            <div class="botao-etapa-off">
               <iconify-icon icon="carbon:location" class="icon-etapa-off"></iconify-icon><label
                  class="txt-etapa-off">Endereço</label>
            </div>
         </a>

         <div class="botao-etapa">
            <iconify-icon icon="ic:baseline-plus" class="icon-etapa"></iconify-icon><label
               class="txt-etapa">Adicionais</label>
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


      <form action="" method="POST" enctype="multipart/form-data">
         <div class="area-inputs row">


            <div class="div-input-image col-md-4">
               <label class="label-input">Imagem Principal</label>
               <label class="picture" for="imagem_principal" tabIndex="0">
                  <span class="picture__image"></span>
               </label>

               <input type="file" name="imagem_principal" id="imagem_principal" value="imagem_principal" required>
            </div>



            <!-- UPLOAD DE IMAGENS MULTIPLAS ---------- https://codepen.io/mrtokachh/pen/LYGvPBj  -->
            <div class="div-input-image col-md-7">
               <label class="label-input">Outras Imagens</label>
               <div class="upload__box">

                  <label class="upload__btn">
                     Selecionar imagens <iconify-icon icon="material-symbols:upload"
                        style="font-size:24px"></iconify-icon>
                     <input type="file" name="imagens[]" multiple data-max_length="12" class="upload__inputfile">
                  </label>
                  <div class="upload__img-wrap"></div>
               </div>
            </div>


            <div class="div-descricao-cadastro col-md-6 mt-5">
               <label class="label-input">Descrição</label>
               <textarea id="descricao" name="descricao" class="longtextbox-cadastro" rows="10" cols="50"
                  required><?php echo $input_descricao; ?></textarea>
            </div>

            <div class="div-input-cadastro col-md-5 mt-5">
               <label class="label-input">Horário de Funcionamento</label>
               <div class="wrap-cadastro">
                  <div class="dia">
                     <input type="checkbox" id="segunda" class="checkbox-dia" name="dias[]" value="segunda" <?php echo $_SESSION['horarios_funcionamento'][0]['status_funcionamento'] == 'Aberto' ? 'checked' : ''; ?>>
                     <label for="segunda">Segunda-feira</label>
                     <span class="span-horario">Das</span>
                     <input type="time" id="abertura_segunda" name="abertura_segunda"
                        value="<?php echo $_SESSION['horarios_funcionamento'][0]['hora_abertura'] ?>">
                     <span class="span-horario">às</span>
                     <input type="time" id="fechamento_segunda" name="fechamento_segunda"
                        value="<?php echo $_SESSION['horarios_funcionamento'][0]['hora_fechamento'] ?>">
                  </div>

                  <div class="dia">
                     <input type="checkbox" id="terca" class="checkbox-dia" name="dias[]" value="terca" <?php echo $_SESSION['horarios_funcionamento'][1]['status_funcionamento'] == 'Aberto' ? 'checked' : ''; ?>>
                     <label for="terca">Terça-feira</label>
                     <span class="span-horario">Das</span>
                     <input type="time" id="fechamento_terca" name="abertura_terca"
                        value="<?php echo $_SESSION['horarios_funcionamento'][1]['hora_abertura'] ?>">
                     <span class="span-horario">às</span>
                     <input type="time" id="fechamento_terca" name="fechamento_terca"
                        value="<?php echo $_SESSION['horarios_funcionamento'][1]['hora_fechamento'] ?>">
                  </div>

                  <div class="dia">
                     <input type="checkbox" id="quarta" class="checkbox-dia" name="dias[]" value="quarta" <?php echo $_SESSION['horarios_funcionamento'][2]['status_funcionamento'] == 'Aberto' ? 'checked' : ''; ?>>
                     <label for="quarta">Quarta-feira</label>
                     <span class="span-horario">Das</span>
                     <input type="time" id="abertura_quarta" name="abertura_quarta"
                        value="<?php echo $_SESSION['horarios_funcionamento'][2]['hora_abertura'] ?>">
                     <span class="span-horario">às</span>
                     <input type="time" id="fechamento_quarta" name="fechamento_quarta"
                        value="<?php echo $_SESSION['horarios_funcionamento'][2]['hora_fechamento'] ?>">
                  </div>

                  <div class="dia">
                     <input type="checkbox" id="quinta" class="checkbox-dia" name="dias[]" value="quinta" <?php echo $_SESSION['horarios_funcionamento'][3]['status_funcionamento'] == 'Aberto' ? 'checked' : ''; ?>>
                     <label for="quinta">Quinta-feira</label>
                     <span class="span-horario">Das</span>
                     <input type="time" id="abertura_quinta" name="abertura_quinta"
                        value="<?php echo $_SESSION['horarios_funcionamento'][3]['hora_abertura'] ?>">
                     <span class="span-horario">às</span>
                     <input type="time" id="fechamento_quinta" name="fechamento_quinta"
                        value="<?php echo $_SESSION['horarios_funcionamento'][3]['hora_fechamento'] ?>">
                  </div>

                  <div class="dia">
                     <input type="checkbox" id="sexta" class="checkbox-dia" name="dias[]" value="sexta" <?php echo $_SESSION['horarios_funcionamento'][4]['status_funcionamento'] == 'Aberto' ? 'checked' : ''; ?>>
                     <label for="sexta">Sexta-feira</label>
                     <span class="span-horario">Das</span>
                     <input type="time" id="abertura_sexta" name="abertura_sexta"
                        value="<?php echo $_SESSION['horarios_funcionamento'][4]['hora_abertura'] ?>">
                     <span class="span-horario">às</span>
                     <input type="time" id="fechamento_sexta" name="fechamento_sexta"
                        value="<?php echo $_SESSION['horarios_funcionamento'][4]['hora_fechamento'] ?>">
                  </div>

                  <div class="dia">
                     <input type="checkbox" id="sabado" class="checkbox-dia" name="dias[]" value="sabado" <?php echo $_SESSION['horarios_funcionamento'][5]['status_funcionamento'] == 'Aberto' ? 'checked' : ''; ?>>
                     <label for="sabado">Sábado</label>
                     <span class="span-horario">Das</span>
                     <input type="time" id="abertura_sabado" name="abertura_sabado"
                        value="<?php echo $_SESSION['horarios_funcionamento'][5]['hora_abertura'] ?>">
                     <span class="span-horario">às</span>
                     <input type="time" id="fechamento_sabado" name="fechamento_sabado"
                        value="<?php echo $_SESSION['horarios_funcionamento'][5]['hora_fechamento'] ?>">
                  </div>

                  <div class="dia">
                     <input type="checkbox" id="domingo" class="checkbox-dia" name="dias[]" value="domingo" <?php echo $_SESSION['horarios_funcionamento'][6]['status_funcionamento'] == 'Aberto' ? 'checked' : ''; ?>>
                     <label for="domingo">Domingo</label>
                     <span class="span-horario">Das</span>
                     <input type="time" id="abertura_domingo" name="abertura_domingo"
                        value="<?php echo $_SESSION['horarios_funcionamento'][6]['hora_abertura'] ?>">
                     <span class="span-horario">às</span>
                     <input type="time" id="fechamento_domingo" name="fechamento_domingo"
                        value="<?php echo $_SESSION['horarios_funcionamento'][6]['hora_fechamento'] ?>">
                  </div>
               </div>
            </div>

            <div class="div-localizacao-cadastro col-md-12">
               <label class="label-input">Localização</label>
               <div class="div-mapa" id="alter-map">
                  <script>
                     // Valores de latitude e longitude vindos do PHP
                     var inputLatitude = <?php echo $input_latitude; ?>;
                     var inputLongitude = <?php echo $input_longitude; ?>;

                     function map() {
                        var map = new google.maps.Map(document.getElementById("alter-map"), {
                           zoom: 13,
                           center: { lat: inputLatitude, lng: inputLongitude }, // Usa as variáveis do PHP
                           streetViewControl: false,
                           mapTypeControl: false
                        });

                        var marker = new google.maps.Marker({
                           position: { lat: inputLatitude, lng: inputLongitude }, // Marcador inicial com as coordenadas do PHP
                           map: map
                        });

                        // Atualiza as informações iniciais de latitude e longitude na página
                        document.getElementById("latitude").innerText = "Latitude: " + inputLatitude;
                        document.getElementById("longitude").innerText = "Longitude: " + inputLongitude;
                        document.getElementById("input-latitude").value = inputLatitude;
                        document.getElementById("input-longitude").value = inputLongitude;

                        google.maps.event.addListener(map, "click", function (event) {
                           var lat = event.latLng.lat();
                           var lng = event.latLng.lng();
                           document.getElementById("latitude").innerText = "Latitude: " + lat;
                           document.getElementById("longitude").innerText = "Longitude: " + lng;

                           document.getElementById("input-latitude").value = lat;
                           document.getElementById("input-longitude").value = lng;

                           // Se já existe um marcador, remove-o antes de adicionar um novo
                           if (marker) {
                              marker.setMap(null);
                           }

                           // Cria um novo marcador na posição clicada
                           marker = new google.maps.Marker({
                              position: { lat: lat, lng: lng },
                              map: map
                           });
                        });
                     }
                     window.onload = map;
                  </script>
               </div>
               <div class="label-map col-md-12">
                  <label id="latitude" class="col-md-4 offset-md-1 label-input" name="">Latitude:</label>
                  <label id="longitude" class="col-md-4 offset-md-2 label-input">Longitude:</label>

                  <input type="hidden" id="input-latitude" name="latitude">
                  <input type="hidden" id="input-longitude" name="longitude">
               </div>
            </div>

            <?php
            if ($_SESSION['tipo'] == "Trilha" && isset($_SESSION['alter_tipo']) && $_SESSION['alter_tipo'] == 'Trilha') {
               echo '<label class="label-input trilha-title">Trilha</label>
               <div class="div-trilha-cadastro col-md-12">


               <div class="div-input-cadastro">
                  <label class="label-input">Distância (Km)</label>
                  <input type="text" name="distancia_trilha" id="distancia_trilha" class="textbox-cadastro"
                        placeholder="0" required value="' . $input_distancia . '">
               </div>

               <script>
                  document.getElementById("distancia_trilha").addEventListener("input", function (e) {
                     // Obtenha o valor atual do campo
                     var value = e.target.value;

                     // Permitir apenas números e vírgulas, excluindo letras e caracteres especiais
                     value = value.replace(/[^0-9,]/g, "");

                     // Limitar para apenas uma vírgula e dois dígitos após a vírgula
                     var parts = value.split(",");

                     if (parts.length > 2) {
                           value = parts[0] + "," + parts[1].slice(0, 2); // Remove dígitos extras
                     } else if (parts.length === 2) {
                           value = parts[0] + "," + parts[1].slice(0, 2); // Limitar a dois dígitos após a vírgula
                     }

                     // Atualiza o valor do input com o valor formatado
                     e.target.value = value;
                  });

                  // Adiciona um evento no formulário ou no botão de submit para converter a vírgula em ponto ao enviar
                  document.querySelector("form").addEventListener("submit", function () {
                     var input = document.getElementById("distancia_trilha");
                     input.value = input.value.replace(",", ".");  // Converte a vírgula em ponto
                  });
               </script>



                  <div class="div-input-cadastro">
                     <label class="label-input">Dificuldade</label>
                     <select class="textbox-cadastro" name="dificuldade_trilha" id="dificuldade_trilha" required>
                        <option value="" disabled ' . (!$input_dificuldade ? 'selected' : '') . '>
                           Selecione a Dificuldade...
                        </option>
                        <option value="facil" ' . ($input_dificuldade == 'Fácil' ? 'selected' : '') . '>
                           Fácil
                        </option>
                        <option value="medio" ' . ($input_dificuldade == 'Médio' ? 'selected' : '') . '>
                           Médio
                        </option>
                        <option value="dificil" ' . ($input_dificuldade == 'Difícil' ? 'selected' : '') . '>
                           Difícil
                        </option>
                     </select>   

                  </div>

                  <div class="div-input-cadastro">
                     <label class="label-input">Tempo Estimado (HH:MM)</label>
                     <input type="time" class="textbox-cadastro" id="tempo_trilha" name="tempo_trilha" value="' . $input_tempo . '">
                  </div>

               </div>';
            } else if($_SESSION['tipo'] != "Trilha" && isset($_SESSION['alter_tipo']) && $_SESSION['alter_tipo'] == 'Trilha'){
               echo '<label class="label-input trilha-title">Trilha</label>
               <div class="div-trilha-cadastro col-md-12">


               <div class="div-input-cadastro">
                  <label class="label-input">Distância (Km)</label>
                  <input type="text" name="distancia_trilha" id="distancia_trilha" class="textbox-cadastro"
                        placeholder="0" required>
               </div>

               <script>
                  document.getElementById("distancia_trilha").addEventListener("input", function (e) {
                     // Obtenha o valor atual do campo
                     var value = e.target.value;

                     // Permitir apenas números e vírgulas, excluindo letras e caracteres especiais
                     value = value.replace(/[^0-9,]/g, "");

                     // Limitar para apenas uma vírgula e dois dígitos após a vírgula
                     var parts = value.split(",");

                     if (parts.length > 2) {
                           value = parts[0] + "," + parts[1].slice(0, 2); // Remove dígitos extras
                     } else if (parts.length === 2) {
                           value = parts[0] + "," + parts[1].slice(0, 2); // Limitar a dois dígitos após a vírgula
                     }

                     // Atualiza o valor do input com o valor formatado
                     e.target.value = value;
                  });

                  // Adiciona um evento no formulário ou no botão de submit para converter a vírgula em ponto ao enviar
                  document.querySelector("form").addEventListener("submit", function () {
                     var input = document.getElementById("distancia_trilha");
                     input.value = input.value.replace(",", ".");  // Converte a vírgula em ponto
                  });
               </script>



                  <div class="div-input-cadastro">
                     <label class="label-input">Dificuldade</label>
                     <select class="textbox-cadastro" name="dificuldade_trilha" id="dificuldade_trilha" required>
                        <option value="" disabled>
                           Selecione a Dificuldade...
                        </option>
                        <option value="facil">
                           Fácil
                        </option>
                        <option value="medio">
                           Médio
                        </option>
                        <option value="dificil">
                           Difícil
                        </option>
                     </select>   

                  </div>

                  <div class="div-input-cadastro">
                     <label class="label-input">Tempo Estimado (HH:MM)</label>
                     <input type="time" class="textbox-cadastro" id="tempo_trilha" name="tempo_trilha">
                  </div>

               </div>';
            }
            ?>


            <div class="div-button-continuar">
               <button type="submit" class="button-continuar3">Continuar<ion-icon name="arrow-forward-outline"
                     class="arrow-blue"></ion-icon></button>
            </div>
            <div class="espacamento-final"></div>

      </form>

   </div>




</div>








</div>



<?php include("../../blades/footer-cadastro.php"); ?>