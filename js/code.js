let map, geocoder, marker, infowindow;

function initMap() {
    const barcelona = { lat: 41.390205, lng: 2.154007 };
    map = new google.maps.Map(document.getElementById('map'), {
        zoom: 10,
        center: barcelona
    });

    marker = new google.maps.Marker({
        position: barcelona,
        map: map
    });

    infowindow = new google.maps.InfoWindow({
        content: 'Ciudad de Barcelona'
    });

    marker.addListener('click', function () {
        infowindow.open(map, marker);
    });

    document.getElementById('findLoc').addEventListener('click', function () {
        geocodeAddress();
    });

    geocoder = new google.maps.Geocoder();
}
function geocodeAddress() {
    let address = document.getElementById('adreca').value;
    geocoder.geocode({ 'address': address }, function (results, status) {
        if (status === 'OK') {
            let latitud = results[0].geometry.location.lat();
            let longitud = results[0].geometry.location.lng();

            let location = { lat: latitud, lng: longitud };
            map.setCenter(location);
            map.setZoom(20);
            marker.setPosition(location);

            document.getElementById('latitude').value = latitud;
            document.getElementById('longitude').value = longitud;
        } else {
            alert('No se ha encontrado la dirección: ' + status);
        }
    });
}