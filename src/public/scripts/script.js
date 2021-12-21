import Cookies from "./modules/js.cookie.mjs";
import { AudioPlayer as Player } from "./modules/AudioPlayer.js"
import { Playlist } from "./modules/Playlist.js"

// Create new audio player
const AudioPlayer = new Player();

// TEMP SETUP FOR TESTING
let weather;

function updatePlayer() {
    const location = Cookies.get('location');
    const newWeather = (url => {
        const xmlHttp = new XMLHttpRequest();
        xmlHttp.open("GET", url, false);
        xmlHttp.send(null);

        return JSON.parse(xmlHttp.responseText);
    })(`/weather?location=${location}`);

    // If weather has changed
    if (!weather || (newWeather.main != weather.main)) {
        // Update weather variable
        weather = newWeather;

        // Display location and weather
        document.getElementById("city-name").innerText = (`${location} • ${newWeather.main}`);

        // Create a new playlist attributed to the current weather
        const playlist = new Playlist({
            title: 'Weather',

            loadFromAttributes: {
                weather: newWeather.main
            }
        });

        // Load playlist onto audio player once ready
        playlist.events.once("loadedSongs", async () => {
            AudioPlayer.loadPlaylist(playlist);
        });
    }
}

setInterval(() => {
    AudioPlayer.events.once("playingNextSong", () => {
        updatePlayer();
    });
}, 60 * 60 * 1000);

updatePlayer();