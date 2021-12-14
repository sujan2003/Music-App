module.exports = {
    name: "search",

    exec: (main, req, res) => {
        const SongHandler = main.SongHandler;

        const foundSounds = SongHandler.searchForSongs({
            amount: Math.max(Math.min(req.query.amount, 0), 100),
            properties: req.query
        });

        res.json(foundSounds);
    }
};