const { Router } = require("express");
const express = require("express");
const router = express.Router();

router.get("/views/aboutUs", (req, res) => {
  res.render("aboutUs", { layout: "main" });
});

router.get("/", (req, res) => {
  res.render("home", { layout: "main" });
});

router.get("/views/contactUs", (req, res) => {
  res.render("contactUs", { layout: "main" });
});

router.get("/views/pairing", (req, res) => {
  res.render("pairing", { layout: "main" });
});

module.exports = router;
