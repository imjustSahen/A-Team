
const getPairings = async () => {

    const response = await fetch("/api/pairing");


    var data = await response.json();
    console.log(data);

    if(!response.ok) {
        throw new Error('HTTP error!')
    }
};

getPairings();