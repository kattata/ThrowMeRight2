/* Ana did this */
"use strict";

async function getItems() {
    let response = await fetch("http://throwmeright.anaiacovache.dk/wp-json/wp/v2/posts");
    let data = await response.json();
    console.log(data);
    _items = data;
    appendPopularItem()
}

getItems();


function appendPopularItem() {
    let htmlTemplate = "";
    for (const item of _items) {
        if (item.categories[0] === 3) {
            console.log(item.title.rendered, item.acf.category, item.acf.image, item.acf.category_image);
            htmlTemplate += /*html*/ `
            <article id="item-container">
                <header class="green-head">
                <h1>${item.title.rendered}</h1>
            </header>
                <img src= "${item.acf.image}" id="item-image">
                <h2>Where to throw it</h2>
                <img src= "${item.acf.category_image}" id="item-category-image">
                <p id="item-description"> ${item.content.rendered}</p>
            </article>
     `;

        }
        document.querySelector(`#${item.acf.category}-page`).innerHTML += htmlTemplate;
        htmlTemplate = "";
    }

}

/*
function appendCategoryPage(id, name, description, items) {
    console.log(id, name, description, items);
    let htmlTemplate =
`
        <section class="page" id="${id}-page">
            <header class="green-head">
                <h2>${name}</h2>
            </header>
            <div class="description-container">
                <p>${description}</p>
            </div>
            <h3>Items</h3>
        
        </section>
    `;
document.querySelector("#webapp").innerHTML += htmlTemplate;

pageChange();
}
*/