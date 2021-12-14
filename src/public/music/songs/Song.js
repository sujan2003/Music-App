class Song {
    constructor(handler, options = {
        id: null,
        title: "",
        artist: "",
        weather: [],
        audioDirectory: "",
        coverDirectory: "",
    }) {
        /**
         * Handler
         * @type {Object}
         */
        this.handler = handler;

        /**
         * @type {number}
         */
        this.id = options.id;

        /**
         * @type {String}
         */
        this.title = options.title;

        /**
         * @type {String}
         */
        this.artist = options.artist;

        /**
         * @type {Object[String]}
         */
        this.weather = options.weather;

        /**
         * @type {String}
         */
        this.audioDirectory = options.audioDirectory;

        /**
         * @type {String}
         */
        this.coverDirectory = options.coverDirectory;
    }

    hasProperties(properties) {
        for (let key in properties) {
            const typeChecks = {
                "object": (a, b) => { return a.includes(b) },
                "string": (a, b) => { return a === b },
                "number": (a, b) => { return a == b }
            }

            const check = typeChecks[typeof (this[key])];

            if (check && check(this[key], properties[key])) {
                return true
            }
        }
    }

    formatPublic() {
        return {
            id: this.id,
            title: this.title,
            artist: this.artist,
            cover: (`/music/cover?id=${this.id}`),
            stream: (`/music/stream?id=${this.id}`),
            weather: this.weather,
        }
    }
}

module.exports = Song;