const path = require("path");
const express = require("express");
const hbs = require("hbs");
const geoCode = require("./utils/geocode");
const forecast = require("./utils/forecast");

const app = express();
const PORT = process.env.PORT || 3000;

//define paths for express config
const publicDir = path.join(__dirname, "../public");
//to customize view directory name
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");
// setup handlebar engines
app.set("view engine", "hbs");
//to set custtomized view directory name
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

//setup static directory to serve
app.use(express.static(publicDir));

app.get("", (req, res) => {
  res.render("index", {
    title: "Weather",
    name: "Yash"
  });
});
app.get("/about", (req, res) => {
  res.render("about", {
    title: "About Me",
    name: "Yash"
  });
});
app.get("/help", (req, res) => {
  res.render("help", {
    title: "Help Page",
    message: "help is on its way"
  });
});

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: "You Must Provide Address"
    });
  }
  geoCode(
    req.query.address,
    (error, { latitude, longitude, location } = {}) => {
      if (error) {
        return res.send({
          error
        });
      }
      forecast(latitude, longitude, (error, forecastData) => {
        if (error) {
          return res.send({
            error
          });
        }
        res.send({
          forecast: forecastData,
          location,
          address: req.query.address
        });
      });
    }
  );
});

//query string
app.get("/products", (req, res) => {
  if (!req.query.search) {
    return res.send({
      error: "You must provide a search term"
    });
  }
  console.log(req.query.search);

  res.send({
    products: []
  });
});

//404 page handler
app.get("/help/*", (req, res) => {
  res.render("404", {
    title: "404",
    message: "Help article not found"
  });
});
app.get("*", (req, res) => {
  res.render("404", {
    title: "404",
    message: "Page Not Found"
  });
});

//to start server
app.listen(PORT, () => {
  console.log(`Server is up on ${PORT} `);
});
