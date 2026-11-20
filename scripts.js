// Index and Search
// ==========================================
// 1. SHARED AUDIO & PLAYER BAR LOGIC
// ==========================================
const audioPlayer = document.getElementById('audio-player');
const playerCover = document.getElementById('player-cover');
const playerTitle = document.getElementById('player-title');
const playerArtist = document.getElementById('player-artist');
const playPauseBtn = document.getElementById('play-pause-btn');

let isPlaying = false;

function loadAndPlayTrack(track) {
    if (!track || !audioPlayer) return;

    audioPlayer.src = track.src;

    // Update bottom player bar UI if it exists on the current page
    if (playerCover) playerCover.src = track.cover;
    if (playerTitle) playerTitle.textContent = track.title;
    if (playerArtist) playerArtist.textContent = track.artist;

    audioPlayer.play();
    isPlaying = true;
    updatePlayButtonUI();
}

function togglePlayPause() {
    if (!audioPlayer) return;

    if (!audioPlayer.src) {
        loadAndPlayTrack(tracks[0]);
        return;
    }

    if (isPlaying) {
        audioPlayer.pause();
        isPlaying = false;
    } else {
        audioPlayer.play();
        isPlaying = true;
    }
    updatePlayButtonUI();
}

function updatePlayButtonUI() {
    if (!playPauseBtn) return;
    playPauseBtn.innerHTML = isPlaying
        ? '<i class="fa-solid fa-pause"></i>'
        : '<i class="fa-solid fa-play"></i>';
}

if (playPauseBtn) {
    playPauseBtn.addEventListener('click', togglePlayPause);
}

// Helper to build a track card (used by both Home and Search pages)
function createTrackCard(track) {
    const trackElement = document.createElement('div');
    trackElement.classList.add('track-item');
    trackElement.innerHTML = `
        <img src="${track.cover}" alt="${track.title}" width="50">
        <div class="track-details">
            <h4>${track.title}</h4>
            <p>${track.artist} • ${track.album}</p>
        </div>
        <button class="play-track-btn" aria-label="Play ${track.title}">
            <i class="fa-solid fa-play"></i>
        </button>
    `;

    trackElement.addEventListener('click', () => loadAndPlayTrack(track));
    return trackElement;
}

// ==========================================
// 2. HOME PAGE LOGIC (index.html)
// ==========================================
const homeTrackList = document.getElementById('track-list');

if (homeTrackList) {
    tracks.forEach(track => {
        homeTrackList.appendChild(createTrackCard(track));
    });
}

// ==========================================
// 3. SEARCH PAGE LOGIC (search.html)
// ==========================================
const searchResultsContainer = document.getElementById('search-results');
const searchForm = document.querySelector('.search-form');
const searchInput = document.querySelector('.search-input');

if (searchResultsContainer && searchInput) {
    function renderSearchResults(results) {
        searchResultsContainer.innerHTML = '';

        if (results.length === 0) {
            searchResultsContainer.innerHTML = '<p class="no-results">No songs, artists, or albums found.</p>';
            return;
        }

        results.forEach(track => {
            searchResultsContainer.appendChild(createTrackCard(track));
        });
    }

    function filterTracks(query) {
        const cleanQuery = query.trim().toLowerCase();
        const filtered = tracks.filter(track =>
            track.title.toLowerCase().includes(cleanQuery) ||
            track.artist.toLowerCase().includes(cleanQuery) ||
            track.album.toLowerCase().includes(cleanQuery)
        );
        renderSearchResults(filtered);
    }

    if (searchForm) {
        searchForm.addEventListener('submit', (e) => {
            e.preventDefault();
            filterTracks(searchInput.value);
        });
    }

    searchInput.addEventListener('input', () => {
        filterTracks(searchInput.value);
    });

    // Check if redirected from index.html with ?q=query
    const urlParams = new URLSearchParams(window.location.search);
    const initialQuery = urlParams.get('q');

    if (initialQuery) {
        searchInput.value = initialQuery;
        filterTracks(initialQuery);
    } else {
        renderSearchResults(tracks);
    }
}