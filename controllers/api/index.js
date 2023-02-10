const router = require("express").Router();

const userRoutes = require("./user-routes");
const pairingRoutes = require("./pairing-routes");
const reviewRoutes = require("./review-routes");
const commentRoutes = require("./comment-routes");

//localhost:3001/api
router.use("/user", userRoutes);
router.use("/pairing", pairingRoutes);
router.use("/review", reviewRoutes);
router.use("/comment", commentRoutes);

module.exports = router;
