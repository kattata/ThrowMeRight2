"use strict";

let _trashItems = [{
    name: "Milk Carton",
    image: " ",
    description: " ",
    category: "GeneralWaste"
}];

function appendCategory() {
    let htmlTemplate = "";

    for (const item of _trashItems) {
        htmlTemplate += `
        <article>
          <h1>${item.name}</h1>
          <img src= ${item.image} id="item-image">
          <h2>Where to throw it</h2>
          <img src= ${item.category} id="item-category-image">
          <p>${item.description}</p>
        </article>
     `;
    }

    document.querySelector("#item-container").innerHTML = htmlTemplate;
}
ocument.querySelector("#item-container").innerHTML = htmlTemplate;
}