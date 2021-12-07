const musicContainer = document.getElementById("music-container")
const playBtn = document.getElementById("play")
const prevBtn = document.getElementById("prev")
const nextBtn = document.getElementById("next")
console.log("hi")

const audio = document.getElementById("sm-m5")
const cover = document.getElementById("sm-m5-cvr")
const title = document.getElementById("title")
const artist = document.getElementById("artist")

// Audio Objects 
// i literally could find no way to use audio objects in a music player, i scoured the internet far and wide and still nothing
// so for now, i just used an html audio and coverimg and it works fine
/*const sunny1 = new Audio("/music/sm-m5.mp3")
const sunny2 = new Audio("/music/ws-hs.mp3")
const sunny3 = new Audio("/music/p-jb.mp3")
const cloudy1 = new Audio("/music/ritd-a.mp3")
const cloudy2 = new Audio("/music/fmttm-fs.mp3")
const cloudy3 = new Audio("/music/nc-od.mp3")
const rain1 = new Audio("/music/p-es.mp3")
const rain2 = new Audio("/music/chfil-ep.mp3")
const rain3 = new Audio("/music/rhw-rm.mp3")
const thunderstorm1 = new Audio("/music/byg-lc.mp3")
const thunderstorm2 = new Audio("/music/tw-ja.mp3")
const thunderstorm3 = new Audio("/music/l-lm.mp3")
const snow1 = new Audio("/music/c-ts.mp3")
const snow2 = new Audio("/music/mol-ss.mp3")
const snow3 = new Audio("/music/ef-crw.mp3")*/

const progress = document.getElementById("progress")
const progressContainer = document.getElementById("progress-container")


//commented out so the music player works
    // import {Song} from "./modules/Song"
    // console.log(Song)

// song playlists
const sunny = [
    {
        title: "Sunday Morning",
        artist: "Maroon 5",
        img: "sm-m5-cvr",
        music: "sm-m5"
    }, 

    {
        title: "Watermelon Sugar", 
        artist: "Harry Styles",
        img: "ws-hs-cvr",
        music: "ws-hs"
    }, 

    {
        title: "Peaches",
        artist: "Justin Bieber",
        img: "p-jb-cvr",
        music: "p-jb"
    }
]

const cloudy = [
    {
        title: "Rolling in the Deep",
        artist: "Adele",
        img: "ritd-a-cvr",
        music: "ritd-a"
    },

    {
        title: "Fly Me to the Moon", 
        artist: "Frank Sinatra",
        img: "fmttm-fs-cvr",
        music: "fmttm-fs"
    },

    {
        title: "Night Changes",
        artist: "One Direction",
        img: "nc-od-cvr",
        music: "nc-od"
    }
]
// these next 3 playlists will need to have title, artist, img, music added to it like the ones above
const rain = [
    "Perfect - Ed Sheeran", 
    "Can't Help Falling in Love - Elvis Presley", 
    "Right Here Waiting - Richard Marx"
]

const thunderstorm = [
    "Before You Go - Lewis Capaldi", 
    "Train Wreck - James Arthur", 
    "Lightning - Little Mix"
]

const snow = [
    "cardigan - Taylor Swift", 
    "Mystery of Love - Sufjan Stevens", 
    "Electric Feel - CRW"
]

const playlists = ["sunny", "cloudy", "rain", "thunderstorm", "snow"]; //use this to determine which playlist to play? idk

// const songs = new Audio("/music/APLmusic.mp3");


// keep track of the songs
let songIndex = 0

// load song info into dom
loadSong(sunny[songIndex]) // currently the loadSong functions with the assigned playlist, in this case i assigned it 'sunny' for testing purposes

// updates details of the song
function loadSong(song){
    title.innerText = song.title;
    artist.innerText = song.artist;
    audio.src = `/music/${song.music}.mp3`;
    cover.src = `/images/${song.img}.jpeg`;
}

function playSong(){
    musicContainer.classList.add('play');
    playBtn.querySelector('i.fas').classList.remove('fa-play')
    playBtn.querySelector('i.fas').classList.add('fa-pause')

    audio.play()
}

function pauseSong(){
    musicContainer.classList.remove('play')
    playBtn.querySelector('i.fas').classList.add('fa-play')
    playBtn.querySelector('i.fas').classList.remove('fa-pause')

    audio.pause()
}

function prevSong() {
    songIndex--;

    if(songIndex < 0){
        songIndex = sunny.length - 1 //only works with 'sunny' playlist right now
    }

    loadSong(sunny[songIndex]) //only works with 'sunny' playlist right now
    playSong()
}

function nextSong() {
    songIndex++;

    if(songIndex > sunny.length-1){ //only works with 'sunny' playlist right now
        songIndex = 0
    }

    loadSong(sunny[songIndex]) //only works with 'sunny' playlist right now
    playSong()
}

function updateProgress(x){
    const {duration, currentTime} = x.srcElement
    const progressPercent = (currentTime/duration)*100
    progress.style.width = `${progressPercent}%`
}

function setProgress(x){
    const width = this.clientWidth
    const clickX = x.offsetX
    const duration = audio.duration

    audio.currentTime = (clickX/width)*duration
}


// eventlisteners
playBtn.addEventListener('click', () => {
    const isPlaying = musicContainer. classList.contains('play')

    if (isPlaying){
        pauseSong()
    } else{
        playSong()
    }
});

// change songs
prevBtn.addEventListener('click', prevSong)
nextBtn.addEventListener('click', nextSong)

audio.addEventListener('timeupdate', updateProgress)

progressContainer.addEventListener('click', setProgress)

audio.addEventListener('ended', nextSong)