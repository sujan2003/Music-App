class Song {
    /**
     * Creates a new song object
     * @param {Object} handler Handler of this song
     * @param {Object} options
     * @param {String} options.audioDirectory Directory of the audio file
     * @param {String} options.coverDirectory Directory of the cover image file
     * @param {String} options.genre
     * @param {String} options.mood
     */
    constructor(handler, options = {
        audioDirectory = "",
        coverDirectory = "",
        genre = "",
        mood = ""
    }) {
        this.handler = handler;

        this.audio = new Audio(options.audioDirectory);
        
        // todo: figure out cover image
        //this.cover = options.coverDirectory;

        this.genre = genre;

        this.mood = mood;
    }

    /**
     * Gets the audio object of the song
     * @return {Audio}
     */
    getAudio() {
        return this.audio;
    }

    /**
     * Gets the genre of the song
     * @return {String}
     */
    getGenre() {
        return this.genre;
    }

    /**
     * Gets the mood of the song
     * @return {String}
     */
    getMood() {
        return this.mood;
    }
}

module.exports = Song;