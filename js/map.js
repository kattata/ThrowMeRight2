$(document).ready(function () {
    $('.map-categories').slick({
        slidesToShow: 3,
        slidesToScroll: 2
    });
});

mapboxgl.accessToken = 'pk.eyJ1Ijoia2F0dGF0YSIsImEiOiJjazdkMW9samkwamVxM2ZwYTdycWVqeTdnIn0.UiaVPV8_C6knWwC1_K8zkA';
let map = new mapboxgl.Map({
    container: 'mapbox',
    style: 'mapbox://styles/kattata/ckf3tp6w60wkg19ql7zv06r0y',
    center: [10.195, 56.154,],
    zoom: 8.5
});

function showLocations(boolean) {
    map.on('click', function (e) {
        var features = map.queryRenderedFeatures(e.point, {
            layers: ['recycling-stations'] // replace this with the name of the layer
        });

        if (!features.length) {
            return;
        }

        let feature = features[0];

        let popup = new mapboxgl.Popup({ offset: [0, -15] })
            .setLngLat(feature.geometry.coordinates)
            .setHTML(
                `<h3>${feature.properties.place_name}</h3>
            <a href="https://www.google.com/maps/" class="go-to-google-maps">
            <img src="../media/googlemaps.jpg" class="google-maps-logo">
            <p class="open-google-maps">Open in Google Maps</p>
            </a>`
            )
            .addTo(map);
    });

}
