const router = require("express").Router();
const path = require("path");
const { User, Pairing, Comment, Review } = require('../models');
const sequelize = require('sequelize');

//getting all pairing data for carousel cards
router.get('/', async (req, res) => {
  try {
      const pairingData = await Pairing.findAll({
        attributes: {exclude: ['user_id']},
          include: [
            {
              model: Review,
              attributes: {exclude: ['pairing_id', 'user_id']},
              include: [{model: User, attributes: {exclude: ['id']}}]
            }
          ]
      });

      const pairings = await pairingData.map((pairing) => pairing.get({ plain: true}));

      res.status(200).json(pairings);
  } catch (err) {
      res.status(500).json(err);
  }
});

//once a user is logged in, redirect to home page
router.get('/login', (req, res) => {
  // if(req.session.loggedIn) {
  //     res.redirect('/');
  //     return; 
  // }
});

//rendering sign up page
//once a user clicks sign up or generate pairing will redirect them to the pairings home page 
//with a modal 
router.get('/signup', (req, res) => {
  // res.redirect('signup')
});





module.exports = router;
