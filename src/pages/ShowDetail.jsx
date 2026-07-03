/**
 * @file ShowDetail.jsx
 * @description Detail page for a specific podcast show with seasons and episodes
 */

import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchShowDetail } from '../utils/api';
import { formatDate, getGenreTitles } from '../utils/helpers';
import SeasonNav from '../components/SeasonNav';

/**
 * ShowDetail Component - Displays comprehensive information about a specific show
 * Fetches data based on show ID from URL parameters
 * @returns {JSX.Element} Rendered show detail page
 */
const ShowDetail = () => {
  const { showId } = useParams();
  const navigate = useNavigate();

  const [show, setShow] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  /**
   * Fetches show detail data based on showId parameter
   */
  useEffect(() => {
    const loadShowDetail = async () => {
      if (!showId) {
        setError('Invalid show ID');
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError(null);
        const data = await fetchShowDetail(showId);
        setShow(data);
      } catch (err) {
        setError(
          'Failed to load show details. Please check the URL and try again.'
        );
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadShowDetail();
  }, [showId]);

  /**
   * Handles navigation back to homepage
   * Preserves previous search and filter state stored in URL
   */
  const handleBackClick = () => {
    navigate(-1);
  };

  if (loading) {
    return (
      <div>
        <header>
          <div className="container">
            <h1>🎙️ Podcast Browser</h1>
          </div>
        </header>
        <main className="container" style={{ paddingTop: '2rem' }}>
          <div className="loading">
            <span className="spinner"></span> Loading show details...
          </div>
        </main>
      </div>
    );
  }

  if (error || !show) {
    return (
      <div>
        <header>
          <div className="container">
            <h1>🎙️ Podcast Browser</h1>
          </div>
        </header>
        <main className="container" style={{ paddingTop: '2rem' }}>
          <button
            onClick={handleBackClick}
            className="nav-button"
            aria-label="Go back to previous page"
          >
            ← Back
          </button>
          <div className="error">{error || 'Show not found'}</div>
        </main>
      </div>
    );
  }

  return (
    <div>
      <header>
        <div className="container">
          <h1>🎙️ Podcast Browser</h1>
        </div>
      </header>

      <main className="container" style={{ paddingTop: '2rem', paddingBottom: '2rem' }}>
        <button
          onClick={handleBackClick}
          className="nav-button"
          aria-label="Go back to previous page"
        >
          ← Back
        </button>

        <div className="show-detail">
          <div className="detail-header">
            {show.image && (
              <img
                src={show.image}
                alt={show.title}
                className="detail-image"
              />
            )}

            <div className="detail-info">
              <h1>{show.title}</h1>

              <div className="detail-meta">
                <div className="meta-item">
                  <strong>Updated:</strong> {formatDate(show.updated)}
                </div>
                {show.seasons && show.seasons.length > 0 && (
                  <div className="meta-item">
                    <strong>Seasons:</strong> {show.seasons.length}
                  </div>
                )}
              </div>

              {show.genres && show.genres.length > 0 && (
                <div style={{ marginBottom: '1.5rem' }}>
                  <div style={{ marginBottom: '0.5rem' }}>
                    <strong>Genres:</strong>
                  </div>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                    {getGenreTitles(show.genres).map((genre, idx) => (
                      <span key={idx} className="genre-tag">
                        {genre}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {show.description && (
                <div className="detail-description">
                  <strong>About:</strong>
                  <p style={{ marginTop: '0.5rem' }}>{show.description}</p>
                </div>
              )}
            </div>
          </div>

          {show.seasons && show.seasons.length > 0 && (
            <SeasonNav seasons={show.seasons} />
          )}
        </div>
      </main>
    </div>
  );
};

export default ShowDetail;
