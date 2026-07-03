/**
 * @file HomePage.jsx
 * @description Main listing page displaying all podcast shows with search and filter
 */

import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { fetchAllShows } from '../utils/api';
import { filterShows, truncateText, getGenreTitles } from '../utils/helpers';
import { GENRE_MAP } from '../utils/constants';

/**
 * HomePage Component - Displays all shows with search and filtering capabilities
 * Preserves filter state in URL query parameters
 * @returns {JSX.Element} Rendered homepage with show listing
 */
const HomePage = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  const [shows, setShows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Get initial state from URL parameters
  const [searchTerm, setSearchTerm] = useState(
    searchParams.get('search') || ''
  );
  const [selectedGenre, setSelectedGenre] = useState(
    searchParams.get('genre') ? Number(searchParams.get('genre')) : null
  );

  /**
   * Fetches all shows on component mount
   */
  useEffect(() => {
    const loadShows = async () => {
      try {
        setLoading(true);
        const data = await fetchAllShows();
        setShows(data);
        setError(null);
      } catch (err) {
        setError('Failed to load shows. Please try again later.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadShows();
  }, []);

  /**
   * Updates URL parameters when search or filter changes
   * This preserves the state when user navigates back from detail page
   */
  useEffect(() => {
    const params = new URLSearchParams();
    if (searchTerm) params.set('search', searchTerm);
    if (selectedGenre) params.set('genre', selectedGenre);
    setSearchParams(params, { replace: true });
  }, [searchTerm, selectedGenre, setSearchParams]);

  /**
   * Handles search input change
   * @param {Event} e - Input change event
   */
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  /**
   * Handles genre filter change
   * @param {Event} e - Select change event
   */
  const handleGenreChange = (e) => {
    const value = e.target.value;
    setSelectedGenre(value ? Number(value) : null);
  };

  /**
   * Handles show card click - navigates to detail page
   * @param {string} showId - The ID of the clicked show
   */
  const handleShowClick = (showId) => {
    navigate(`/show/${showId}`);
  };

  /**
   * Gets filtered shows based on current search and filter
   */
  const filteredShows = filterShows(shows, searchTerm, selectedGenre);

  return (
    <div>
      <header>
        <div className="container">
          <h1>🎙️ Podcast Browser</h1>
          <p>Discover and explore your favorite podcasts</p>
        </div>
      </header>

      <main className="container" style={{ paddingTop: '2rem', paddingBottom: '2rem' }}>
        <div className="controls">
          <input
            type="text"
            placeholder="Search shows by title or description..."
            value={searchTerm}
            onChange={handleSearchChange}
            className="search-input"
            aria-label="Search shows"
          />
          <select
            value={selectedGenre || ''}
            onChange={handleGenreChange}
            className="filter-select"
            aria-label="Filter by genre"
          >
            <option value="">All Genres</option>
            {Object.entries(GENRE_MAP).map(([id, title]) => (
              <option key={id} value={id}>
                {title}
              </option>
            ))}
          </select>
        </div>

        {error && <div className="error">{error}</div>}

        {loading ? (
          <div className="loading">
            <span className="spinner"></span> Loading shows...
          </div>
        ) : filteredShows.length === 0 ? (
          <div className="empty-state">
            <h3>No shows found</h3>
            <p>Try adjusting your search or filter criteria</p>
          </div>
        ) : (
          <>
            <p style={{ marginBottom: '1rem', color: '#636e72' }}>
              Showing {filteredShows.length} of {shows.length} shows
            </p>
            <div className="shows-grid">
              {filteredShows.map((show) => (
                <div
                  key={show.id}
                  className="show-card"
                  onClick={() => handleShowClick(show.id)}
                  role="button"
                  tabIndex={0}
                  onKeyPress={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      handleShowClick(show.id);
                    }
                  }}
                >
                  {show.image && (
                    <img
                      src={show.image}
                      alt={show.title}
                      loading="lazy"
                    />
                  )}
                  <div className="show-card-content">
                    <div className="show-card-title">{show.title}</div>
                    <div className="show-card-description">
                      {truncateText(show.description, 80)}
                    </div>
                    <div className="show-card-genres">
                      {getGenreTitles(show.genres).slice(0, 2).map((genre, idx) => (
                        <span key={idx} className="genre-tag">
                          {genre}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </main>
    </div>
  );
};

export default HomePage;
