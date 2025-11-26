function checkPassword() {
  const input = document.getElementById('passwordInput').value.toLowerCase();

  if (input === 'babe') {
    // Show GIF overlay card
    const gifCard = document.getElementById('successGifCard');
    gifCard.classList.add('show');

    // Add event listener to the "Start Exploring" button
    const startBtn = document.getElementById('startExploringBtn');
    startBtn.addEventListener('click', () => {
      gifCard.classList.remove('show');
      document.getElementById('passwordPage').style.display = 'none';
      document.getElementById('home').style.display = 'block';
    }, { once: true }); // ensures click runs only once

  } else {
    showPopupError();
  }
}

function showPopupError() {
  const popup = document.getElementById('popupError');
  popup.style.display = 'block';

  setTimeout(() => {
    popup.style.opacity = "1";
  }, 10);

  setTimeout(() => {
    popup.style.opacity = "0";
  }, 2500);

  setTimeout(() => {
    popup.style.display = 'none';
  }, 3000);
}


function openTab(tabId) {
  document.querySelectorAll('.tab-content').forEach(tab => tab.style.display = 'none');
  document.getElementById(tabId).style.display = 'block';

  if (tabId === 'tab2') {
    const audioElements = document.querySelectorAll('#tab2 audio');
    audioElements.forEach(audio => {
      audio.load();
      audio.onplay = () => {
        audioElements.forEach(otherAudio => {
          if (otherAudio !== audio) {
            otherAudio.pause();
          }
        });
      };
    });
  }
}

function showLetter() {
  document.getElementById('letter').style.display = 'block';
}

function audioError(audioElem) {
  alert('Failed to load audio file: ' + audioElem.src);
  console.error('Audio load error for:', audioElem.src);
}

const playlist = [
  { name: 'Always - Daniel Caesar', file: 'musics/always.mp3' },
  { name: 'As It Was - PREP', file: 'musics/as-it-was.mp3' },
  { name: 'Aura - IV OF SPADES', file: 'musics/aura.mp3' },
  { name: 'Begin Again - Taylor Swift', file: 'musics/begin again.mp3' },
  { name: 'Best Part (feat. H.E.R.) - Daniel Caesar', file: 'musics/best part.mp3' },
  { name: 'Buzz - NIKI', file: 'musics/buzz.mp3' },
  { name: 'Captivated - IV OF SPADES', file: 'musics/captivated.mp3' },
  { name: 'Dad Jeans - Paolo Sandejas', file: 'musics/dad jeans.mp3' },
  { name: 'Every Summertime - NIKI', file: 'musics/every summertime.mp3' },
  { name: 'I Will - Remsatered 2009 - The Beatles', file: 'musics/i will.mp3' },
  { name: 'Ligaw Tingin - Zildjian Parma', file: 'musics/ligaw tingin.mp3' },
  { name: 'Love is - The Ridleys', file: 'musics/love is.mp3' },
  { name: 'Luna  - SunKissed Lola', file: 'musics/luna.mp3' },
  { name: 'Make it with you - Bread', file: 'musics/make it with u.mp3' },
  { name: 'Never Knew Love Like This Before - Paolo Sandejas', file: 'musics/never knew love like this before.mp3' },
  { name: 'No. 1 Party Anthem - Artic Monkeys', file: 'musics/no.1.mp3' },
  { name: 'Suliranin- IV OF SPADES', file: 'musics/suliranin.mp3' },
  { name: 'Sunsets With You - Cliff, Yden', file: 'musics/sunsets with you.mp3' },
  { name: 'THE SHADE- Rex Orange Country', file: 'musics/the shade.mp3' }
];

const audio = document.getElementById('audio');
const playlistElement = document.getElementById('playlist');
const currentSongElement = document.getElementById('current-song');
const playPauseBtn = document.getElementById('playPauseBtn');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const forwardBtn = document.getElementById('forwardBtn');
const backwardBtn = document.getElementById('backwardBtn');
const progress = document.getElementById('progress');
const progressContainer = document.getElementById('progress-container');
const currentTimeElem = document.getElementById('current-time');
const durationElem = document.getElementById('duration');

let currentIndex = 0;
let isPlaying = false;

function loadPlaylist() {
  playlistElement.innerHTML = '';
  playlist.forEach((song, index) => {
    const li = document.createElement('li');
    li.textContent = song.name;
    li.addEventListener('click', () => {
      currentIndex = index;
      loadSong(song);
      playSong();
      updateActiveItem();
    });
    playlistElement.appendChild(li);
  });
}

function loadSong(song) {
  audio.src = song.file;
  currentSongElement.textContent = `Playing: ${song.name}`;
}

function playSong() {
  audio.play();
  isPlaying = true;
  playPauseBtn.innerHTML = '&#10073;&#10073;';
}

