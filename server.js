const path = require("path");
const express = require("express");
//import session
const session = require("express-session");
const exphbs = require("express-handlebars");
const app = express();
const PORT = process.env.PORT || 3001;

const sequelize = require("./config/connection");

const SequelizeStore = require("connect-session-sequelize")(session.Store);

const routes = require("./controllers");
const helpers = require("./utils/helpers");
// var loaderMessage = require("loader-message");
// var funnyMessage = loaderMessage.generate();
// console.log(funnyMessage);

const hbs = exphbs.create({ helpers });
//set up sessions
const sess = {
  secret: "Super secret secret",
  cookie: {
    maxAge: 24 * 60 * 60 * 1000,
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

app.engine("handlebars", hbs.engine);
app.set("view engine", "handlebars");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

app.use(routes);

sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log("Now listening"));
});
