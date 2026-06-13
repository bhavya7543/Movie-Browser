import './App.css';
import { useState, useEffect } from 'react';
import { Routes, Route, Navigate, useLocation, useNavigate } from 'react-router-dom';
import Login from './Login';
import Navbar from './Navbar';
import MovieCard from './MovieCard';
import Favourites from './Favourites';

function App() {
  const location = useLocation();
  const navigate = useNavigate();
  const showNavbar = location.pathname.toLowerCase() !== '/login';

  const [movies, setMovies] = useState([]);
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  const [isLoggedIn, setIsLoggedIn] = useState(
    () => localStorage.getItem('isLoggedIn') === 'true'
  );

  const [favorites, setFavorites] = useState(() => {
    try {
      const saved = localStorage.getItem('favorites');
      return saved ? new Set(JSON.parse(saved)) : new Set();
    } catch {
      return new Set();
    }
  });

  const getMovieId = (movie) => movie.id || movie.imdbID || movie.Title || '';

  const handleToggleFavorite = (movie) => {
    const id = getMovieId(movie);
    
    setFavorites((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      localStorage.setItem('favorites', JSON.stringify([...next]));
      return next;
    });
  };

  const handleLogin = (email) => {
    setIsLoggedIn(true);
    localStorage.setItem('isLoggedIn', 'true');
    localStorage.setItem('userEmail', email);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setFavorites(new Set());
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('userEmail');
    localStorage.removeItem('favorites');
  };

  const handleRedirectLogin = () => {
    navigate('/login');
  };

  useEffect(() => {
    setLoading(true);
    fetch('https://jsonfakery.com/movies/paginated?per_page=100')
      .then((res) => {
        if (!res.ok) throw new Error('Could not fetch the movie data');
        return res.json();
      })
      .then((data) => {
        const movieList = Array.isArray(data) ? data : data.data || [];
        
        const normalizedMovies = movieList.map((movie) => {
          const fallbackTitle = movie.Title || movie.title || movie.original_title || '';
          const fallbackId = movie.imdbID || movie.id || fallbackTitle;
         
          let fallbackYear = movie.Year || movie.year || '';
          if (!fallbackYear && movie.release_date) {
            fallbackYear = movie.release_date.slice(-4);
          }

          return {
            ...movie,
            id: fallbackId,
            Title: fallbackTitle,
            Year: fallbackYear,
          };
        });

        setMovies(normalizedMovies);
        setError('');
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  const filteredMovies = movies.filter((movie) => {
    const search = query.toLowerCase();
    const title = (movie.Title || '').toLowerCase();
    const runtime = (movie.Runtime || '').toLowerCase();
    
    return title.includes(search) || runtime.includes(search);
  });

  return (
    <div className="App">
      {showNavbar && (
        <Navbar
          query={query}
          onSearch={setQuery}
          isLoggedIn={isLoggedIn}
          onLogout={handleLogout}
        />
      )}

      <Routes>
        <Route
          path="/"
          element={
            <main className="movie-page">
              {loading && <p className="status-message">⏳ Loading movies...</p>}
              {error && <p className="status-message error">❌ {error}</p>}
              
              {!loading && !error && filteredMovies.length === 0 && (
                <p className="status-message">No movies found. Try a different search.</p>
              )}

              <section className="movies-grid">
                {!loading && !error && filteredMovies.map((movie, index) => {
                  const id = getMovieId(movie) || index;
                  return (
                    <MovieCard
                      key={id}
                      movie={movie}
                      isLoggedIn={isLoggedIn}
                      isFavorite={favorites.has(getMovieId(movie))}
                      onToggleFavorite={handleToggleFavorite}
                      onRedirectLogin={handleRedirectLogin}
                    />
                  );
                })}
              </section>
            </main>
          }
        />
        
        <Route
          path="/favourites"
          element={
            <Favourites
              movies={movies}
              favoriteIds={favorites}
              onToggleFavorite={handleToggleFavorite}
              isLoggedIn={isLoggedIn}
              onRedirectLogin={handleRedirectLogin}
            />
          }
        />
        
        <Route path="/login" element={<Login onLogin={handleLogin} />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  );
}

export default App;