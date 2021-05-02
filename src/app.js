const path = require("path");
const hbs = require("hbs");
const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");

const express = require("express");
const app = express();

const port = process.env.PORT || 3000;

// Defined paths for express configs
const publicPath = path.join(__dirname, "../public");
const viewPath = path.join(__dirname, "../templates/views");
const partialPath = path.join(__dirname, "../templates/partials");

// Setup handlerbars and views location
app.set("view engine", "hbs");
app.set("views", viewPath);
hbs.registerPartials(partialPath);

// Setup static directory to serve
app.use(express.static(publicPath));

app.get("", (req, res) => {
    res.render("index", {
        title: "Home Page",
        name: "shubham",
    });
});

app.get("/about", (req, res) => {
    res.render("about", {
        title: "About Me",
        name: "shubham",
    });
});

app.get("/help", (req, res) => {
    res.render("help", {
        title: "Happy to help you",
        helpText: "This is some helpful text",
        name: "shubham",
    });
});

app.get("/weather", (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: "You must provide a address",
        });
    }

    geocode(
        req.query.address,
        (error, { longitude, latitude, location } = {}) => {
            if (error) return res.send({ error });

            forecast(longitude, latitude, (error, forecastData) => {
                if (error) return res.send({ error });

                res.send({
                    forecast: forecastData,
                    location,
                    address: req.query.address,
                });
            });
        }
    );
});

app.get("/help/*", (req, res) => {
    res.render("helpError", {
        title: "Not a Page",
        message: "Help page not found",
        name: "shubham",
    });
});

app.get("*", (req, res) => {
    res.render("404Page", {
        title: "404 Page",
        message: "Page not found",
        name: "shubham",
    });
});

app.listen(port, () => {
    console.log("Server is up and running at " + port);
});
