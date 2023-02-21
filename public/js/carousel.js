const getPairings = async () => {
    const response = await fetch("/api/pairing");

    var data = await response.json();
    console.log(data);

    if(!response.ok) {
        throw new Error('Could not fetch');
    }
};

getPairings();

//CAROUSEL AUTMATEDSLIDER 
// ------------------------->
// let slideIndex = 0;
// showSlides();

// function showSlides() {
//   let i;
//   let slides = document.getElementsByClassName("mySlides");
//   for (i = 0; i < slides.length; i++) {
//     slides[i].style.display = "none";
//   }
//   slideIndex++;
//   if (slideIndex > slides.length) {slideIndex = 1}
//   slides[slideIndex-1].style.display = "block";
//   setTimeout(showSlides, 8000); // Change image every 2 seconds
// };
//------------------------>