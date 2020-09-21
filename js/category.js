"use strict";

// Appending categories - Ana
function appendCategory() {
    let htmlTemplate = "";
    for (const category of _posts) {
        if (category.categories.includes(2)) {
            console.log(category.title.rendered, category.acf.category);
            htmlTemplate += /*html*/ `
            <article id="category-container">
                <header class="green-head">
                    <h1>${category.title.rendered}</h1>
                </header>
                <div class="description-container">
                    <p>${category.content.rendered}</p>
                </div>   
            </article>
            `;
        }
        document.querySelector(`#${category.acf.category}-page`).innerHTML += htmlTemplate;
        htmlTemplate = "";
    }

}