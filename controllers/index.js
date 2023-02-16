const router = require("express").Router();
const handlebarRoutes = require("./api/handlebars-routes");
const apiRoutes = require("./api");
const homeRoutes = require("./home-routes");
//localhost:3001/api
router.use("/api", apiRoutes);
router.use("/", handlebarRoutes);
router.use("/", homeRoutes);

module.exports = router;
