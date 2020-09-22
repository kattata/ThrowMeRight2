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

// fetch posts from wordpress

let _posts = [];
async function getPosts() {
    let response = await fetch("https://throwmeright.anaiacovache.dk/wp-json/wp/v2/posts/?per_page=50");
    let data = await response.json();
    console.log(data);
    _posts = data;
    appendItems();
    appendCategory();
}
getPosts();


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

//Open more section in nav - Wojciech
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

document.querySelector("#webapp").addEventListener("click", closeMore); //close menu when clicking outside of it


//Sending request - Wojciech
function sendRequest() {

    let mailInput = document.querySelector("#emailInput").value;
    let descriptionInput = document.querySelector("#description").value;
    let fileInput = document.querySelector("#fileInput").src;
    let invalidMsg = document.querySelector(".invalid");
    let info = document.querySelector(".info");

    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/; //template to check if the email adress is correct

    //Checking if inputs are empty and if email is correct.
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
        //sending data to database
        _requestRef.add(newRequest);
        console.log("sent");
        info.style.display = "block";
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

let _items = [];
_itemRef.onSnapshot(function (snapshotData) {

    snapshotData.forEach(function (doc) {
        let item = doc.data();
        item.id = doc.id;
        _items.push(item);
    });
});

//search functionality - Wojciech
function search(value) {
    //Disable 3 keys due to keyup event
    const key = event.key;
    if (key === "Backspace" || key === "Delete" || key === "Enter") {
        return false;
    }

    let searchValue = value.toLowerCase();
    let filteredItems = items.filter(item => item.name.toLowerCase().includes(searchValue));
    appendItem(filteredItems);

    //if there is zero searched items show info "No results"
    if (filteredItems.length === 0) {
        noResults();
    }
};

function noResults() {
    let template = `
        <p class="no-results-info">No results!</p>
        <div class="search_no_results">
            <p class="request-info">Would you like to help us add this product to our database?</p>
            <a href="#request"><button class="go-request">Send request</button></a>   
        </div>
    `;

    document.querySelector(".search_results_container").innerHTML = template;

}

function appendItem(items) {
    let htmlTemplate = "";
    for (const item of items) {
        htmlTemplate += /*html*/ `
          
        <div class="search_results">
            <a href="#${item.category}-page" class="item-result" id="${item.name}"></a>
            <p>${item.name}</p>
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
        <div id="logo-container"><img src="./media/logo.png" id="logo-image" alt="logo"></div>
        <section id="app-description">
            <h1>Welcome!</h1>
            <p>It takes just a search in our app to find out how to sort your trash.
                <br>Struggle no more.
            </p>
        </section>
        <div id="continue-container"><button class="yellow-button" onclick="navigateTo('homepage')">CONTINUE</button></div>
    `;
    document.querySelector("#onboarding").innerHTML += htmlTemplate;

}
appendOnboardingScreen();