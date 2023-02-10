const sequelize = require('../config/connection');
const seedUsers = require('./userData');
// const seedPairings = require('./pairingSeeds');
// const seedReviews = require('./reviewSeeds');
// const seedComments = require('./commentSeeds');

const seedAll = async () => {
    await sequelize.sync({ force: true });
  
    await seedUsers();

    // await seedPairings();

    // await seedReviews();
  
    // await seedComments();
  
    process.exit(0);
};
  
seedAll();