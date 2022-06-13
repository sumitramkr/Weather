const express = require("express");
const https = require("https");
const app = express();

const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req, res) {
    res.sendFile(__dirname + "/index.html");
});

app.post("/", function(req, res) {
    var city = req.body.city;
    var url = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=" + city + "&appid=4201138be56b49222d8e15ee2d5bc0bf";
    https.get(url, function(response) {
        response.on("data", function(data) {
            const weatherData = JSON.parse(data);
            const temperature = weatherData.main.temp;
            const description = weatherData.weather[0].description;
            const icon = weatherData.weather[0].icon;
            var iconURL = "http://openweathermap.org/img/wn/" + icon + "@2x.png";
            res.write("<p>The weather is as follows.</p>");
            res.write("<h1>" + temperature + " degrees celcius and " + description + "</h1><br>");
            res.write("<img src=" + iconURL + ">");
            res.send();
        });
    });
});

// app.get("/", function(req, res) {
//     var url = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=purnia&appid=4201138be56b49222d8e15ee2d5bc0bf";
//     https.get(url, function(response) {
//         response.on("data", function(data) {
//             const weatherData = JSON.parse(data);
//             const temperature = weatherData.main.temp;
//             const description = weatherData.weather[0].description;
//             res.send(temperature + " - " + description);
//         });
//     });
//     // res.send("Server is up");
// });

app.listen(5500, function() {
    console.log("Server is running on port 5500");
});