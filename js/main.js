"use strict";
const firebaseConfig = {
    apiKey: "AIzaSyAR47yn3G9m50zR_IVG1AIzGqJQoK30qro",
    authDomain: "throwmeright.firebaseapp.com",
    databaseURL: "https://throwmeright.firebaseio.com",
    projectId: "throwmeright",
    storageBucket: "throwmeright.appspot.com",
    messagingSenderId: "383862855912",
    appId: "1:383862855912:web:3476d0165885af3542115d"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const _db = firebase.firestore();
const _categoryRef = _db.collection("categories");
const _requestRef = _db.collection("requests");
const _itemRef = _db.collection("items");
let _categories = [];
// let _items = [];

// _categoryRef.onSnapshot(function (snapshotData) {

//     snapshotData.forEach(function (doc) {
//         let category = doc.data();
//         category.id = doc.id;
//         _categories.push(category);
//         appendCategoryPage(category.id, category.name, category.description, category.items);
//     });
// });

console.log(_categories);
let _requests = [];

_requestRef.onSnapshot(function (snapshotData) {

    snapshotData.forEach(function (doc) {
        let request = doc.data();
        request.id = doc.id;
        _requests.push(request);
    });
});
console.log(_requests);



// _itemRef.onSnapshot(function (snapshotData) {

//     snapshotData.forEach(function (doc) {
//         let item = doc.data();
//         item.id = doc.id;
//         _items.push(item);
//     });
// });
// console.log(_items);


//Open more section in nav - Wojo
let moreBtn = document.querySelector(".moreBtn");
let navMore = document.querySelector(".nav-more");
let navBtn = document.querySelectorAll(".fas");
let nav = document.querySelector(".nav");


function toggleMore() {

    if (navMore.style.bottom > "15%") {
        return closeMore();
    }
    return openMore();
}


function openMore() {
    console.log("clicked");
    navMore.style.bottom = "85%";
}

function closeMore() {
    console.log("clicked");
    navMore.style.bottom = "-1000px";
}

/***data from request***/


function sendRequest() {

    let mailInput = document.querySelector("#emailInput").value;
    let descriptionInput = document.querySelector("#description").value;
    let fileInput = document.querySelector("#fileInput").src;
    let invalidMsg = document.querySelector(".invalid");

    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (mailInput == "" || descriptionInput == "") {
        console.log("Error empty");
        invalidMsg.textContent = "Please fill up the form."
    } else if (!re.test(String(mailInput).toLowerCase())) {
        invalidMsg.textContent = "Your email is not valid"
        console.log("Wrong email");
    }
    else {
        let newRequest = {
            mail: mailInput,
            description: descriptionInput,
            img: fileInput
        }

        _requestRef.add(newRequest);
        console.log("sent");
        navigateTo("#homepage");
    }
}


// Search bar slide down when clicked - Oliver

$("#inputid").click(function () {
    $(".homepage_top").animate({
        height: '+=1000px'
    }, 600);
    $(".homepage_top").css(
        "z-index", "2"
    );
    $(".search_results_container").slideDown(600, function () { });
    $(".nav").addClass("nav-white");
});

// Search bar slide up when home-btn is clicked - Oliver

$(".home-btn").click(function () {
    $(".homepage_top").animate({
        height: '-=1000px'
    }, 600);
    $(".search_results_container").slideUp(600, function () { });
    $(".nav").removeClass("nav-white");
    $(".homepage_top").css.delay()(
        "z-index", "-1"
    );
});

$(".map-btn").click(function () {
    $(".nav").removeClass("nav-white");
});



/*
const webcamElement = document.getElementById('webcam');
const canvasElement = document.getElementById('canvas');
const snapSoundElement = document.getElementById('snapSound');
const webcam = new Webcam(webcamElement, 'user', canvasElement, snapSoundElement);

webcam.start()
  .then(result =>{
    console.log("webcam started");
  })
  .catch(err => {
    console.log(err);
});

let picture = webcam.snap();
document.querySelector('#download-photo').href = picture;

webcam.stop();*/


// search functionality
function search(searchValue) {
    _itemRef.onSnapshot(function (snapshotData) {
        let items = [];
        snapshotData.forEach(function (doc) {
            let item = doc.data();
            item.id = doc.id;
            items.push(item);
        });
        searchValue = searchValue.toLowerCase();
        let filteredItems = items.filter(item => item.name.toLowerCase().includes(searchValue));

        appendItem(filteredItems);
    });
};

// function search(value) {
//     // TODO: search functionality
//     let searchValue = value.toLowerCase();
//     console.log(searchValue);

//     let result = [];
//     for (const item of _items) {
//         let name = item.name.toLowerCase();
//         if (name.includes(searchValue)) {
//             result.push(item);
//         }
//     }
//     appendItem(result);
// }

function appendItem(items) {
    let htmlTemplate = "";
    for (const item of items) {
        htmlTemplate = /*html*/ `
        <p>${item.name}</p>
    `;
    }
    document.querySelector(".search_results").innerHTML += htmlTemplate;
    console.log(items);
}