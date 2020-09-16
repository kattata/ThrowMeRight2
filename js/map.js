$(document).ready(function () {
    $('.map-categories').slick({
        slidesToShow: 3,
        slidesToScroll: 2
    });
});

mapboxgl.accessToken = 'pk.eyJ1Ijoia2F0dGF0YSIsImEiOiJjazdkMW9samkwamVxM2ZwYTdycWVqeTdnIn0.UiaVPV8_C6knWwC1_K8zkA';
var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/kattata/ckf3tp6w60wkg19ql7zv06r0y',
    center: [0, 0],
    zoom: 5
});