const router = require('express').Router();

const apiRoutes = require('./api');


//localhost:3001/api
router.use('/api', apiRoutes);


module.exports = router ;