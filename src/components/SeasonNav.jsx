/**
 * @file SeasonNav.jsx
 * @description Component for displaying and navigating seasons and their episodes
 */

import React, { useState } from 'react';
import { truncateText } from '../utils/helpers';

/**
 * SeasonNav Component - Displays seasons with collapsible episodes
 * @param {Object} props - Component props
 * @param {Array} props.seasons - Array of season objects containing episodes
 * @returns {JSX.Element} Rendered seasons and episodes
 */
const SeasonNav = ({ seasons }) => {
  const [expandedSeason, setExpandedSeason] = useState(0);

  /**
   * Toggles the expanded state of a season
   * @param {number} seasonIndex - Index of the season to toggle
   */
  const handleToggleSeason = (seasonIndex) => {
    setExpandedSeason(expandedSeason === seasonIndex ? -1 : seasonIndex);
  };

  if (!seasons || seasons.length === 0) {
    return <div className="empty-state">No seasons available</div>;
  }

  return (
    <div className="seasons-container">
      <h2>Seasons</h2>
      {seasons.map((season, seasonIndex) => (
        <div key={seasonIndex} className="season-item">
          <div
            className="season-header"
            onClick={() => handleToggleSeason(seasonIndex)}
          >
            <div>
              <div className="season-title">{season.title}</div>
              <div className="season-meta">
                {season.episodes?.length || 0} episodes
              </div>
            </div>
            <span
              className={`toggle-icon ${
                expandedSeason === seasonIndex ? 'open' : ''
              }`}
            >
              ▼
            </span>
          </div>

          {expandedSeason === seasonIndex && season.episodes && (
            <div className="episodes-list">
              {season.episodes.map((episode, episodeIndex) => (
                <div key={episodeIndex} className="episode-item">
                  {episode.image && (
                    <img
                      src={episode.image}
                      alt={episode.title}
                      className="episode-image"
                    />
                  )}
                  <div className="episode-content">
                    <div className="episode-number">
                      Episode {episodeIndex + 1}
                    </div>
                    <div className="episode-title">{episode.title}</div>
                    <div className="episode-description">
                      {truncateText(episode.description, 150)}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default SeasonNav;
