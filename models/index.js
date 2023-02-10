const User = require('./user');
const Review = require('./review');
const Pairing = require('./pairings');
const Comment = require('./comment');

//user associations
User.hasmany(Comment, {
    foreignKey: 'user_id'
});

User.hasmany(Review, {
    foreignKey: 'user_id'
});

User.hasmany(Pairing, {
    foreignKey: 'user_id'
});
//pairing associations
Pairing.belongsToMany(User, {
//*** */
    foreignKey: 'user_id',
    through: 'userPairing'
});

Pairing.hasmany(Review, {
    foreignKey: 'pairing_id',
    onDelete: 'CASCADE'
});
//review association
Review.belongsTo(User, {
    foreignKey: 'user_id'
});

Review.belongsTo(Pairing, {
    foreignKey: 'pairing_id'
});

Review.hasmany(Comment, {
    foreignKey: 'review_id',
    onDelete: 'CASCADE'
});

//comment associations
Comment.belongsTo(User, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE'
});

Comment.belongsTo(Review, {
    foreignKey: 'review_id'
});

module.exports = { User, Review, Pairing, Comment } ;