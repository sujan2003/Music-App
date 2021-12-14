import { Song } from "./Song.js"

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

        coverSource: ""
    }) {
        this.title = options.title;

        this.description = options.description;

        this.coverSource = options.coverSource;

        this.lastPlayedIndex = 0;

        this.songs = new Map();
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
}

export { Playlist }