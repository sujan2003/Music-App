const express = require('express');
const request = require("request");
const bodyParser = require("body-parser");
const path = require('path');

require('dotenv').config({path: '.env.local'}) // Loads enviorment variables from .env file
const apiKey = `${process.env.OPEN_WEATHER_MAP}` // storing the variable from .env file to here

// Create a new express app
const app = new express();
app.use(express.urlencoded({extended: true}))
// Add static files to express app
app.use(express.static(path.join(__dirname, '/public')));
app.use(express.static(path.join(__dirname, '/public/views')));

let weatherDetails;

app.get('', (req, res) => {
    res.sendFile(path.join(__dirname, '/views/index.html'));
})


//this is for talking to music.html homepage from index.html
app.get('/music.html', (req, res) => {
    res.sendFile(path.join(__dirname, '/views/music.html'));
})

// click the 'new city' button on the music player page to go back to the home page
app.get('/index.html', (req, res) => {
    res.sendFile(path.join(__dirname, '/views/index.html'));
})

//this is for talking to favorites.html homepage from music.html
app.get('/favorites.html', (req, res) => {
    res.sendFile(path.join(__dirname, '/views/favorites.html'));
})

app.post('/city', (req, res) => {
    res.sendFile(path.join(__dirname, '/views/music.html'));
    let cityName = req.body.cityName;
    console.log(cityName)
    let url = `http://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&appid=${apiKey}`;
    request(url, function (err, response, body) {
        if (err) {
            res.render('index', { weather: null, error: 'Error, please try again' });
        } else {
            let weather = JSON.parse(body);
            weatherDetails = weather[0];
            console.log(weatherDetails);
        }
    })
})
app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, '/views/pageNotFound.html'));
})
 
// Listen to network requests from port 3000
app.listen(3000, (req, res) => {
    console.log(`[${new Date(Date.now()).toUTCString()}] listening on port 3000`);
})
