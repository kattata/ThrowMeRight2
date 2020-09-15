/* Ana did this */
"use strict";

let _trashItems = [{
    name: "Milk Carton",
    image: "./media/milk-carton.png",
    description: "Tetrapak cartons (like juice and soup cartons) are generally made from a mixture of paperboard, plastic and aluminium.",
    category: "./media/general.png"
}];

function appendCategory() {
    let htmlTemplate = "";

    for (const item of _trashItems) {
        htmlTemplate += /*html*/ `
        <article>
          <h1>${item.name}</h1>
          <img src= ${item.image} id="item-image">
          <h2>Where to throw it</h2>
          <img src= ${item.category} id="item-category-image">
          <p id="item-description">${item.description}</p>
        </article>
     `;
    }

    document.querySelector("#item-container").innerHTML += htmlTemplate;
}
appendCategory();