module.exports = {
    name: "info",

    exec: (main, req, res) => {
        const SongHandler = main.SongHandler;
        const Song = main.SongHandler.get(req.query.id);

        res.json(Song);
    }
};