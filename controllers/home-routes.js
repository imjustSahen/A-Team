const router = require("express").Router();
const path = require("path");
const { User, Pairing, Comment, Review } = require('../models');
const sequelize = require('sequelize');


// This is the 'get' route
router.get("/", async (req, res) => {
  // Here, index.html is rendered
  res.sendFile(path.join(__dirname, "../views/index.html"));
});

module.exports = router;
