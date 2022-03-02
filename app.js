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
const humanObject = () => {

  let species = document.getElementById("name").value;
  let height = document.getElementById("feet").value * 12 + document.getElementById("inches").value;
  let weight = document.getElementById("weight").value;
  let diet = document.getElementById("diet").value;

  return new Human(species, height, weight, diet)

};

// Create Dino Compare Method 1
// TODO: compare height. 

const compareHeight = (dinoHeight, humanHeight) => {

  const ratio = Math.round(dinoHeight / humanHeight);

  if (ratio === 1) {

    return `You have the same height!`

  }

  else if (ratio < 1) {

    return `The dino is ${ratio}x taller than you are!`

  }

  else if (ratio > 1) {

    return `The dino is ${ratio}x smaller than you are!`

  }

}


// Create Dino Compare Method 2
// TODO: compare weight. 

const compareWeight = (dinoWeight, humanWeight) => {

  const ratio = Math.round(dinoWeight / humanWeight)

  if (ratio === 1) {

    return `You have the same weight!`

  }

  else if (ratio < 1) {

    return `The dino is ${ratio}x heavier than you are!`

  }

  else if (ratio > 1) {

    return `The dino is ${ratio}x lighter than you are!`

  }

}




// Create Dino Compare Method 3
// TODO: compare diet. 
const compareDiet = (dinoDiet, humanDiet) => {

  if (dinoDiet === humanDiet) {

    return `You have the same diet!`

  }

  else {

    return `Your diet is different! The dino's diet is ${dinoDiet} and your's is ${humanDiet}.`

  }

}


// Generate random number
const randomNum = () => {

  // generate random num -> round up to largest integer -> +1 otherwise range is only between 1-4
  return Math.floor(Math.random() * 5 + 1)

}

console.log(randomNum());


// Generate random fact





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

      // random fact function
      const randomFact = () => {

        switch (randomNum()) {

          case 1:
            return compareHeight(element.height, humanObject.height);

          case 2:
            return compareWeight(element.weight, humanObject.weight);

          case 3:
            return compareDiet(element.diet, humanObject.diet);

          case 4:
            return `The ${element.species} lived in the ${element.when} time period.`;

          case 5:
            return `The ${element.species} used to live in ${element.where}.`;

        }

      }

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
        gridItemParagraph.innerHTML = randomFact();

      }

      if (element.species === "Pigeon") {

        gridItemParagraph.innerHTML = "All birds are Dinosaurs";

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