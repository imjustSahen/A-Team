async function savePairings(event) {
    event.preventDefault();

    const beer_id = document.querySelector('#beer-id').innerHTML;
    const beer_img = document.querySelector('#beer-img-url').innerHTML;
    const dish_id = document.querySelector('#dish-id').innerHTML;
    const dish_img = document.querySelector('#dish-img-url').innerHTML;

    const response = await fetch(`/api/pairing`, {
        method: 'POST',
        body: JSON.stringify({
        beer_id,
        beer_img,
        dish_id,
        dish_img,
        }),
        headers: {
        'Content-Type': 'application/json'
        }
    });

    // Needs to be updated
    if (response.ok) {
        console.log(response);
        document.location.replace('/dashboard/');
    } else {
        alert(response.statusText);
    }
}

document.querySelector('.save-pairing-btn').addEventListener('submit', savePairings);