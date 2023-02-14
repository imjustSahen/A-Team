const { Review } = require('../models');

const reviewData = [
    {
        review_text: "Not sure who's creating these pairings... might need some extra help. Check this one out!",
        user_id: 2,
        rating: 1
    },
    {
        review_text: "May i just say how stoked i am to find such a dish, I didn't know it existed! If you can, you have to try this",
        user_id: 1,
        rating: 5
    },
    {
        review_text: "BEST pairing i could have ever imagined",
        user_id: 3,
        rating: 5
    }
];

const seedGallery = () => Review.bulkCreate(reviewData);

module.exports = seedGallery;