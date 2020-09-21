"use strict";

async function getItems() {
    let response = await fetch("http://throwmeright.anaiacovache.dk/wp-json/wp/v2/posts");
    let data = await response.json();
    console.log(data);
    _items = data;
    appendPopularItem()
}

getItems();
let _items = [];

// append popular items - Ana
function appendPopularItem() {
    let htmlTemplate = "";
    for (const item of _posts) {
        if (item.categories.includes(3)) {
            console.log(item.title.rendered, item.acf.category, item.acf.image, item.acf.category_image);
            htmlTemplate += /*html*/ `
            <article id="item-container">
                <header class="green-head">
                <h1>${item.title.rendered}</h1>
            </header>
            <div class="item-image-container">
                <img src= "${item.acf.image}" id="item-image">
             </div>
                <h2>Where to throw it</h2>
                <img src= "${item.acf.category_image}" id="item-category-image">
                <div class="description-container">
                    <p>${item.content.rendered}</p>
                </div>
                
            </article>
     `;

        }
        document.querySelector(`#${item.acf.category}-page`).innerHTML += htmlTemplate;
        htmlTemplate = "";
    }

}