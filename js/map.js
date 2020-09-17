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

function showPantOptions() {

    document.querySelector(".pant-options").classList.toggle("visible");
}

// map.on('click', function (e) {
//     var features = map.queryRenderedFeatures(e.point, {
//         layers: ['recycling-stations'] // replace this with the name of the layer
//     });

//     if (!features.length) {
//         return;
//     }

//     let feature = features[0];

//     let popup = new mapboxgl.Popup({ offset: [0, -15] })
//         .setLngLat(feature.geometry.coordinates)
//         .setHTML(
//             `<h3>${feature.properties.place_name}</h3>
//             <a onclick="openGoogleMaps()" class="go-to-google-maps">
//             <img src="../media/googlemaps.jpg" class="google-maps-logo">
//             <p class="open-google-maps">Open in Google Maps</p>
//             </a>`
//         )
//         .addTo(map);
// });

map.on('load', function () {
    map.addSource('bulky-waste', {
        type: 'vector',
        url: 'mapbox://styles/kattata/ckf3tp6w60wkg19ql7zv06r0y'
    });
    map.addLayer({
        'id': 'bulky-waste',
        'type': 'circle',
        'source': 'bulky-waste',
        'layout': {
            'visibility': 'visible'
        },
        'paint': {
            'circle-radius': 8,
            'circle-color': 'rgba(55,148,179,1)'
        },
        'source-layer': 'bulky-waste'
    });
    map.addSource('recycling-stations', {
        type: 'vector',
        url: 'mapbox://styles/kattata/ckf3tp6w60wkg19ql7zv06r0y'
    });
    map.addLayer({
        'id': 'recycling-stations',
        'type': 'circle',
        'source': 'recycling-stations',
        'layout': {
            'visibility': 'visible'
        },
        'paint': {
            'circle-radius': 8,
            'circle-color': 'rgba(11,148,179,1)'
        },
        'source-layer': 'recycling-stations'
    });

});

// let toggleLayerIds = ['bulky-waste', 'recycling-stations'];

// for (let i = 0; i < toggleLayerIds.length; i++) {
//     let id = toggleLayerIds[i];

//     let link = document.createElement('a');
//     link.href = '#';
//     link.className = 'active';
//     link.textContent = id;

//     link.onclick = function (e) {
//         var clickedLayer = this.textContent;
//         e.preventDefault();
//         e.stopPropagation();

//         var visibility = map.getLayoutProperty(clickedLayer, 'visibility');

//         // toggle layer visibility by changing the layout object's visibility property
//         if (visibility === 'visible') {
//             map.setLayoutProperty(clickedLayer, 'visibility', 'none');
//             this.className = '';
//         } else {
//             this.className = 'active';
//             map.setLayoutProperty(clickedLayer, 'visibility', 'visible');
//         }
//     };

//     var layers = document.getElementById('menu');
//     layers.appendChild(link);
// }

let glassButton = document.querySelector('#map-glass');
let generalButton = document.querySelector('#map-general');
let paperButton = document.querySelector('#map-paper');

let recyclingStationsButtons = [glassButton, generalButton, paperButton];

for (const button of recyclingStationsButtons) {


    button.onclick = function (e) {

        let visibility = map.getLayoutProperty('recycling-stations', 'visibility');

        if (visibility === 'visible') {
            map.setLayoutProperty('recycling-stations', 'visibility', 'none');
        } else {
            map.setLayoutProperty('recycling-stations', 'visibility', 'visible');
        }
    }

}

let bulkyButton = document.querySelector('#map-bulky');

bulkyButton.onclick = function (e) {

    let visibility = map.getLayoutProperty('bulky-waste', 'visibility');

    if (visibility === 'visible') {
        map.setLayoutProperty('bulky-waste', 'visibility', 'none');
    } else {
        map.setLayoutProperty('bulky-waste', 'visibility', 'visible');
    }
}