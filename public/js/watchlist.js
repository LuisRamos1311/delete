// Update watchlist.js to work with user authentication
function getWatchlist() {
    const user = JSON.parse(localStorage.getItem('user'));
    if (!user) return [];
    
    const key = `watchlist_${user.id}`;
    return JSON.parse(localStorage.getItem(key) || '[]');
}

function getWatchedMovies() {
    const user = JSON.parse(localStorage.getItem('user'));
    if (!user) return [];
    
    const key = `watched_${user.id}`;
    return JSON.parse(localStorage.getItem(key) || '[]');
}

function addToWatchlist(movieId) {
    const user = JSON.parse(localStorage.getItem('user'));
    if (!user) {
        document.getElementById('loginBtn').click();
        return;
    }
    
    const key = `watchlist_${user.id}`;
    const watchlist = getWatchlist();
    
    if (!watchlist.includes(movieId)) {
        watchlist.push(movieId);
        localStorage.setItem(key, JSON.stringify(watchlist));
        updateWatchButton(movieId);
    }
}

function removeFromWatchlist(movieId) {
    const user = JSON.parse(localStorage.getItem('user'));
    if (!user) return;
    
    const key = `watchlist_${user.id}`;
    let watchlist = getWatchlist();
    
    watchlist = watchlist.filter(id => id !== movieId);
    localStorage.setItem(key, JSON.stringify(watchlist));
    updateWatchButton(movieId);
}

function markAsWatched(movieId) {
    const user = JSON.parse(localStorage.getItem('user'));
    if (!user) {
        document.getElementById('loginBtn').click();
        return;
    }
    
    const key = `watched_${user.id}`;
    const watched = getWatchedMovies();
    
    if (!watched.includes(movieId)) {
        watched.push(movieId);
        localStorage.setItem(key, JSON.stringify(watched));
        removeFromWatchlist(movieId);
        updateWatchedButton(movieId);
        updateRecommendations();
    }
}

function unmarkAsWatched(movieId) {
    const user = JSON.parse(localStorage.getItem('user'));
    if (!user) return;
    
    const key = `watched_${user.id}`;
    let watched = getWatchedMovies();
    
    watched = watched.filter(id => id !== movieId);
    localStorage.setItem(key, JSON.stringify(watched));
    updateWatchedButton(movieId);
    updateRecommendations();
}

// Update UI functions
function updateWatchButton(movieId) {
    const watchBtn = document.querySelector(`[data-watch-btn="${movieId}"]`);
    if (watchBtn) {
        const isInWatchlist = getWatchlist().includes(movieId);
        watchBtn.textContent = isInWatchlist ? 'Remove from Watchlist' : 'Add to Watchlist';
        watchBtn.classList.toggle('btn-remove', isInWatchlist);
    }
}

function updateWatchedButton(movieId) {
    const watchedBtn = document.querySelector(`[data-watched-btn="${movieId}"]`);
    if (watchedBtn) {
        const isWatched = getWatchedMovies().includes(movieId);
        watchedBtn.textContent = isWatched ? 'Unmark as Watched' : 'Mark as Watched';
        watchedBtn.classList.toggle('btn-watched', isWatched);
    }
}

// Initialize buttons on page load
document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('[data-watch-btn]').forEach(btn => {
        const movieId = btn.dataset.watchBtn;
        updateWatchButton(movieId);
        btn.addEventListener('click', () => {
            if (getWatchlist().includes(movieId)) {
                removeFromWatchlist(movieId);
            } else {
                addToWatchlist(movieId);
            }
        });
    });

    document.querySelectorAll('[data-watched-btn]').forEach(btn => {
        const movieId = btn.dataset.watchedBtn;
        updateWatchedButton(movieId);
        btn.addEventListener('click', () => {
            if (getWatchedMovies().includes(movieId)) {
                unmarkAsWatched(movieId);
            } else {
                markAsWatched(movieId);
            }
        });
    });
});