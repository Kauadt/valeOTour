<?php
if (isset($verificacao)) {


    if($verificacao[0]['nome_v'] == "Reprovado") {
        echo "<li>Nome</li>";
    }
    if($verificacao[0]['descricao_v'] == "Reprovado") {
        echo "<li>Descrição</li>";
    }
    if($verificacao[0]['tipo_v'] == "Reprovado") {
        echo "<li>Tipo</li>";
    }
    if($verificacao[0]['rua_v'] == "Reprovado") {
        echo "<li>Rua</li>";
    }
    if($verificacao[0]['email_v'] == "Reprovado") {
        echo "<li>Email</li>";
    }
    if($verificacao[0]['bairro_v'] == "Reprovado") {
        echo "<li>Bairro</li>";
    }
    if($verificacao[0]['numero_v'] == "Reprovado") {
        echo "<li>Numero</li>";
    }
    if($verificacao[0]['cidade_v'] == "Reprovado") {
        echo "<li>Cidade</li>";
    }
    if($verificacao[0]['latitude_v'] == "Reprovado") {
        echo "<li>Latitude</li>";
    }
    if($verificacao[0]['longitude_v'] == "Reprovado") {
        echo "<li>Longitude</li>";
    }
    if($verificacao[0]['foto_principal_v'] == "Reprovado") {
        echo "<li>Foto Principal</li>";
    }
    if($verificacao[0]['telefone_v'] == "Reprovado") {
        echo "<li>Telefone</li>";
    }
    if($verificacao[0]['eixo_v'] == "Reprovado") {
        echo "<li>Eixo</li>";
    }


}
?>