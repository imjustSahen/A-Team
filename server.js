const path = require("path");
const express = require("express");
//import session
const session = require("express-session");
//Loads the handlebars module
const exphbs = require("express-handlebars");
//Require the connect-session-sequelize and use it to create a custom store for Express.js sessions
const SequelizeStore = require("connect-session-sequelize")(session.Store);

const routes = require("./controllers");
const sequelize = require("./config/connection");
const helpers = require("./utils/helpers");

const app = express();
// sets the port to listen too
const PORT = process.env.PORT || 3001;

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

//sets the hhelpers module to be used in the templates. we currently dont have any helpers so I commented it out for now.
// const hbs = exphbs.create({ helpers });

//sets app to use handlebars
app.set("view engine", "hbs");
//Sets handlebars configurations
app.engine(
  "handlebars",
  handlebars({
    layoutsDir: __dirname + "/views/layouts",
  })
);

app.use(express.json());
//Use the express.urlencoded middleware to parse incoming request bodies in the URL-encoded format
app.use(express.urlencoded({ extended: true }));
//Serves static files (so we can access the public folder)
app.use(express.static(path.join(__dirname, "public")));
//Use the routes module to handle incoming HTTP requests
app.use(routes);

app.get("/", (req, res) => {
  //Sends the body of the page  "main.handlebars" to the container "index.handlebars"
  res.render("main", { layout: "index" });
});

// syncs sequilize with the DB without overwriting exisiting data, and start the app.
sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log("Now listening"));
});
