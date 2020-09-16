"use strict";

class Category() {
    constructor(name, description) {
        this.name = name;
        this.description = description;
    };

    append() {
        let htmlTemplate = "";

        for (const category of _trashCategories) {
            htmlTemplate += /*html*/
                `
            <article>
                <h1>${category.name}</h1>
                    <p>${category.description}</p>
                    <h2>Items</h2>
            </article>
            `;
        }
        document.querySelector("#category").innerHTML += htmlTemplate;
    };

}

let glass = new Category("Glass Plastic Metal", "Don't trash them! The best option is pass them on reuse or find a good e-waste recycler. E-Stewards are recyclers who meet the highest standards for how they recycle our stuff, including not just shipping  it off to poor countries.");
let paper = new Category("Paper", "Don't trash them! The best option is pass them on reuse or find a good e-waste recycler. E-Stewards are recyclers who meet the highest standards for how they recycle our stuff, including not just shipping  it off to poor countries.");


// let _trashCategories = [{
//     name: "Glass Plastic Metal",
//     description: "Don't trash them! The best option is pass them on reuse or find a good e-waste recycler. E-Stewards are recyclers who meet the highest standards for how they recycle our stuff, including not just shipping  it off to poor countries.",
//     items: ["Bottle", "Can", "Jar"]
// }];

// function appendCategory() {
//     let htmlTemplate = "";

//     for (const category of _trashCategories) {
//         htmlTemplate += `
//         <article>
//           <h1>${category.name}</h1>
//           <p>${category.description}</p>
//           <h2>Items</h2>
//         </article>
//      `;
//     }

//     document.querySelector("").innerHTML = htmlTemplate;
// }