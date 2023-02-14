const router = require("express").Router();
const path = require("path");
const { User, Pairing, Comment, Review } = require('../models');
const sequelize = require('sequelize');

router.get('/', async (req, res) => {
  try {
      const pairingData = await Pairing.findAll({
          include: [
            {
              model: User,
              attributes: {exclude: ['password']}
            },
            {
              model: Review,
              attributes: {exclude: ['id']}
            }
          ]
      });

      const pairings = await pairingData.map((pairing) => pairing.get({ plain: true}));

      res.status(200).json(pairings);
  } catch (err) {
      res.status(500).json(err);
  }
});

module.exports = router;
