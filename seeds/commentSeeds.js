const { Comment } = require('../models');

const commentData = [
    {
        comment_text: "Wow this pairing was awesome! I just went to the store, got everything we needed and prepared a meal with my spouse. Nice find!",
        user_id: 2
    },
    {
        comment_text: "I'm not so sure about this pairing. The bitterness from the beer did not pair well with my fettucini alfredo",
        user_id: 1
    },
    {
        comment_text: "Wow! cool!",
        user_id: 3
    }
];

const seedGallery = () => Comment.bulkCreate(commentData);

module.exports = seedGallery;