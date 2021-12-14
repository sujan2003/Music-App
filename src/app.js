require('dotenv').config({ path: './.env.local' }) // Loads enviorment variables from .env file

const express = require('express');
const app = new express();
const path = require('path');

// Load middleware
app.use(express.urlencoded({ extended: true }))

// Host files
app.use('', express.static(path.join(__dirname, '/views')));
app.use('/scripts', express.static(path.join(__dirname, '/public/scripts')));
app.use('/scripts/modules', express.static(path.join(__dirname, '/public/scripts/modules')));
app.use('/images', express.static(path.join(__dirname, '/public/images')));
app.use('/css', express.static(path.join(__dirname, '/public/css')));

// APIs
const request = require("request");
const WeatherAPIKey = `${process.env.OPEN_WEATHER_MAP}` // storing the variable from .env file to here

const MusicAPI = require('./public/music/main.js');
const music = new MusicAPI(app);

app.get('/weather', (req, res) => {
    const Location = req.query.location;

    request(`http://api.openweathermap.org/data/2.5/weather?q=${Location}&units=metric&appid=${WeatherAPIKey}`, (err, response, body) => {
        body = JSON.parse(body);

        const weather = (body.cod != 404)
            ? {
                main: body.weather[0].main,
                description: body.weather[0].description,
                temp: body.main.temp,
            }
            : null;

        res.json(weather);
    })
});

// Home page
app.get('', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/views/index.html'));
})

app.get('/index.html', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/views/index.html'));
})

// Music page
app.get('/music.html', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/views/music.html'));
})

// Favorites page
app.get('/favorites.html', (req, res) => {
    res.sendFile(path.join(__dirname, '/publicviews/favorites.html'));
})

// Listen to network requests from port 3000
app.listen(3000, (req, res) => {
    console.log(`[${new Date(Date.now()).toUTCString()}] listening on port 3000`);
})
