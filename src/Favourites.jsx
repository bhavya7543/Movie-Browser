import { Link } from 'react-router-dom';
import MovieCard from './MovieCard';

function Favourites({ movies, favoriteIds, onToggleFavorite, isLoggedIn, onRedirectLogin }) {
  const favoriteMovies = movies.filter((movie) => favoriteIds.has(movie.id));

  return (
    <main className="movie-page">
      <header className="watchlist-header">
        <div>
          <h2>Favourites Movies </h2>
        </div>
        <Link to="/" className="back-link">
          Browse movies
        </Link>
      </header>

      <section>
        {favoriteMovies.length === 0 ? (
          <p className="empty-state">No favourites yet. Tap the Fav on any movie to save it.</p>
        ) : (
          <div className="movies-grid">
            {favoriteMovies.map((movie) => (
              <MovieCard
                key={movie.id}
                movie={movie}
                isLoggedIn={isLoggedIn}
                isFavorite={true}
                onRedirectLogin={onRedirectLogin}
                onToggleFavorite={onToggleFavorite}
              />
            ))}
          </div>
        )}
      </section>
    </main>
  );
}

export default Favourites;
