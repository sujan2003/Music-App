module.exports = {
    name: "cover",

    exec: (main, req, res) => {
        const Song = main.SongHandler.get(req.query.id);

        res.sendFile(Song.coverDirectory);
    }
};