import { useState } from 'react';

function MovieCard({ movie, isLoggedIn, isFavorite, onToggleFavorite, onRedirectLogin }) {
  const posterUrl =
    movie.Poster && movie.Poster && movie.vote_average !== 'N/A'
      ? movie.Poster
      : movie.poster_path || movie.poster || movie.vote_average || 'https://via.placeholder.com/300x450?text=No+Image';

  const handleToggle = () => {
    if (!isLoggedIn) {
      onRedirectLogin();
      return;
    }
    onToggleFavorite(movie);
  };

  return (
    <div className="movie-card">
      <div className="movie-poster-container">
        <img
          src={posterUrl}
          alt={movie.Title || 'Movie poster'}
          className="movie-poster"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = 'https://via.placeholder.com/300x450?text=No+Image';
          }}
        />
        <button
          type="button"
          className={`favorite-button ${isFavorite ? 'favorite-button--active' : ''}`}
          onClick={handleToggle}
          aria-pressed={isFavorite}
          title={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
        >
          {isFavorite ? '♥' : '♡'}
        </button>
      </div>

      <div className="movie-info">
        <h3>{movie.Title} </h3>
        <p className="movie-year">📅 {movie.Year} ⭐{movie.vote_average}</p>
      </div>
    </div>
  );
}

export default MovieCard;