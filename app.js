// import dino.json 

async function dinoArray() {
    const dinoJson = await fetch("./dino.json");
    const data = await dinoJson.json();

    return data.Dinos;

}




// Create Dino Constructor

class Dinosaur {
    constructor(species, weight, height, diet, where, when, fact) {

        this.species = species;
        this.weight = weight;
        this.height = height;
        this.diet = diet;
        this.where = where;
        this.when = when;
        this.fact = fact;
    }
}


// Create Human Object

//! TODO: values are not retrieved by .value method
class Human {
    constructor(species, height, weight, diet) {

        this.species = species;
        this.height = height;
        this.weight = weight;
        this.diet = diet;
    }
}

// Use IIFE to get human data from form

const humanObject = (function () {

    let humanSpecies = document.getElementById("name").value;
    let humanHeight = document.getElementById("feet").value * 12 + document.getElementById("inches").value;
    let humanWeight = document.getElementById("weight").value;
    let humanDiet = document.getElementById("diet").value;

    return new Human(humanSpecies, humanHeight, humanWeight, humanDiet)

})();

// Create Dino Compare Method 1
// TODO: compare height. 



// Create Dino Compare Method 2
// TODO: compare weight. 



// Create Dino Compare Method 3
// TODO: compare diet. 



// TODO: Generate Tiles for each Dino in Array



// TODO: Add tiles to DOM



// Remove form from screen



// On button click, prepare and display info graphic

document.getElementById("btn").addEventListener("click", () => {

    document.getElementById("dino-compare").style.display = "none";

    const gridContainer = document.getElementById("grid");

    // iterate over dinoArray with forEach
    dinoArray().then(res => {
        let dinos = res.map(dino => new Dinosaur(dino.species, dino.weight, dino.height, dino.diet, dino.where, dino.when, dino.fact));

        dinos.splice(4, 0, humanObject);

        console.log(dinos)

        dinos.forEach((element, index) => {

            // create elements for gridItem
            const gridItem = document.createElement("div");
            const gridItemHeader = document.createElement("h3");
            const gridItemImage = document.createElement("img");
            const gridItemParagraph = document.createElement("p");


            // set inner HTML & Attributes for elements: (<h3>, <img>, <p>) inside the gridItem
            gridItemHeader.innerHTML = element.species;
            // gridItemImage.setAttribute("src", `./images/${element.species}.png`);
            gridItemParagraph.innerHTML = element.fact;



            // assign class for gridItem
            gridItem.classList.add("grid-item");

            // append child on gridItem --> (gridItem + <h3>, <img>, <p>)
            gridItem.appendChild(gridItemHeader);
            gridItem.appendChild(gridItemImage);
            gridItem.appendChild(gridItemParagraph);

            gridContainer.appendChild(gridItem);

        });
    })


})