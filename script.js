const songsList = [
    {
        name: "Aitakatta (Ingin Bertemu)",
        artist: "JKT48",
        src: "assets/Aitakatta (Ingin Bertemu).mp3",
        cover: "assets/1.jpg"
    },
    {
        name: "Arah Sang Cinta Dan Balasannya",
        artist: "JKT48",
        src: "assets/Arah Sang Cinta Dan Balasannya - Koi No Keikou To Taisaku.mp3",
        cover: "assets/2.jpg"
    },
    {
        name: "Futari Nori No Jitensha",
        artist: "JKT48",
        src: "assets/Futari Nori No Jitensha (Bersepeda Berdua).mp3",
        cover: "assets/3.jpg"
    },
    {
        name: "Heart Gata Virus",
        artist: "JKT48",
        src: "assets/Heart Gata Virus (Virus Tipe Hati).mp3",
        cover: "assets/4.jpg"
    },
    {
        name: "Heavy Rotation",
        artist: "JKT48",
        src: "assets/Heavy Rotation.mp3",
        cover: "assets/5.jpg"
    },
    {
        name: "Hissatsu Teleport",
        artist: "JKT48",
        src: "assets/Hissatsu Teleport (Jurus Rahasia Teleport).mp3",
        cover: "assets/6.jpg"
    },
    {
        name: "Honest Man",
        artist: "JKT48",
        src: "assets/Honest Man.mp3",
        cover: "assets/7.jpg"
    },
    {
        name: "Ingatan Kosmos",
        artist: "JKT48",
        src: "assets/Ingatan Kosmos (Cosmos no Kioku).mp3",
        cover: "assets/8.jpg"
    },
    {
        name: "Jiwaru Days",
        artist: "JKT48",
        src: "assets/Jiwaru Days.mp3",
        cover: "assets/9.jpg"
    },
    {
        name: "Langit Biru Cinta Searah",
        artist: "JKT48",
        src: "assets/Langit Biru Cinta Searah.mp3",
        cover: "assets/10.jpg"
    },
    {
        name: "Magic Hour",
        artist: "JKT48",
        src: "assets/Magic Hour.mp3",
        cover: "assets/18.jpg"
    },
    {
        name: "Only Today",
        artist: "JKT48",
        src: "assets/Only Today.mp3",
        cover: "assets/12.jpg"
    },
    {
        name: "Ponytail dan Shu-Shu",
        artist: "JKT48",
        src: "assets/Ponytail dan Shu-Shu.mp3",
        cover: "assets/13.jpg"
    },
    {
        name: "Rapsodi",
        artist: "JKT48",
        src: "assets/Rapsodi.mp3",
        cover: "assets/14.jpg"
    },
    {
        name: "Sayonara Crawl",
        artist: "JKT48",
        src: "assets/Sayonara Crawl.mp3",
        cover: "assets/15.jpg"
    },
    {
        name: "Seventeen",
        artist: "JKT48",
        src: "assets/Seventeen.mp3",
        cover: "assets/16.jpg"
    },
    {
        name: "Shonichi (Hari Pertama)",
        artist: "JKT48",
        src: "assets/Shonichi (Hari Pertama).mp3",
        cover: "assets/17.jpg"
    }
];

const artistName = document.querySelector('.artist-name');
const musicName = document.querySelector('.song-name');
const fillBar = document.querySelector('.fill-bar');
const time = document.querySelector('.time');
const cover = document.getElementById('cover');
const playBtn = document.getElementById('play');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');
const prog = document.querySelector('.progress-bar');

let song = new Audio();
let currentSong = 0;
let playing = false;

document.addEventListener('DOMContentLoaded', () => {
    loadSong(currentSong);
    song.addEventListener('timeupdate', updateProgress);
    song.addEventListener('ended', nextSong);
    prevBtn.addEventListener('click', prevSong);
    nextBtn.addEventListener('click', nextSong);
    playBtn.addEventListener('click', togglePlayPause);
    prog.addEventListener('click', seek);
});

function loadSong(index) {
    const { name, artist, src, cover: thumb } = songsList[index];
    artistName.innerText = artist;
    musicName.innerText = name;
    song.src = src;
    cover.style.backgroundImage = `url(${thumb})`;
}

function updateProgress() {
    if (song.duration) {
        const pos = (song.currentTime / song.duration) * 100;
        fillBar.style.width = `${pos}%`;

        const duration = formatTime(song.duration);
        const currentTime = formatTime(song.currentTime);
        time.innerText = `${currentTime} - ${duration}`;
    }
}

function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
}

function togglePlayPause() {
    if (playing) {
        song.pause();
    } else {
        song.play();
    }
    playing = !playing;
    playBtn.classList.toggle('fa-pause', playing);
    playBtn.classList.toggle('fa-play', !playing);
    cover.classList.toggle('active', playing);
}

function nextSong() {
    currentSong = (currentSong + 1) % songsList.length;
    playMusic();
}

function prevSong() {
    currentSong = (currentSong - 1 + songsList.length) % songsList.length;
    playMusic();
}

function playMusic() {
    loadSong(currentSong);
    song.play();
    playing = true;
    playBtn.classList.add('fa-pause');
    playBtn.classList.remove('fa-play');
    cover.classList.add('active');
}

function seek(e) {
    const pos = (e.offsetX / prog.clientWidth) * song.duration;
    song.currentTime = pos;
}
