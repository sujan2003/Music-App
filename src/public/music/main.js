const SongHandler = require('./songs/SongHandler.js');

const path = require('path');
const fs = require('fs');

class MusicAPI {
    /**
     * Creates new music api
     * @param {*} app Express app
     */
    constructor(app, options = {}) {
        /**
         * Express app
         */
        this.app = app;

        /**
         * Music Handler
         */
        this.SongHandler = new SongHandler(app, {});

        this.setup();
    }

    useWeatherApi(weatherApi) {
        this.weatherApi = weatherApi;
    }

    loadApis() {
        const directory = path.join(__dirname, './apis');
        const apis = fs.readdirSync(directory);

        for (const api of apis) {
            const mod = require(path.join(directory, api));

            this.app.get(`/music/${mod.name}`, (req, res, ...args) => {
                mod.exec(this, req, res, args);
            });
        }
    }

    setup() {
        this.SongHandler.loadAll();

        this.loadApis();
    }
}

module.exports = MusicAPI;