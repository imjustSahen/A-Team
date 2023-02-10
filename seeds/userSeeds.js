const { User } = require('../models');

const userData = [
    {
        username: "Michael Scott",
        email: "greatscott@email.com",
        password: "No0neWilLGuess",
    },
    {
        username: "Dwight Schrute",
        email: "bestbeets@email.com",
        password: "BestBEETS"
    },
    {
        username: "Jimothy Halpert",
        email: "ilikesports@email.com",
        password: "SPORTSSS"
    }
];

const seedGallery = () => User.bulkCreate(userData);

module.exports = seedGallery;