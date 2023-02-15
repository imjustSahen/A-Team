const spoonacularKey = "";

const randomBeerAPI = "https://api.punkapi.com/v2/beers/random";

// ----Login ----
$(document).ready(function() {
  $(".loginOverlay").hide();
});

$("#login").click(function(){
  $(".loginOverlay").toggle();
});

$("#modalClose").click(function(){
  $(".loginOverlay").toggle();
});


fetch(randomBeerAPI)
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    const beerFace = $("#beer-face .content");
    const beerContent = $("#beer-content .content");
    for (var i = 0; i < data.length; i++) {
      console.log(data[i]);
      beerContent.children(".beer-name").text(data[i].name);
      let beerDescription = data[i].description.split(" ").slice(0, 25).join(" ");
      beerContent.children(".beer-description").text(`${beerDescription}...`);
      beerContent.children(".beer-abv").text(`${data[i].abv} ABV`);
      beerContent.children(".beer-tagline").text(data[i].tagline);
      $(".beer-image img").attr("src", data[i].image_url);
    }
    let foodPairingString = data[0].food_pairing[0];
    const myArray = foodPairingString.split(" ");
    let addSymbol = myArray.join("%");
    return getApi(addSymbol);
  });

function getApi(addSymbol) {
  console.log(addSymbol);
  const foodPairingAPI = `https://api.spoonacular.com/recipes/complexSearch?query=${addSymbol}&apiKey=${spoonacularKey}`;

  fetch(foodPairingAPI)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      const foodFace = $("#food-face .content");
      const foodBody = $("#food-content .content");
      console.log(data);
      foodBody.children(".dish-name").text(data.results[0].title);
      $(".dish-image img").attr("src", data.results[0].image);
      let recipeId = data.results[0].id;
      console.log(recipeId);
      getRecipe(recipeId);
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

