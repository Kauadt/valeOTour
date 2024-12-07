<?php echo '<script>
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
</script> '; ?>
