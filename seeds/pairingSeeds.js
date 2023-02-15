const { Pairing } = require('../models');

const pairingData = [
    {
        beer_id: 2,
        dish_id: 3,
        user_id: 3
    },
    {
        beer_id: 2,
        dish_id: 22,
        user_id: 1
    }
];

const seedGallery = () => Pairing.bulkCreate(pairingData);

module.exports = seedGallery;