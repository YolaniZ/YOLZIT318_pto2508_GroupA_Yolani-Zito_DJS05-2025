/**
 * @file constants.js
 * @description Genre mapping and API constants for the podcast app
 */

/**
 * Mapping of genre IDs to genre titles
 * @type {Object<number, string>}
 */
export const GENRE_MAP = {
  1: 'Personal Growth',
  2: 'Investigative Journalism',
  3: 'History',
  4: 'Comedy',
  5: 'Entertainment',
  6: 'Business',
  7: 'Fiction',
  8: 'News',
  9: 'Kids and Family',
};

/**
 * Base API URL for podcast data
 * @type {string}
 */
export const API_BASE_URL = 'https://podcast-api.netlify.app';
