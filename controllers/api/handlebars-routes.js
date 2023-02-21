const { Router } = require("express");
const express = require("express");
const router = express.Router();

router.get("/views/aboutUs", (req, res) => {
  res.render("aboutUs", { loggedIn: req.session.loggedIn
  });
});

router.get("/", (req, res) => {
  const imagesArr = [{ number: 2 }, { number: 3 }, { number: 4 }];
  res.render("home", {
    images: imagesArr, loggedIn: req.session.loggedIn
  });
});

router.get("/views/login", (req, res) => {
  res.render("login", { loggedIn: req.session.loggedIn
  });
});

router.get("/views/contactUs", (req, res) => {
  res.render("contactUs", { loggedIn: req.session.loggedIn
  });
});

router.get("/views/pairing", (req, res) => {
  res.render("pairing", { loggedIn: req.session.loggedIn
  });
});

module.exports = router;
