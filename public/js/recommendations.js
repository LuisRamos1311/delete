// Movie recommendations system
const movieDatabase = {
    genres: {
        'action': ['inception', 'dark-knight', 'matrix', 'gladiator', 'mad-max', 'john-wick'],
        'drama': ['shawshank', 'godfather', 'green-mile', 'fight-club', 'pianist'],
        'comedy': ['hangover', 'superbad', 'bridesmaids', 'mean-girls', 'big-lebowski']
    },
    directors: {
        'Christopher Nolan': ['inception', 'dark-knight'],
        'Frank Darabont': ['shawshank', 'green-mile'],
        'Ridley Scott': ['gladiator'],
        'George Miller': ['mad-max'],
        'Chad Stahelski': ['john-wick']
    }
};

function getRecommendations() {
    const watched = JSON.parse(Cookies.get('movieflix_watched') || '[]');
    if (watched.length === 0) return [];

    // Count genres and directors from watched movies
    const genreCounts = {};
    const directorCounts = {};

    watched.forEach(movieId => {
        // Count genres
        Object.entries(movieDatabase.genres).forEach(([genre, movies]) => {
            if (movies.includes(movieId)) {
                genreCounts[genre] = (genreCounts[genre] || 0) + 1;
            }
        });

        // Count directors
        Object.entries(movieDatabase.directors).forEach(([director, movies]) => {
            if (movies.includes(movieId)) {
                directorCounts[director] = (directorCounts[director] || 0) + 1;
            }
        });
    });

    // Get favorite genres and directors
    const favoriteGenres = Object.entries(genreCounts)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 2)
        .map(([genre]) => genre);

    const favoriteDirectors = Object.entries(directorCounts)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 2)
        .map(([director]) => director);

    // Get recommendations based on favorites
    const recommendations = new Set();

    // Add movies from favorite genres
    favoriteGenres.forEach(genre => {
        movieDatabase.genres[genre].forEach(movie => {
            if (!watched.includes(movie)) {
                recommendations.add(movie);
            }
        });
    });

    // Add movies from favorite directors
    favoriteDirectors.forEach(director => {
        movieDatabase.directors[director].forEach(movie => {
            if (!watched.includes(movie)) {
                recommendations.add(movie);
            }
        });
    });

    return Array.from(recommendations).slice(0, 6); // Return top 6 recommendations
}

// Update recommendations section if it exists
function updateRecommendations() {
    const recommendationsSection = document.querySelector('.recommendations .movie-grid');
    if (recommendationsSection) {
        const recommendations = getRecommendations();
        if (recommendations.length > 0) {
            // Show recommendations section
            document.querySelector('.recommendations').style.display = 'block';
            // Add recommended movies
            recommendationsSection.innerHTML = recommendations
                .map(movieId => `
                    <article class="movie-card">
                        <img src="/images/${movieId}.jpg" alt="${movieId}">
                        <div class="movie-info">
                            <h3>${movieId.charAt(0).toUpperCase() + movieId.slice(1).replace('-', ' ')}</h3>
                            <a href="/movies/${movieId}.html" class="btn">Learn More</a>
                        </div>
                    </article>
                `).join('');
        } else {
            document.querySelector('.recommendations').style.display = 'none';
        }
    }
}

// Update recommendations when watched movies change
document.addEventListener('DOMContentLoaded', () => {
    updateRecommendations();
});