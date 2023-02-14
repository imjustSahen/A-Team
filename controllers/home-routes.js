const router = require("express").Router();
const path = require("path");
const { User, Pairing, Comment, Review } = require('../models');
const sequelize = require('sequelize');

router.get('/', async (req, res) => {
  try {
      const pairingData = await Pairing.findAll({
        attributes: {exclude: ['id', 'user_id']},
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

module.exports = router;
