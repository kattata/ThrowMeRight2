
//mapbox
mapboxgl.accessToken = 'pk.eyJ1Ijoia2F0dGF0YSIsImEiOiJjazdkMW9samkwamVxM2ZwYTdycWVqeTdnIn0.UiaVPV8_C6knWwC1_K8zkA';
let map = new mapboxgl.Map({
    container: 'mapbox',
    style: 'mapbox://styles/kattata/ckf3tp6w60wkg19ql7zv06r0y',
    center: [10.195, 56.154,],
    zoom: 8.5
});

//slick
$(window).on('load', function () {
    $(".map-categories").slick({
        slidesToShow: 3,
        slidesToScroll: 2
    });
});

//append categories
function appendCategoriesImages() {
    let htmlTemplate = "";

    htmlTemplate += `
    <div><img id="map-glass" src="media/glass.png"></div>
    <div><img id="map-general" src="media/general.png"></div>
    <div><img id="map-paper" src="media/paper.png"></div>
    <div><img id="map-batteries" src="media/batteries.png"></div>
    <div><img id="map-bulky" src="media/bulky.png"></div>
    <div><img id="map-ewaste" src="media/ewaste.png"></div>
    `
    document.querySelector('.map-categories').innerHTML += htmlTemplate;
}

appendCategoriesImages();


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
        'source-layer': 'bulky-waste-id'
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
        'source-layer': 'recycling-stations-id'
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
        'source-layer': 'ewaste-id'
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
        'source-layer': 'batteries-id'
    });

});

let glassButton = document.querySelector('#map-glass');
let generalButton = document.querySelector('#map-general');
let paperButton = document.querySelector('#map-paper');

let recyclingStationsButtons = [glassButton, generalButton, paperButton];

for (const button of recyclingStationsButtons) {
    button.onclick = function () {

        let visibility = map.getLayoutProperty('recycling-stations-dataset', 'visibility');

        if (visibility === 'visible') {
            map.setLayoutProperty('recycling-stations-dataset', 'visibility', 'none');
            button.style.opacity = "0.5";
        } else {
            map.setLayoutProperty('recycling-stations-dataset', 'visibility', 'visible');
            button.style.opacity = "1";
        }
    }
}

let bulkyButton = document.querySelector('#map-bulky');

bulkyButton.onclick = function () {

    let visibility = map.getLayoutProperty('bulky-waste-dataset', 'visibility');

    if (visibility === 'visible') {
        map.setLayoutProperty('bulky-waste-dataset', 'visibility', 'none');
        bulkyButton.style.opacity = "0.5";
    } else {
        map.setLayoutProperty('bulky-waste-dataset', 'visibility', 'visible');
        bulkyButton.style.opacity = "1";

    }
}

let ewasteButton = document.querySelector('#map-ewaste');

ewasteButton.onclick = function () {

    let visibility = map.getLayoutProperty('ewaste-dataset', 'visibility');

    if (visibility === 'visible') {
        map.setLayoutProperty('ewaste-dataset', 'visibility', 'none');
        ewasteButton.style.opacity = "0.5";

    } else {
        map.setLayoutProperty('ewaste-dataset', 'visibility', 'visible');
        ewasteButton.style.opacity = "1";

    }
}

let batteriesButton = document.querySelector('#map-batteries');

batteriesButton.onclick = function () {

    let visibility = map.getLayoutProperty('batteries-dataset', 'visibility');

    if (visibility === 'visible') {
        map.setLayoutProperty('batteries-dataset', 'visibility', 'none');
        batteriesButton.style.opacity = "0.5";

    } else {
        map.setLayoutProperty('batteries-dataset', 'visibility', 'visible');
        batteriesButton.style.opacity = "1";

    }
}

map.on('click', function (e) {
    var features = map.queryRenderedFeatures(e.point, {
        layers: ['recycling-stations-dataset', 'bulky-waste-dataset', 'ewaste-dataset', 'batteries-dataset']
    });

    if (!features.length) {
        return;
    }

    let feature = features[0];

    let popup = new mapboxgl.Popup({
        offset: [0, -15]
    })
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

glassButton.addEventListener('click', function () {
    document.querySelector(".pant-options").classList.toggle("visible");
}
)

let help = document.querySelector('.help');

help.addEventListener('click', function () {
    document.querySelector('.help-container').classList.toggle('visible2');
});

let close = document.querySelector('.close');

close.addEventListener('click', function () {
    document.querySelector('.help-container').classList.remove('visible2');
});

