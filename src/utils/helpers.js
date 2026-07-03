/**
 * @file helpers.js
 * @description Helper functions for data manipulation and formatting
 */

import { GENRE_MAP } from './constants.js';

/**
 * Formats a date string to a readable format
 * @param {string} dateString - ISO date string
 * @returns {string} Formatted date (e.g., "Jan 15, 2024")
 */
export const formatDate = (dateString) => {
  if (!dateString) return 'Unknown';
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
};

/**
 * Gets genre titles from an array of genre IDs
 * @param {Array<number>} genreIds - Array of genre ID numbers
 * @returns {Array<string>} Array of genre titles
 */
export const getGenreTitles = (genreIds) => {
  if (!Array.isArray(genreIds)) return [];
  return genreIds.map((id) => GENRE_MAP[id] || 'Unknown');
};

/**
 * Truncates text to a specified length with ellipsis
 * @param {string} text - The text to truncate
 * @param {number} maxLength - Maximum length of text
 * @returns {string} Truncated text with ellipsis if needed
 */
export const truncateText = (text, maxLength = 150) => {
  if (!text) return '';
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength).trim() + '...';
};

/**
 * Filters and searches shows based on search term and genre filter
 * @param {Array<Object>} shows - Array of show objects
 * @param {string} searchTerm - Search query term
 * @param {number|null} selectedGenre - Selected genre ID filter
 * @returns {Array<Object>} Filtered array of shows
 */
export const filterShows = (shows, searchTerm, selectedGenre) => {
  return shows.filter((show) => {
    const matchesSearch =
      !searchTerm ||
      show.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (show.description &&
        show.description.toLowerCase().includes(searchTerm.toLowerCase()));

    const matchesGenre =
      !selectedGenre ||
      (Array.isArray(show.genres) && show.genres.includes(selectedGenre));

    return matchesSearch && matchesGenre;
  });
};
