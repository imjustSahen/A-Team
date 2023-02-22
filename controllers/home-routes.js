const router = require("express").Router();
const path = require("path");
const { User, Pairing, Comment, Review } = require("../models");

//getting all pairing data for carousel cards
router.get("/", async (req, res) => {
  try {
    const pairingData = await Pairing.findAll({
      attributes: { exclude: ["user_id"] },
      include: [
        {
          model: Review,
          attributes: { exclude: ["pairing_id", "user_id"] },
          include: [{ model: User, attributes: { exclude: ["id"] } }],
        },
      ],
    });

    const pairings = await pairingData.map((pairing) =>
      pairing.get({ plain: true })
    );
    const imagesArr = [{ number: 2 }, { number: 3 }, { number: 4 }];
    res.render("home", {
      pairings,
      images: imagesArr,
      loggedIn: req.session.loggedIn,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Handlebar routes
router.get("/aboutUs", (req, res) => {
  res.render("aboutUs", { loggedIn: req.session.loggedIn });
});

router.get("/contactUs", (req, res) => {
  res.render("contactUs", { loggedIn: req.session.loggedIn });
});

router.get("/pairing", async (req, res) => {
  try {
     if (req.session.loggedIn) {
      const pairingData = await Pairing.findAll({
        //uses id from the session
        where: { user_id: req.session.user_id },
        attributes: { exclude: ["user_id"] },
        include: [
          {
            model: Review,
            attributes: { exclude: ["pairing_id", "user_id"] },
            include: [{ model: User, attributes: { exclude: ["id"] } }],
          },
        ],
      });

      const pairings = pairingData.map((pairing) =>
        pairing.get({ plain: true })
      );

      res.render("pairing", {
        pairings,
        loggedIn: req.session.loggedIn,
      });
    } else {
      res.render("pairing");
    }
  } catch (err) {
      res.status(500).json(err);
  }
});

module.exports = router;
