class Song {
    /**
     * Creates a new song object
     * @param {Object} playlist Playlist of the song
     * @param {Object} options
     * @param {String} options.audioSource Directory of the audio file
     * @param {String} options.coverSource Directory of the cover image file
     * @param {String} options.title
     * @param {String} options.artist
     * @param {String[]} options.weather Weather of the song
     */
    constructor(options = {
        title: "",
        artist: "",
        weather: [],
        audioSource: "",
        coverSource: "",
    }) {
        this.title = options.title;
        this.artist = options.artist;
        this.weather = options.weather;

        this.audioSource = options.audioSource;
        this.coverSource = options.coverSource;
    }
}

export { Song };