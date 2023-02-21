//will have to fetch by user id's

const getPairings = async () => {
    const response = await fetch("/api/pairing");

    var data = await response.json();
    console.log(data);

    if(!response.ok) {
        throw new Error('Could not fetch');
    }
};

const getPairingReviews = async () => {
    const response = await fetch("/api/review");

    var data = await response.json();
    console.log(data);

    if(!response.ok){
        throw new Error('Could not fetch');
    }
};

getPairings();
getPairingReviews();