const spoonacularKey = "1391754ee9e9456bb811c8699181fa51";

const randomBeerAPI = "https://api.punkapi.com/v2/beers/random";
const randomBeerBtn = document.getElementById("get-beer-btn");
const randomDishBtn = document.getElementById("get-dish-btn");
const newPairingBtn = document.getElementById("new-pairing-btn");
const savePairingBtn = document.getElementById("save-pairing-btn");
const funnyMessageAPI =
  "https://cdn.jsdelivr.net/gh/maddhruv/loading-messages/messages.json";
function randomFunny() {
  $(".funny-modal").show();
  fetch(funnyMessageAPI)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
      const randomIndex = Math.floor(Math.random() * data.messages.length);
      $("#funny-message").text(data.messages[randomIndex]);
      console.log(data.messages[randomIndex]);
      const funnyParent = $(".funny-modal");
      funnyParent.children("#funny-message").text(randomIndex[0]);
    })
    .then(function () {
      setTimeout(function () {
        $(".funny-modal").hide(); // hide the modal after 3 seconds
      }, 3000);
    })
    .then(function () {
      randomBeer();
    })
    .catch(function (error) {
      console.error(error);
    });
}

// ---- Login ----
$(document).ready(function () {
  $(".login-modal").hide();
  $(".signup-modal").hide();
  $(".funny-modal").hide();
  $(function stickyNav() {
    $(window).on("scroll", function () {
      if ($(window).scrollTop() > 20) {
        $("header").addClass("sticky");
      } else {
        $("header").removeClass("sticky");
      }
    });
  });
});

$(document).ready(function () {
  $(".login-btn").click(function () {
    $(".loginOverlay").toggle();
  });
});

$(document).ready(function () {
  $("#login-close").click(function () {
    $(".loginOverlay").hide();
  });
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

$(document).ready(function () {
  $("#signup").click(function () {
    $(".signup-Overlay").toggle();
  });
});

$(document).ready(function () {
  $("#signup-close").click(function () {
    $(".signup-Overlay").hide();
  });
});
// // Get the modal
// var modal = document.getElementById("myModal");

// // Get the button that opens the modal
// var btn = document.getElementById("myBtn");

// // When the user clicks on the button, open the modal
// "pairing-btn".onclick = function () {
//   modal.style.display = "block";
// };
// function phraseModal() {
//   const modal = document.getElementById("myModal");
//   modal.style.display = "block";

//   setTimeout(function () {
//     modal.style.display = "none";
//   }, 5000);
// }
// Function to show modal with message for 5 seconds
// function showModal(message) {
//   // Get the modal element
//   const modal = document.getElementById("modal");

//   // Set the message in the modal
//   modal.querySelector(".modal-body").textContent = message;

//   // Show the modal
//   modal.classList.add("show");

//   // Hide the modal after 5 seconds
//   setTimeout(() => {
//     modal.classList.remove("show");
//   }, 5000);
// }

// Star Review
// const ratingStars = [...document.getElementsByClassName("rating-star")];
// const ratingResult = document.querySelector(".rating-result");

// printRatingResult(ratingResult);

// function executeRating(stars, result) {
//   const starClassActive = "rating-star fas fa-star";
//   const starClassUnactive = "rating-star far fa-star";
//   const starsLength = stars.length;
//   let i;
//   stars.map((star) => {
//     star.onclick = () => {
//       i = stars.indexOf(star);

//       if (star.className.indexOf(starClassUnactive) !== -1) {
//         printRatingResult(result, i + 1);
//         for (i; i >= 0; --i) stars[i].className = starClassActive;
//       } else {
//         printRatingResult(result, i);
//         for (i; i < starsLength; ++i) stars[i].className = starClassUnactive;
//       }
//     };
//   });
// }

// function printRatingResult(result, num = 0) {
//   result.textContent = `${num}/5`;
// }

// executeRating(ratingStars, ratingResult);

// newPairingBtn.addEventListener("click", function getRating() {
//   console.log(ratingResult);
// });

// API Calls
newPairingBtn.addEventListener("click", function getNewPairing() {
  randomFunny();
});

randomBeerBtn.addEventListener("click", function getRandomBeer() {
  randomFunny();
});

function randomBeer() {
  fetch(randomBeerAPI)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      const beerContent = $("#beer-content .content");
      beerContent.children(".beer-name").text(data[0].name);
      let beerId = data[0].id;
      let beerImg = data[0].image_url;
      let beerName = data[0].name;
      let beerDescription = data[0].description
        .split(" ")
        .slice(0, 25)
        .join(" ");
      beerContent.children("#beer-id").text(data[0].id);
      beerContent.children(".beer-description").text(`${beerDescription}...`);
      beerContent.children(".beer-abv").text(`${data[0].abv} ABV`);
      beerContent.children(".beer-tagline").text(data[0].tagline);
      // beerContent.children("#beer-img-url").text(data[0].image_url);
      // console.log(beerContent.children("#beer-img-url").text(data[0].image_url));
      if (data[0].image_url === null) {
        $(".beer-image img").attr("src", "./assets/BeerIcon.png");
      } else {
        $(".beer-image img").attr("src", data[0].image_url);
      }
      let foodPairingString = data[0].food_pairing[0].replaceAll(" ", "%");
      saveBeerDetails(beerId, beerName, beerImg);
      return getPairing(foodPairingString, beerId, beerName);
    });
}

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
        let dishName = data.results[0].title;
        let dishId = data.results[0].id;
        let dishImg = data.results[0].image;
        foodBody.children("#dish-id").text(dishId);
        saveFoodDetails(dishId, dishName, dishImg);
        getRecipe(dishId);
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
    "pizza",
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
      let dishId = data.searchResults[0].results[0].id;
      console.log(dishId);
      let dishName = data.searchResults[0].results[i].name;
      let dishImg = data.searchResults[0].results[i].image;
      let foodSummary = data.searchResults[0].results[i].content
        .split(" ")
        .slice(0, 25)
        .join(" ");
      foodBody.children(".dish-summary").html(`${foodSummary}...`);
      $("#recipe-link").attr("href", data.searchResults[0].results[i].link);
      foodBody.children("#dish-id").text(dishId);
      foodBody
        .children("#dish-img-url")
        .text(data.searchResults[0].results[i].image);
      saveFoodDetails(dishId, dishName, dishImg);
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

function saveBeerDetails(beerId, beerName, beerImg) {
  let beerDetails = {
    beer_id: beerId,
    beer_name: beerName,
    beer_img: beerImg,
  };

  console.log(beerDetails);
  savedBeer.push(beerDetails);
  localStorage.setItem("savedBeers", JSON.stringify(savedBeer));
}

function saveFoodDetails(dishId, dishName, dishImg) {
  let dishDetails = {
    dish_id: dishId,
    dish_name: dishName,
    dish_img: dishImg,
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

randomBeer();
