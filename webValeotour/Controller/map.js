function map() {
    var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 13,
        center: { lat: -24.49480987824458, lng: -47.84403383478973 }, // Centro em São Paulo, Brasil
        streetViewControl: false,
        mapTypeControl: false 
    });

    var marker; // Variável para armazenar o marcador atual

    google.maps.event.addListener(map, 'click', function (event) {
        var lat = event.latLng.lat();
        var lng = event.latLng.lng();
        document.getElementById('latitude').innerText = "Latitude: " + lat;
        document.getElementById('longitude').innerText = "Longitude: " + lng;

        document.getElementById('input-latitude').value = lat;
        document.getElementById('input-longitude').value = lng;

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
