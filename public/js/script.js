const musicContainer = document.getElementById("music-container")
const playBtn = document.getElementById("play")
const prevBtn = document.getElementById("prev")
const nextBtn = document.getElementById("next")
// const audio = document.getElementById("audio")
const audio = new Audio("/music/APLmusic.mp3")
const progress = document.getElementById("progress")
const title = document.getElementById('title')
const progressContainer = document.getElementById("progress-container")

const cover = document.getElementById("cover")

// song titles
const songs = ["APLmusic"]
// const songs = new Audio("/music/APLmusic.mp3");


// keep track of the songs
let songIndex = 0

// load song info into dom
loadSong(songs[songIndex])

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