const savePairing = document.getElementById("save-pairing-btn");

async function savePairings(event) {
    event.preventDefault();

    const beer_name = document.querySelector('.beer-name').innerHTML;
    const beer_id = document.querySelector('#beer-id').innerHTML;
    const beer_img = $(".beer-image img").attr("src");
    const dish_id = document.querySelector('#dish-id').innerHTML;
    const dish_name = document.querySelector('.dish-name').innerHTML;
    const dish_img = $(".dish-image img").attr("src");
    const dish_link = $("#recipe-link").attr("href");
    console.log(beer_img, dish_img, dish_link)

    const response = await fetch(`/api/pairing`, {
        method: 'POST',
        body: JSON.stringify({
        beer_id,
        beer_name,
        beer_img,
        dish_id,
        dish_name,
        dish_img,
        dish_link,
        }),
        headers: {
        'Content-Type': 'application/json'
        }
    });

    // Needs to be updated
    if (response.ok) {
        console.log(response);
        // document.location.replace('/dashboard/');
    } else {
        alert(response.statusText);
    }
}

savePairing.addEventListener('click', savePairings);