const img = document.querySelector('img');
const title = document.getElementById('title');
const artist = document.getElementById('artist');
const music = document.querySelector('audio');
const progressContainer = document.getElementById('progress-container');
const progress = document.getElementById('progress');
const currentTimeElement = document.getElementById('current-time');
const durationElement = document.getElementById('duration');
const prevBtn = document.getElementById('prev');
const playBtn = document.getElementById('play');
const nextBtn = document.getElementById('next');

const songs = [
  {
    name: 'jacinto-1',
    displayName: 'Electric Chill Machine',
    artist: 'Jacinto Design'
  },
  {
    name: 'jacinto-2',
    displayName: 'Seven Nation Army',
    artist: 'Jacinto Design'
  },
  {
    name: 'metric-1',
    displayName: 'Front Row',
    artist: 'Jacinto Design'
  }
];

let isPlaying = false;

const playSong = () => {
  isPlaying = true;

  playBtn.classList.replace('fa-play', 'fa-pause');
  playBtn.setAttribute('title', 'Pause');

  music.play();
};

const pauseSong = () => {
  isPlaying = false;

  playBtn.classList.replace('fa-pause', 'fa-play');
  playBtn.setAttribute('title', 'Play');

  music.pause();
};

const playerHandler = () => {
  isPlaying ? pauseSong() : playSong();
};

const loadSong = ({ displayName, artist, name }) => {
  title.textContent = displayName;
  artist.textContent = artist;
  music.src = `music/${name}.mp3`;
  img.src = `img/${name}.jpg`;
};

let idx = 0;

const prevHandler = () => {
  idx--;

  if (idx < 0) {
    idx = songs.length - 1;
  }

  loadSong(songs[idx]);
  playSong();
};
const nextHandler = () => {
  idx++;

  if (idx > songs.length - 1) {
    idx = 0;
  }

  loadSong(songs[idx]);
  playSong();
};

const calculateDuration = (duration) => {
  let durationMin = Math.floor(duration / 60);
  let durationSec = Math.floor(duration % 60);

  if (durationSec < 10) {
    durationSec = `0${durationSec}`;
  }

  return { durationMin, durationSec };
};

const durationHandler = (totalTime, currentTime) => {
  if (totalTime) {
    const { durationMin, durationSec } = calculateDuration(totalTime);
    durationElement.textContent = `${durationMin}:${durationSec}`;
  }

  if (currentTime > 0) {
    const { durationMin, durationSec } = calculateDuration(currentTime);
    currentTimeElement.textContent = `${durationMin}:${durationSec}`;
  }
};

const updateProgressBar = (e) => {
  if (isPlaying) {
    const { duration: totalTime, currentTime } = e.srcElement;
    const progressPercent = (currentTime / totalTime) * 100;

    progress.style.width = `${progressPercent}%`;

    durationHandler(totalTime, currentTime);
  }
};

const setProgressBar = (e) => {
  const { duration } = music;
  const listeningPoint = (e.offsetX / e.target.clientWidth) * duration;

  music.currentTime = listeningPoint;
};

// Event Listeners
playBtn.addEventListener('click', playerHandler);
prevBtn.addEventListener('click', prevHandler);
nextBtn.addEventListener('click', nextHandler);
music.addEventListener('ended', nextHandler);
music.addEventListener('timeupdate', updateProgressBar);
progressContainer.addEventListener('click', setProgressBar);

loadSong(songs[0]);
