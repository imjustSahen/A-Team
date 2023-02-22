const router = require("express").Router();
const path = require("path");
const { User, Pairing, Comment, Review } = require("../models");
const sequelize = require("sequelize");
const express = require("express");

// Handlebar routes
router.get("/views/aboutUs", (req, res) => {
  res.render("aboutUs", { loggedIn: req.session.loggedIn });
});

router.get("/", (req, res) => {
  const imagesArr = [{ number: 2 }, { number: 3 }, { number: 4 }];
  res.render("home", {
    images: imagesArr,
    loggedIn: req.session.loggedIn,
  });
});

// router.get("/views/login", (req, res) => {
//   res.render("login", { loggedIn: req.session.loggedIn });
// });

router.get("/views/contactUs", (req, res) => {
  res.render("contactUs", { loggedIn: req.session.loggedIn });
});

router.get("/views/pairing", (req, res) => {
  res.render("pairing", { loggedIn: req.session.loggedIn });
});

//once a user is logged in, redirect to home page
router.get("/login", (req, res) => {
  if (req.session.loggedIn) {
    res.redirect("/");
    return;
  }
});

//rendering sign up page
//once a user clicks sign up or generate pairing will redirect them to the pairings home page
//with a modal
router.get("/signup", (req, res) => {
  // res.redirect('signup')
});

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
    res.status(200).json(pairings);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
