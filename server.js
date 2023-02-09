const path = require("path");
const express = require("express");
//import session
const session = require("express-session");
const exphbs = require("express-handlebars");

const SequelizeStore = require("connect-session-sequelize")(session.Store);

const routes = require("./controllers/routes");
const sequelize = require("./config/connection");
const helpers = require("./utils/helpers");

const app = express();
const PORT = process.env.PORT || 3001;
//set up sessions
const sess = {
  secret: "Super secret secret",
  cookie: {
    maxAge: 60 * 60 * 1000,
    httpOnly: true,
    secure: false,
    sameSite: "strict",
  },
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize,
  }),
};
//set as middleware
app.use(session(sess));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(routes);

sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log("Now listening"));
});
