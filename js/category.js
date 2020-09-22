"use strict";

//Categories - Ana

// Appending categories
function appendCategory() {
    let htmlTemplate = "";
    for (const category of _posts) {
        if (category.categories.includes(2)) {
            console.log(category.title.rendered, category.acf.category);
            htmlTemplate += /*html*/ `
            <article id="category-container">
                <header class="green-head">
                    <h2>${category.title.rendered}</h2>
                </header>
                <div class="description-container">
                    <p>${category.content.rendered}</p>
                </div>   
                <div class="search_results">
                    <a class="item-result"></a>
                    <p>Item 1</p>
                    <i class="fas fa-angle-right"></i>
                </div>
                <div class="search_results">
                    <a class="item-result"></a>
                    <p>Item 2</p>
                    <i class="fas fa-angle-right"></i>
                </div>
                <div class="search_results">
                    <a class="item-result"></a>
                    <p>Item 3</p>
                    <i class="fas fa-angle-right"></i>
                </div>
            </article>
            `;
        }
        document.querySelector(`#${category.acf.category}-page`).innerHTML += htmlTemplate;
        htmlTemplate = "";
    }

}