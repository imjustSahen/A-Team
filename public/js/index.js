const spoonacularKey = "0302bedbbe4744d0b12db95311fb5abb";

const randomBeerAPI = "https://api.punkapi.com/v2/beers/random";
const randomBeerBtn = document.getElementById("get-beer-btn");
const randomDishBtn = document.getElementById("get-dish-btn");
const newPairingBtn = document.getElementById("new-pairing-btn");
const savePairingBtn = document.getElementById("save-pairing-btn");

// const savedEventResults = [];

// ---- Login ----
$(document).ready(function () {
  $(".loginOverlay").hide();

  $(function stickyNav() {
    $(window).on("scroll", function() {
        if($(window).scrollTop() > 20) {
            $("header").addClass("sticky");
        } else {
            //remove the background property so it comes transparent again (defined in your css)
           $("header").removeClass("sticky");
        }
    });
  });

});

$(".login-btn").click(function () {
  $(".loginOverlay").toggle();
});

$("#login-close").click(function () {
  $(".loginOverlay").hide();
});

// Sign up button from login
$("#signup-modal").click(function () {
  $(".loginOverlay").hide();
  $(".signup-Overlay").toggle();
});

// ---- Sign Up
$(document).ready(function () {
  $(".signup-Overlay").hide();
});

$("#signup").click(function () {
  $(".signup-Overlay").toggle();
});

$("#signup-close").click(function () {
  $(".signup-Overlay").hide();
});
// ---------------------------------- ///

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
      beerContent.children("#beer-id").text(data[0].id);
      beerContent.children(".beer-description").text(`${beerDescription}...`);
      beerContent.children(".beer-abv").text(`${data[0].abv} ABV`);
      beerContent.children(".beer-tagline").text(data[0].tagline);
      beerContent.children("#beer-img-url").text(data[0].image_url);
      // console.log(beerContent.children("#beer-img-url").text(data[0].image_url));
      if (data[0].image_url === null) {
        $(".beer-image img").attr("src", "../public/assets/BeerIcon.png");
      } else {
        $(".beer-image img").attr("src", data[0].image_url);
      }
      let foodPairingString = data[0].food_pairing[0].replaceAll(" ", "%");
      saveBeerDetails(beerId, beerName);
      return getPairing(foodPairingString, beerId, beerName);
    });
}

// In progress function for looping through food_pairing array
// function getPairing(foodPairingString) {

//   for (let i = 0; i < foodPairingString.length; i++) {
//     let foodPairing = foodPairingString[i].replaceAll(" ", "%");
//     const foodPairingAPI = `https://api.spoonacular.com/recipes/complexSearch?query=${foodPairing}&apiKey=${spoonacularKey}`;

//     console.log(foodPairing);
//     fetch(foodPairingAPI)
//       .then(function (response) {
//         return response.json();
//       })
//       .then(function (data) {
//         let totalResult = data.totalResults;
//         console.log(totalResult);
//         if (totalResult === 0) {
//           return randomDish();
//         } else {
//           const foodBody = $("#food-content .content");
//           console.log(data);
//           foodBody.children(".dish-name").text(data.results[0].title);
//           $(".dish-image img").attr("src", data.results[0].image);
//           let recipeId = data.results[0].id;
//           console.log(recipeId);
//           getRecipe(recipeId);
//         }
//         console.log(data.totalResults.value);
//         console.log(data.totalResults);
//         // savePairing(recipeId);
//       })
//       .catch(function (err) {
//         console.log(err);
//       });
//   }
// }

function getPairing(foodPairingString) {
  const foodPairingAPI = `https://api.spoonacular.com/recipes/complexSearch?query=${foodPairingString}&apiKey=${spoonacularKey}`;

  fetch(foodPairingAPI)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      let totalResult = data.totalResults;
      console.log(totalResult);
      if (totalResult === 0) {
        return randomDish();
      } else {
        const foodBody = $("#food-content .content");
        console.log(data);
        foodBody.children(".dish-name").text(data.results[0].title);
        $(".dish-image img").attr("src", data.results[0].image);
        foodBody.children("#dish-img-url").text(data.results[0].image);
        let recipeId = data.results[0].id;
        foodBody.children("#dish-id").text(recipeId);
        console.log(recipeId);
        saveFoodDetails(recipeId);
        getRecipe(recipeId);
      }
      console.log(data.totalResults.value);
      console.log(data.totalResults);
    })
    .catch(function (err) {
      console.log(err);
    });
}

randomDishBtn.addEventListener("click", function getRandomDish() {
  return randomDish();
});

function randomDish() {
  const dishOptions = [
    "chicken",
    "beef",
    "tacos",
    "vegetarian",
    "pasta",
    "hamburger",
  ];
  const randomDishOptions = Math.floor(Math.random() * dishOptions.length);
  console.log(dishOptions[randomDishOptions]);
  const randomDish = dishOptions[randomDishOptions];

  const foodPairingAPI = `https://api.spoonacular.com/food/search?query=${randomDish}&number=20&apiKey=${spoonacularKey}`;

  fetch(foodPairingAPI)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      const foodBody = $("#food-content .content");
      console.log(data);

      let i = Math.floor(Math.random() * 20);
      console.log(i);
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
      foodBody.children("#dish-id").text(recipeId);
      foodBody.children("#dish-img-url").text(data.searchResults[0].results[i].image);
      saveFoodDetails(recipeId);
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
const savedEventResults = [];
const savedBeer = [];
const savedFood = [];

function saveBeerDetails(beerId, beerName) {
  let beerDetails = {
    beer_id: beerId,
    beer_name: beerName,
  };

  console.log(beerDetails);
  savedBeer.push(beerDetails);
  localStorage.setItem("savedBeers", JSON.stringify(savedBeer));
}

function saveFoodDetails(recipeId) {
  let dishDetails = {
    recipe_id: recipeId,
  };

  console.log(dishDetails);
  savedBeer.push(dishDetails);
  localStorage.setItem("savedFood", JSON.stringify(savedFood));
}

savePairingBtn.addEventListener("click", function (e) {
  e.preventDefault();

  // localStorage.getItem("savedBeers", JSON.stringify([savedBeer, savedFood]))
  // localStorage.getItem("savedFood", JSON.stringify(savedFood))
  console.log(savedBeer, savedFood);
});

// randomBeer();
