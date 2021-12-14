const fs = require('fs');

module.exports = {
    name: "stream",

    exec: (main, req, res) => {
        const Song = main.SongHandler.get(req.query.id);

        // If Song does not exist/cannot be found
        if (!Song) {
            res.writeHead(404);
            return;
        }

        // Look for audio file.
        const file = Song.audioDirectory;

        // If file does not exist/cannot be found
        if (!fs.existsSync(file)) {
            res.writeHead(404);
            return;
        }

        // Get file information
        const fileStat = fs.statSync(file);
        const totalSize = fileStat.size;

        // Partition file read stream
        const range = req.headers.range;
        const parts = range.replace(/bytes=/, '').split('-');
        const partitionStart = parseInt(parts[0], 10);
        const partitionEnd = parseInt(parts[1], 10) || totalSize - 1;
        const partitionSize = (partitionEnd - partitionStart) + 1;

        const rstream = fs.createReadStream(file, {
            start: partitionStart,
            end: partitionEnd
        });

        // Send response
        res.writeHead(206, {
            'Content-Range': 'bytes ' + partitionStart + '-' + partitionEnd + '/' + totalSize,
            'Accept-Ranges': 'bytes', 'Content-Length': partitionSize,
            'Content-Type': 'audio/mpeg'
        });

        rstream.pipe(res);
    }
};