function pauseSong() {
  audio.pause();
  isPlaying = false;
  playPauseBtn.innerHTML = '&#9658;';
}

function togglePlayPause() {
  isPlaying ? pauseSong() : playSong();
}

function playPrev() {
  currentIndex = (currentIndex - 1 + playlist.length) % playlist.length;
  loadSong(playlist[currentIndex]);
  playSong();
  updateActiveItem();
}

function playNext() {
  currentIndex = (currentIndex + 1) % playlist.length;
  loadSong(playlist[currentIndex]);
  playSong();
  updateActiveItem();
}

function forward10() {
  audio.currentTime = Math.min(audio.currentTime + 10, audio.duration);
}

function rewind10() {
  audio.currentTime = Math.max(audio.currentTime - 10, 0);
}

function updateProgress() {
  if(audio.duration) {
    const progressPercent = (audio.currentTime / audio.duration) * 100;
    progress.style.width = `${progressPercent}%`;
    currentTimeElem.textContent = formatTime(audio.currentTime);
    durationElem.textContent = formatTime(audio.duration);
  }
}

function setProgress(e) {
  const width = this.clientWidth;
  const clickX = e.offsetX;
  const duration = audio.duration;
  audio.currentTime = (clickX / width) * duration;
}

function formatTime(seconds) {
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs < 10 ? '0' + secs : secs}`;
}

function updateActiveItem() {
  const items = playlistElement.querySelectorAll('li');
  items.forEach((item, index) => {
    item.classList.toggle('active', index === currentIndex);
  });
}

function init() {
  loadPlaylist();
  loadSong(playlist[currentIndex]);
  updateActiveItem();

  playPauseBtn.addEventListener('click', togglePlayPause);
  prevBtn.addEventListener('click', playPrev);
  nextBtn.addEventListener('click', playNext);
  forwardBtn.addEventListener('click', forward10);
  backwardBtn.addEventListener('click', rewind10);
  audio.addEventListener('timeupdate', updateProgress);
  progressContainer.addEventListener('click', setProgress);
  audio.addEventListener('ended', playNext);
}

document.addEventListener('DOMContentLoaded', init);


// Simple carousel auto-slide for all carousels
function initCarousels() {
  const carousels = document.querySelectorAll('.carousel');

  carousels.forEach(carousel => {
    const track = carousel.querySelector('.carousel-track');
    const slides = track.querySelectorAll('img');
    let index = 0;

    setInterval(() => {
      index = (index + 1) % slides.length;
      track.style.transform = `translateX(-${index * 100}%)`;
    }, 3000); // slides every 3 seconds
  });
}

document.addEventListener('DOMContentLoaded', initCarousels);


// Show Love Note overlay
function showLetter() {
  const overlay = document.getElementById('loveNoteOverlay');
  overlay.classList.add('show');
}

// Close Love Note overlay
document.getElementById('closeLoveNoteBtn').addEventListener('click', () => {
  const overlay = document.getElementById('loveNoteOverlay');
  overlay.classList.remove('show');
});


// Gallery overlay functionality
const galleryItems = document.querySelectorAll('.gallery-item');
const galleryOverlay = document.getElementById('galleryOverlay');
const galleryCaption = document.getElementById('galleryCaption');
const closeGalleryBtn = document.getElementById('closeGalleryBtn');

galleryItems.forEach(item => {
  item.addEventListener('click', () => {
    const caption = item.getAttribute('data-caption');
    galleryCaption.textContent = caption;
    galleryOverlay.classList.add('show');
  });
});

// Close overlay
closeGalleryBtn.addEventListener('click', () => {
  galleryOverlay.classList.remove('show');
});

// Optional: close overlay when clicking outside the content
galleryOverlay.addEventListener('click', (e) => {
  if (e.target === galleryOverlay) {
    galleryOverlay.classList.remove('show');
  }
});


function openTab(tabId) {
  const tabs = document.querySelectorAll('.tab-content');

  tabs.forEach(tab => {
    if (tab.id === tabId) {
      tab.style.display = 'block';  // show immediately
      setTimeout(() => {
        tab.classList.add('show');  // fade in
      }, 10); // slight delay to allow transition
    } else {
      tab.classList.remove('show'); // fade out
      setTimeout(() => {
        tab.style.display = 'none'; // hide after transition
      }, 400); // match CSS transition duration
    }
  });

  // Optional: audio handling for tab2
  if (tabId === 'tab2') {
    const audioElements = document.querySelectorAll('#tab2 audio');
    audioElements.forEach(audio => {
      audio.load();
      audio.onplay = () => {
        audioElements.forEach(otherAudio => {
          if (otherAudio !== audio) otherAudio.pause();
        });
      };
    });
  }
}
