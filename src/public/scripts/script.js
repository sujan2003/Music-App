import Cookies from "./modules/js.cookie.mjs";
import { AudioPlayer as Player } from "./modules/AudioPlayer.js"
import { Playlist } from "./modules/Playlist.js"
import { Song } from "./modules/Song.js";

// TEMP SETUP FOR TESTING
const location = Cookies.get('location');
const weather = 'snow';

const AudioPlayer = new Player();
const CollectionOfSongs = new Playlist();

const snowSongs = (url => {
    const xmlHttp = new XMLHttpRequest();
    xmlHttp.open("GET", url, false);
    xmlHttp.send(null);

    return JSON.parse(xmlHttp.responseText);
})(`/music/search?weather=${weather}`);

for (let i in snowSongs) {
    const song = snowSongs[i];

    CollectionOfSongs.addSong(
        new Song({
            audioSource: song.stream,
            coverSource: song.cover,
            title: song.title,
            artist: song.artist
        })
    );
}

AudioPlayer.loadPlaylist(CollectionOfSongs);

document.getElementById("city-name").innerText = location;