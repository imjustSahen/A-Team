async function savePairings(event) {
    event.preventDefault();

    const beer_id = document.querySelector('#beer-id').value;
    const beer_img = document.querySelector('#beer-img-url').value;
    const dish_id = document.querySelector('#dish-id').value;
    const dish_img = document.querySelector('#dish-img-url').value;

    const response = await fetch(`/api/posts`, {
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
        document.location.replace('/dashboard/');
    } else {
        alert(response.statusText);
    }
}

document.querySelector('.save-pairing-btn').addEventListener('submit', savePairings);