const express = require('express');
const path = require('path');

require('dotenv').config({path: '.env.local'}) // Loads enviorment variables from .env file

// Create a new express app
const app = new express();

// Add static files to express app
app.use(express.static(path.join(__dirname, '/public')));
app.use(express.static(path.join(__dirname, '/public/views')));

app.get('', (req, res) => {
    res.sendFile(path.join(__dirname, '/views/index.html'));
})

app.get('/', (req, res) => {
    res.send('Hello');
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
 
// Listen to network requests from port 3000
app.listen(3000, (req, res) => {
    console.log(`[${new Date(Date.now()).toUTCString()}] listening on port 3000`);
})

// console.log(process.env.OPEN_WEATHER_MAP)