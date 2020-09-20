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

let items = [];
_itemRef.onSnapshot(function (snapshotData) {
    snapshotData.forEach(function (doc) {
        let item = doc.data();
        item.id = doc.id;
        items.push(item);
    });
});



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
    } else {
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
    $(".search_results_container").slideDown(600, function () {});
    $(".nav").addClass("nav-white");
});

// Search bar slide up when home-btn is clicked - Oliver

$(".home-btn").click(function () {
    $(".homepage_top").animate({
        height: '-=1000px'
    }, 600);
    $(".search_results_container").slideUp(600, function () {});
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
let _items = [];
_itemRef.onSnapshot(function (snapshotData) {

    snapshotData.forEach(function (doc) {
        let item = doc.data();
        item.id = doc.id;
        _items.push(item);
    });
});

// search functionality

function search(value) {
    const key = event.key; 
    if (key === "Backspace" || key === "Delete" || key === "Enter") {
        return false;
    }

    let searchValue = value.toLowerCase();
    let filteredItems = items.filter(item => item.name.toLowerCase().includes(searchValue));
    appendItem(filteredItems);
};

function appendItem(items) {
    let htmlTemplate = "";
    for (const item of items) {
        htmlTemplate += /*html*/ `
          
        <div class="search_results">
            <a href="#${item.name}-page" class="item-result" id="${item.name}">${item.name}</a>
            <i class="fas fa-angle-right"></i>
            </div>
        `;
        
        
    }
    document.querySelector(".search_results_container").innerHTML = htmlTemplate;
    console.log(items);
}

// Onboarding screen - Ana

function appendOnboardingScreen() {
    let htmlTemplate = /*html*/ `
        <div id="logo-container"><img src="./media/logo.png" id="logo-image"></div>
        <section id="app-description">
            <h1>Welcome!</h1>
            <p>It takes just a search in our app to find out how to sort your trash.
                <br>Struggle no more.
            </p>
        </section>
        <div id="continue-container"><button id="continue" onclick='showMenu()'>CONTINUE</button></div>
    `;
    document.querySelector("#onboarding").innerHTML += htmlTemplate;

}
appendOnboardingScreen();

function hideMenu() {
    if (location.hash = "#onboarding") {
        nav.style.visibility = "hidden";
    }
}
hideMenu();

function showMenu() {
    nav.style.visibility = "visible";
    navigateTo("homepage");
}

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