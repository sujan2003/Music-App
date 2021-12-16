import { Song } from "./Song.js"
import { Events } from "./Events.js"

// Function to format query strings from objects
// https://stackoverflow.com/questions/1714786/query-string-encoding-of-a-javascript-object
const serializeQuery = (obj) => {
    var str = [];
    for (var p in obj)
        if (obj.hasOwnProperty(p)) {
            str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
        }
    return str.join("&");
}

class Playlist {
    /**
     * Creates a new playlist (collection of tracks)
     * @param {Object} options
     * @param {String} options.title
     * @param {String} options.description
     * @param {String} options.coverSource
     */
    constructor(options = {
        title: "Playlist",
        description: "",

        loadFromAttributes: {}
    }) {
        this.title = options.title;
        this.description = options.description;
        this.coverSource = options.coverSource;

        this.songs = new Map();

        this.lastPlayedIndex = 0;

        this.events = new Events();

        if (options.loadFromAttributes) {
            this.loadSongsWithAttributesFromServer(options.loadFromAttributes);
        }
    }

    /**
     * Add song to playlist
     * @param {Song} Song 
     * @returns {void}
     */
    addSong(Song) {
        this.songs.set(this.getSize(), Song);
    }

    removeSong(id) {
        this.songs.delete(id);
    }

    getSong(id) {
        this.lastPlayedIndex = id;

        return this.songs.get(id);
    }

    getSize() {
        return this.songs.size;
    }

    getNextSong() {
        const nextIndex = (this.lastPlayedIndex + 1) % this.getSize();

        this.lastPlayedIndex = nextIndex;

        return this.getSong(nextIndex);
    }

    getPreviousSong() {
        let previousIndex = (this.lastPlayedIndex - 1) % this.getSize();

        if (previousIndex < 0) {
            previousIndex = (this.getSize() - 1);
        }

        this.lastPlayedIndex = previousIndex;

        return this.getSong(previousIndex);
    }

    getRandomSong() {
        const randomIndex = Math.floor(Math.random() * this.getSize());

        this.randomIndex = randomIndex;

        return this.getSong(randomIndex);
    }

    async loadSongsWithAttributesFromServer(attributes) {
        const songs = await (async url => {
            const xmlHttp = new XMLHttpRequest();
            xmlHttp.open("GET", url, false);
            xmlHttp.send(null);

            return JSON.parse(xmlHttp.responseText);
        })(`/music/search?${serializeQuery(attributes)}`);

        for (let i in songs) {
            const song = songs[i];

            this.addSong(
                new Song({
                    audioSource: song.stream,
                    coverSource: song.cover,
                    title: song.title,
                    artist: song.artist
                })
            );
        }

        this.events.trigger("loadedSongs");
    }
}

export { Playlist }