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

class Human {

  constructor(species, height, weight, diet) {

    this.species = species;
    this.height = height;
    this.weight = weight;
    this.diet = diet;

  }
}

// Function to get human data from form
const humanObject = (function () {

  let species = document.getElementById("name").value;
  let height = document.getElementById("feet").value * 12 + document.getElementById("inches").value;
  let weight = document.getElementById("weight").value;
  let diet = document.getElementById("diet").value;

  return new Human(species, height, weight, diet)

});

// Create Dino Compare Method 1
// TODO: compare height. 
let compareHeight = (dinoHeight, humanHeight) => {

  const ratio = Math.round(dinoHeight / humanHeight)

}


// Create Dino Compare Method 2
// TODO: compare weight. 
let compareWeight = (dinoWeight, humanWeight) => {

  const ratio = Math.round(dinoWeight / humanWeight)

}


// Create Dino Compare Method 3
// TODO: compare diet. 



// On button click, prepare and display info graphic

document.getElementById("btn").addEventListener("click", () => {

  // Remove form from screen
  document.getElementById("dino-compare").style.display = "none";

  const gridContainer = document.getElementById("grid");


  // iterate over dinoArray with forEach
  dinoArray().then(res => {

    let dinos = res.map(dino => new Dinosaur(dino.species, dino.weight, dino.height, dino.diet, dino.where, dino.when, dino.fact));

    // splice new "humanObject" so it gets displayed in the mid
    dinos.splice(4, 0, humanObject());

    dinos.forEach((element, index) => {

      // create elements for "gridItem"
      const gridItem = document.createElement("div");
      const gridItemHeader = document.createElement("h3");
      const gridItemImage = document.createElement("img");
      const gridItemParagraph = document.createElement("p");

      // set inner HTML & Attr for dinos: (<h3>, <img>, <p>) inside the "gridItem"
      gridItemHeader.innerHTML = element.species;
      gridItemImage.setAttribute("src", `./images/${element.species}.png`);
      gridItemParagraph.innerHTML = element.fact;

      // set inner innerHTML & Attr for "humanObject" and innerHTML for "Pigeon"
      if (index === 4) {

        gridItemImage.setAttribute("src", `./images/human.png`);
        gridItemParagraph.innerHTML = "You!";

      }

      if (element.species === "Pigeon") {

        gridItemParagraph.innerHTML = "All birds are Dinosaurs";
        console.log(element);

      }

      // assign class for gridItem
      gridItem.classList.add("grid-item");

      // append elements on "gridItem" = (gridItem + <h3>, <img>, <p>)
      gridItem.appendChild(gridItemHeader);
      gridItem.appendChild(gridItemImage);
      gridItem.appendChild(gridItemParagraph);

      gridContainer.appendChild(gridItem);

    });
  })

})