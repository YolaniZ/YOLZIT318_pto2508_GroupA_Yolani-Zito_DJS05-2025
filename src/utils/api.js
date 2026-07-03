/**
 * @file api.js
 * @description API utility functions for fetching podcast data
 */

import { API_BASE_URL } from './constants.js';

/**
 * Fetches all podcast previews from the API
 * @async
 * @returns {Promise<Array>} Array of podcast preview objects
 * @throws {Error} If the fetch request fails
 */
export const fetchAllShows = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}`);
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    return await response.json();
  } catch (error) {
    console.error('Error fetching all shows:', error);
    throw error;
  }
};

/**
 * Fetches detailed information about a specific show including seasons and episodes
 * @async
 * @param {string} showId - The ID of the show to fetch
 * @returns {Promise<Object>} Show object with embedded seasons and episodes
 * @throws {Error} If the fetch request fails
 */
export const fetchShowDetail = async (showId) => {
  try {
    const response = await fetch(`${API_BASE_URL}/id/${showId}`);
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    return await response.json();
  } catch (error) {
    console.error(`Error fetching show detail for ID ${showId}:`, error);
    throw error;
  }
};

/**
 * Fetches genre information for a specific genre ID
 * @async
 * @param {number} genreId - The ID of the genre to fetch
 * @returns {Promise<Object>} Genre object
 * @throws {Error} If the fetch request fails
 */
export const fetchGenre = async (genreId) => {
  try {
    const response = await fetch(`${API_BASE_URL}/genre/${genreId}`);
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    return await response.json();
  } catch (error) {
    console.error(`Error fetching genre ${genreId}:`, error);
    throw error;
  }
};
