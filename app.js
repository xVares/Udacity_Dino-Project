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

const human = () => {

  let species = document.getElementById("name").value;
  let height = (document.getElementById("feet").value) * 12 + (parseInt(document.getElementById("inches").value));
  let weight = document.getElementById("weight").value;
  let diet = document.getElementById("diet").value;

  return new Human(species, height, weight, diet)

}


// Create Dino Compare Method 1 (height)

let compareHeight = (dinoHeight, humanHeight) => {

  const ratio = (dinoHeight / parseInt(humanHeight).toFixed(1));


  if (ratio === 1) {

    return `You have the same height!`

  }

  else if (ratio > 1) {

    return `The dino is ${ratio.toFixed(1)}x taller than you are!`

  }

  else {

    return `The dino is ${ratio.toFixed(1)}x smaller than you are!`

  }

}


// Create Dino Compare Method 2 (weight)

let compareWeight = (dinoWeight, humanWeight) => {

  let ratio = (dinoWeight / parseInt(humanWeight));

  if (ratio === 1) {

    return `You have the same weight!`

  }

  else if (ratio.toFixed(1) > 1) {

    return `The dino is ${ratio.toFixed(1)}x heavier than you are!`

  }

  else {

    return `The dino is ${ratio.toFixed(1)}x lighter than you are!`

  }

}




// Create Dino Compare Method 3 (diet)

let compareDiet = (dinoDiet, humanDiet) => {

  if (dinoDiet === humanDiet) {

    return `You and this dinosaur have the same diet!`

  }

  else {

    return `The dino's and your diet are different!`

  }

}


// Generate random number

let randomNum = () => {

  // generate random num -> round up to largest integer -> +1 otherwise range is only between 1-4
  return Math.floor(Math.random() * 5 + 1)

}



// Generate random fact

const randomFact = (dinoSpecies, dinoHeight, humanHeight, dinoWeight, humanWeight, dinoDiet, humanDiet, dinoWhere, dinoWhen) => {

  switch (randomNum()) {

    case 1:
      return compareHeight(dinoHeight, humanHeight);

    case 2:
      return compareWeight(dinoWeight, humanWeight);

    case 3:
      return compareDiet(dinoDiet, humanDiet);

    case 4:
      return `The ${dinoSpecies} lived in the ${dinoWhere} time period.`;

    case 5:
      return `The ${dinoSpecies} used to live in ${dinoWhen}.`;

  }

}

// On button click, prepare and display info graphic

document.getElementById("btn").addEventListener("click", () => {


  // Remove form from screen
  document.getElementById("dino-compare").style.display = "none";

  // declare "gridContainer"
  const gridContainer = document.getElementById("grid");

  // iterate over dinoArray with forEach
  dinoArray().then(res => {

    // Create "dinos" array
    let dinos = res.map(dino => new Dinosaur(

      dino.species,
      dino.weight,
      dino.height,
      dino.diet,
      dino.where,
      dino.when,
      dino.fact

    ));

    // splice new "humanObject" so it gets displayed in the mid
    dinos.splice(4, 0, human());

    dinos.forEach((element, index) => {

      // create elements for "gridItem"
      const gridItem = document.createElement("div");
      const gridItemHeader = document.createElement("h3");
      const gridItemImage = document.createElement("img");
      const gridItemParagraph = document.createElement("p");

      // set inner HTML & Attr for dinos: (<h3>, <img>, <p>) inside the "gridItem"
      gridItemHeader.innerHTML = element.species;
      gridItemImage.setAttribute("src", `./images/${element.species.toLowerCase()}.png`);
      gridItemParagraph.innerHTML = element.fact;

      // set inner innerHTML & Attr for "humanObject" and innerHTML for "Pigeon"
      gridItemParagraph.innerHTML = randomFact(

        element.species,
        element.height,
        human().height,
        element.weight,
        human().weight,
        element.diet,
        human().diet,
        element.where,
        element.when

      );

      if (index === 4) {

        // element.fact = ""
        gridItemImage.setAttribute("src", `./images/human.png`);
        gridItemParagraph.innerHTML = "You!"

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