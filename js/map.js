//slick
$(document).ready(function () {
    $('.map-categories').slick({
        slidesToShow: 3,
        slidesToScroll: 2
    });
});

//mapbox
mapboxgl.accessToken = 'pk.eyJ1Ijoia2F0dGF0YSIsImEiOiJjazdkMW9samkwamVxM2ZwYTdycWVqeTdnIn0.UiaVPV8_C6knWwC1_K8zkA';
let map = new mapboxgl.Map({
    container: 'mapbox',
    style: 'mapbox://styles/kattata/ckf3tp6w60wkg19ql7zv06r0y',
    center: [10.195, 56.154,],
    zoom: 8.5
});

function showPantOptions() {
    document.querySelector(".pant-options").classList.toggle("visible");
}

map.on('load', function () {
    map.addSource('bulky-waste-dataset', {
        type: 'vector',
        url: 'mapbox://styles/kattata/ckf3tp6w60wkg19ql7zv06r0y'
    });
    map.addLayer({
        'id': 'bulky-waste-id',
        'type': 'circle',
        'source': 'bulky-waste-dataset',
        'layout': {
            'visibility': 'visible'
        },
        'source-layer': 'bulky-waste-dataset'
    });
    map.addSource('recycling-stations-dataset', {
        type: 'vector',
        url: 'mapbox://styles/kattata/ckf3tp6w60wkg19ql7zv06r0y'
    });
    map.addLayer({
        'id': 'recycling-stations-id',
        'type': 'circle',
        'source': 'recycling-stations-dataset',
        'layout': {
            'visibility': 'visible'
        },
        'source-layer': 'recycling-stations-dataset'
    });
    map.addSource('ewaste-dataset', {
        type: 'vector',
        url: 'mapbox://styles/kattata/ckf3tp6w60wkg19ql7zv06r0y'
    });
    map.addLayer({
        'id': 'ewaste-id',
        'type': 'circle',
        'source': 'ewaste-dataset',
        'layout': {
            'visibility': 'visible'
        },
        'source-layer': 'ewaste-dataset'
    });
    map.addSource('batteries-dataset', {
        type: 'vector',
        url: 'mapbox://styles/kattata/ckf3tp6w60wkg19ql7zv06r0y'
    });
    map.addLayer({
        'id': 'batteries-id',
        'type': 'circle',
        'source': 'batteries-dataset',
        'layout': {
            'visibility': 'visible'
        },
        'source-layer': 'batteries-dataset'
    });

});

let glassButton = document.querySelector('#map-glass');
let generalButton = document.querySelector('#map-general');
let paperButton = document.querySelector('#map-paper');

let recyclingStationsButtons = [glassButton, generalButton, paperButton];

for (const button of recyclingStationsButtons) {
    button.onclick = function () {

        let visibility = map.getLayoutProperty('recycling-stations', 'visibility');

        if (visibility === 'visible') {
            map.setLayoutProperty('recycling-stations', 'visibility', 'none');
        } else {
            map.setLayoutProperty('recycling-stations', 'visibility', 'visible');
        }
    }
}

let bulkyButton = document.querySelector('#map-bulky');

bulkyButton.onclick = function () {

    let visibility = map.getLayoutProperty('bulky-waste', 'visibility');

    if (visibility === 'visible') {
        map.setLayoutProperty('bulky-waste', 'visibility', 'none');
    } else {
        map.setLayoutProperty('bulky-waste', 'visibility', 'visible');
    }
}

let ewasteButton = document.querySelector('#map-ewaste');

ewasteButton.onclick = function () {

    let visibility = map.getLayoutProperty('ewaste', 'visibility');

    if (visibility === 'visible') {
        map.setLayoutProperty('ewaste', 'visibility', 'none');
    } else {
        map.setLayoutProperty('ewaste', 'visibility', 'visible');
    }
}
let batteriesButton = document.querySelector('#map-batteries');

batteriesButton.onclick = function () {

    let visibility = map.getLayoutProperty('batteries', 'visibility');

    if (visibility === 'visible') {
        map.setLayoutProperty('batteries', 'visibility', 'none');
    } else {
        map.setLayoutProperty('batteries', 'visibility', 'visible');
    }
}

// let allLayers = []

map.on('click', function (e) {
    var features = map.queryRenderedFeatures(e.point, {
        layers: ['recycling-stations', 'bulky-waste', 'ewaste', 'batteries'] // replace this with the name of the layer
    });

    if (!features.length) {
        return;
    }

    let feature = features[0];

    let popup = new mapboxgl.Popup({ offset: [0, -15] })
        .setLngLat(feature.geometry.coordinates)
        .setHTML(
            `<h3>${feature.properties.place_name}</h3>
            <a onclick="openGoogleMaps()" class="go-to-google-maps">
            <img src="../media/googlemaps.jpg" class="google-maps-logo">
            <p class="open-google-maps">Open in Google Maps</p>
            </a>`
        )
        .addTo(map);
});