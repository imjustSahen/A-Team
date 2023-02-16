const router = require("express").Router();
const path = require("path");
const { User, Pairing, Comment, Review } = require('../models');
const sequelize = require('sequelize');
const withAuth = require('../utils/auth');

router.get('/', withAuth, async (req, res) => {
    try {
        const pairingData = await Pairing.findAll({
            //uses id from the session
            where: { user_id: req.session.user_id },
            attributes: { exclude: ['user_id'] },
            include: [
                {
                    model: Review,
                    attributes: { exclude: ['pairing_id', 'user_id'] },
                    include: [{ model: User, attributes: { exclude: ['id'] } }]
                }
            ]
        });

        const pairings = await pairingData.map((pairing) => pairing.get({ plain: true }));

        res.status(200).json(pairings);
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;