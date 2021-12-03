const musicContainer = document.getElementById("music-container")
const playBtn = document.getElementById("play")
const prevBtn = document.getElementById("prev")
const nextBtn = document.getElementById("next")
// const audio = document.getElementById("audio")
const sunny1 = new Audio("/music/Sunday Morning - Maroon 5.mp3")
const sunny2 = new Audio("/music/Watermelon Sugar - Harry Styles.mp3")
const sunny3 = new Audio("/music/Peaches - Justin Bieber.mp3")
const cloudy1 = new Audio("/music/Rolling in the Deep - Adele.mp3")
const cloudy2 = new Audio("/music/Fly Me to the Moon - Frank Sinatra.mp3")
const cloudy3 = new Audio("/music/Night Changes - 1D.mp3")
const rain1 = new Audio("/music/Perfect - Ed Sheeran.mp3")
const rain2 = new Audio("/music/Can't Help Falling in Love - Elvis Presley.mp3")
const rain3 = new Audio("/music/Right Here Waiting - Richard Marx.mp3")
const thunderstorm1 = new Audio("/music/Before You Go - Lewis Capaldi.mp3")
const thunderstorm2 = new Audio("/music/Train Wreck - James Arthur.mp3")
const thunderstorm3 = new Audio("/music/Lightning - Little Mix.mp3")
const snow1 = new Audio("/music/cardigan - Taylor Swift.mp3")
const snow2 = new Audio("/music/Mystery of Love - Sufjan Stevens.mp3")
const snow3 = new Audio("/music/Electric Feel - CRW.mp3")
const progress = document.getElementById("progress")
const title = document.getElementById('title')
const progressContainer = document.getElementById("progress-container")

import {Song} from "./modules/Song"

console.log(Song)
// const cover = document.getElementById("cover")

// song playlists
const sunny = [
    "Sunday Morning - Maroon 5", 
    "Watermelon Sugar - Harry Styles", 
    "Peaches - Justin Bieber"
]

const cloudy = [
    "Rolling in the Deep - Adele",
    "Fly Me to the Moon - Frank Sinatra", 
    "Night Changes - 1D"
]

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

// const songs = new Audio("/music/APLmusic.mp3");


// keep track of the songs
let songIndex = 0

// load song info into dom
loadSong(sunny[songIndex])

// updates details of the song
function loadSong(song){
    title.textContent = song
    audio.src = `music/${song}.mp3`
    cover.src = `images/${song}.jpeg` 
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
        songIndex = songs.length - 1
    }

    loadSong(songs[songIndex])
    playSong()
}

function nextSong() {
    songIndex++;

    if(songIndex > songs.length-1){
        songIndex = 0
    }

    loadSong(songs[songIndex])
    playSong()
}

function updateProgress(x){
    const {duration, currentTime} = x.srcElement
    const progressPercent = (currentTime/duration)*100
    progress.style.width = `${progressPercent}%`
    console.log('yoyoyo')
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