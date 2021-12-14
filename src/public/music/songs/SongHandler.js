const Song = require('./Song.js');

const path = require('path');
const fs = require('fs');

class SongHandler {
    /**
     * Creates new music handler
     * @param {Object} options 
     * @param {String} options.songsDirectory
     */
    constructor(options = {
        songsDirectory
    }) {
        /**
         * Collection of songs
         * @type {Map}
         */
        this.songs = new Map();

        /**
         * Directory of song files
         * @type {String}
         */
        this.songsDirectory = options.songsDirectory || path.join(__dirname, './files')
    }

    add(index, songPath) {
        const metadata = require(path.join(songPath, '/metadata.json'));

        this.songs.set(index, new Song(this, {
            id: index,
            title: metadata.title,
            artist: metadata.artist,
            weather: metadata.weather,
            audioDirectory: path.join(songPath, '/audio.mp3'),
            coverDirectory: path.join(songPath, '/cover.jpeg'),
        }))
    }

    get(key) {
        return this.songs.get(key)
    }

    searchForSongs(options = {
        amount: 50,
        properties: {}
    }) {
        let output = [];

        for (let [_, song] of this.songs) {
            if (output.length >= options.amount) break

            if (song.hasProperties(options.properties)) {
                output.push(song.formatPublic());
            }
        }

        return output;
    }

    loadAll() {
        const songs = fs.readdirSync(this.songsDirectory);

        for (const files of songs) {
            this.add(files, path.join(this.songsDirectory, files));
        }
    }
}

module.exports = SongHandler;