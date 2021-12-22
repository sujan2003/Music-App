import { Events } from "./Events.js"
class AudioPlayer {
    /**
     * Create new audio player
     */
    constructor() {
        // HTML Elements
        this.musicContainer = document.getElementById("music-container");
        this.progressContainer = document.getElementById("progress-container");
        this.progressElement = document.getElementById("progress");
        this.audioElement = document.getElementById("sm-m5");
        this.coverElement = document.getElementById("sm-m5-cvr");
        this.titleElement = document.getElementById("title");
        this.artistElement = document.getElementById("artist");

        this.playBtn = document.getElementById("play");
        this.prevBtn = document.getElementById("prev");
        this.nextBtn = document.getElementById("next");

        // Variables
        this.events = new Events();
        this.isPlaying = false;

        // Setup audio player
        this._setup();
    }

    /**
     * Load a playlist
     * @param {Object} Playlist 
     */
    loadPlaylist(Playlist) {
        this.playlist = Playlist;

        this.loadSong(this.playlist.getSong(0));
    }

    /**
     * Load a song
     * @param {Object} Song 
     */
    loadSong(Song) {
        this.audioElement.src = Song.audioSource;
        this.setSongProgress(0);

        this._drawSongMetadata(Song);
        this._drawProgressBar();

        this.play();
    }

    /**
     * Play audio
     */
    play() {
        this.isPlaying = true;
        this.musicContainer.classList.add('play');
        this.playBtn.querySelector('i.fas').classList.remove('fa-play');
        this.playBtn.querySelector('i.fas').classList.add('fa-pause');
        this.audioElement.play();
    }

    /**
     * Pause audio
     */
    pause() {
        this.isPlaying = false;
        this.musicContainer.classList.remove('play')
        this.playBtn.querySelector('i.fas').classList.add('fa-play')
        this.playBtn.querySelector('i.fas').classList.remove('fa-pause')
        this.audioElement.pause();
    }

    /**
     * Play next song in loaded playlist
     */
    nextSong() {
        this.events.trigger("playingNextSong");
        const nextSong = this.playlist.getNextSong();

        this.loadSong(nextSong);
    }

    /**
     * Play previous song in loaded playlist
     */
    previousSong() {
        this.events.trigger("playingPreviousSong");
        const previousSong = this.playlist.getPreviousSong();

        this.loadSong(previousSong);
    }

    /**
     * Set song playback progress
     * @param {number} percent 
     */
    setSongProgress(percent) {
        if (this.audioElement.currentTime > 0) {
            const timePosition = this.audioElement.duration * percent;

            this.audioElement.currentTime = timePosition;
        }

        this._drawProgressBar(percent);
    }

    /**
     * Draw progress bar visual length
     */
    _drawProgressBar(percent) {
        this.progressElement.style.width = `${percent * 100}%`
    }

    /**
     * Draw song information
     * @param {Object} Song 
     */
    _drawSongMetadata(Song) {
        this.titleElement.innerText = Song.title;
        this.artistElement.innerText = Song.artist;

        this.coverElement.src = Song.coverSource;

        if (this.isPlaying) {
            this.musicContainer.classList.add('play');
        } else {
            this.musicContainer.classList.remove('play');
        }
    }

    /**
     * Setup events and audio player behaviour
     */
    _setup() {
        this.playBtn.addEventListener('click', (event) => {
            event.preventDefault();

            if (this.isPlaying) {
                this.pause();
            } else {
                this.play();
            }
        });

        this.prevBtn.addEventListener('click', (event) => {
            event.preventDefault();

            const { duration, currentTime } = this.audioElement;
            const percent = (currentTime / duration);

            // Rewind the song if more than 10% listened to
            if (percent > 0.1) {
                this.setSongProgress(0);
            } else {
                this.previousSong();
            }
        });

        this.nextBtn.addEventListener('click', (event) => {
            event.preventDefault();

            this.nextSong();
        });

        this.audioElement.addEventListener('ended', () => {
            this.nextSong();
        });

        this.audioElement.addEventListener('timeupdate', (event) => {
            const { duration, currentTime } = event.srcElement
            const percent = (currentTime / duration);

            this._drawProgressBar(percent);
        });

        this.progressContainer.addEventListener('click', (event) => {
            const barWidth = this.progressContainer.clientWidth;
            const clickPositionX = event.offsetX;
            const percent = (clickPositionX / barWidth);

            this.setSongProgress(percent);
        });

        // Play audio player once page interacted with
        let documentClicked = false;
        document.addEventListener('click', () => {
            if (!documentClicked) {
                this.play();
            }

            documentClicked = true;
        });
    }
}

export { AudioPlayer }