const { Router } = require("express");
const express = require("express");
const router = express.Router();
const withAuth = require("../../utils/auth");

router.get("/views/aboutUs", (req, res) => {
  res.render("aboutUs");
});

//  GET home page
router.get("/", (req, res) => {
  res.render("home", { loggedIn: req.session.loggedIn });
});

router.get("/", (req, res) => {
  const imagesArr = [{ number: 2 }, { number: 3 }, { number: 4 }];
  res.render("home", {
    images: imagesArr,
  });
});

router.get("/views/login", (req, res) => {
  res.render("login");
});

router.get("/views/contactUs", (req, res) => {
  res.render("contactUs");
});

router.get("/views/pairing", (req, res) => {
  res.render("pairing");
});

module.exports = router;
