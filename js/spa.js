"use strict";
//SPA functions - Wojtek
function hideAllPages() {
     let pages = document.querySelectorAll(".page");
     for (const page of pages) {
          page.style.display = "none";
     }
}

function showPage(pageId) {
     hideAllPages();
     document.querySelector(`#${pageId}`).style.display = "block";
}

function navigateTo(pageId) {
     location.href = `#${pageId}`;
}

function pageChange() {
     let page = "onboarding";
     if (location.hash) {
          page = location.hash.slice(1);
     }
     showPage(page);
     if (page === 'onboarding') {
          hideMenu();
     } else {
          showMenu();
     }
     $(".nav").removeClass("nav-yellow");
}

pageChange();

function hideMenu() {
     let nav = document.querySelector(".nav");
     nav.style.visibility = "hidden";
}

function showMenu() {
     let nav = document.querySelector(".nav");
     nav.style.visibility = "visible";
}