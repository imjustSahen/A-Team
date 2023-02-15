const spoonacularKey = "3d1a85ae117b432aa54f8a339a92c766";
const randomBeerAPI = "https://api.punkapi.com/v2/beers/random";
const randomBeerBtn = document.getElementById("get-beer-btn");
const randomDishBtn = document.getElementById("get-dish-btn");
const newPairingBtn = document.getElementById("new-pairing-btn");
const savePairingBtn = document.getElementById("save-pairing-btn");

const savedEventResults = [];

// ---- Login ----
$(document).ready(function () {
  $(".loginOverlay").hide();
});

$("#login").click(function () {
  $(".loginOverlay").toggle();
});

$("#modalClose").click(function () {
  $(".loginOverlay").toggle();
});

newPairingBtn.addEventListener("click", function getNewPairing() {
  return randomBeer();
});

randomBeerBtn.addEventListener("click", function getRandomBeer() {
  return randomBeer();
});

function randomBeer() {
  fetch(randomBeerAPI)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      const beerContent = $("#beer-content .content");
      console.log(data[0]);
      beerContent.children(".beer-name").text(data[0].name);
      let beerId = data[0].id;
      let beerName = data[0].name;
      let beerDescription = data[0].description
        .split(" ")
        .slice(0, 25)
        .join(" ");
      beerContent.children(".beer-description").text(`${beerDescription}...`);
      beerContent.children(".beer-abv").text(`${data[0].abv} ABV`);
      beerContent.children(".beer-tagline").text(data[0].tagline);
      $(".beer-image img").attr("src", data[0].image_url);
      let foodPairingString = data[0].food_pairing[0].replaceAll(" ", "%");
      // saveBeerDetails(beerId, beerName);
      return getPairing(foodPairingString);
    });
}

function getPairing(foodPairingString) {
  const foodPairingAPI = `https://api.spoonacular.com/recipes/complexSearch?query=${foodPairingString}&apiKey=${spoonacularKey}`;

  fetch(foodPairingAPI)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      const foodBody = $("#food-content .content");
      console.log(data);
      foodBody.children(".dish-name").text(data.results[0].title);
      $(".dish-image img").attr("src", data.results[0].image);
      let recipeId = data.results[0].id;
      console.log(recipeId);
      getRecipe(recipeId);
      // savePairing(recipeId);
    })
    .catch(function (err) {
      console.log(err);
    });
}

randomDishBtn.addEventListener("click", function getRandomDish() {
  return randomDish();
});

function randomDish() {
  const dishOptions = ["chicken", "beef", "tacos", "vegetarian"];
  const randomDishOptions = Math.floor(Math.random() * dishOptions.length);
  console.log(dishOptions[randomDishOptions]);
  const randomDish = dishOptions[randomDishOptions];

  const foodPairingAPI = `https://api.spoonacular.com/food/search?query=${randomDish}&number=5&apiKey=${spoonacularKey}`;

  fetch(foodPairingAPI)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      const foodBody = $("#food-content .content");
      console.log(data);

      let i = Math.floor(Math.random() * 5);

      foodBody
        .children(".dish-name")
        .text(data.searchResults[0].results[i].name);
      $(".dish-image img").attr("src", data.searchResults[0].results[i].image);
      let recipeId = data.searchResults[0].results[0].id;
      console.log(recipeId);
      let foodSummary = data.searchResults[0].results[i].content
        .split(" ")
        .slice(0, 25)
        .join(" ");
      foodBody.children(".dish-summary").html(`${foodSummary}...`);
      $("#recipe-link").attr("href", data.searchResults[0].results[i].link);
      // saveFoodDetails(recipeId)
    })
    .catch(function (err) {
      console.log(err);
    });
}

function getRecipe(recipeId) {
  const recipeInfoAPI = `https://api.spoonacular.com/recipes/${recipeId}/information?apiKey=${spoonacularKey}`;
  fetch(recipeInfoAPI)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      const foodBody = $("#food-content .content");
      let foodSummary = data.summary.split(" ").slice(0, 25).join(" ");
      foodBody.children(".dish-summary").html(`${foodSummary}...`);
      $("#recipe-link").attr("href", data.sourceUrl);
      console.log(data);
    });
}

// Not complete yet
// function saveBeerDetails(beerId, beerName) {
//   let beerDetails = {
//     beer_id: beerId,
//     beer_name: beerName,
//   };
//   return savePairing(beerDetails);
// }

// function saveFoodDetails(recipeId) {
//   let foodDetails = {
//     recipe_id: recipeId,
//   };
//   return savePairing(foodDetails);
// }

// function savePairing(beerDetails, foodDetails) {

//   let savedEvent = {
//     beer: beerDetails,
//     food: foodDetails,
//   };
//   console.log(savedEvent);

//   savePairingBtn.addEventListener("click", function (e) {
//     e.preventDefault();

//     savedEventResults.push(savedEvent);

//     localStorage.setItem(
//       "savedEventResults",
//       JSON.stringify(savedEventResults)
//     );
//   });
// }
