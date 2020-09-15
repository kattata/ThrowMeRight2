"use strict";

//Open more section in nav - Wojo
let moreBtn = document.querySelector(".moreBtn");
let navMore = document.querySelector(".nav-more");
let navBtn = document.querySelectorAll(".fas");
let nav = document.querySelector("nav");


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