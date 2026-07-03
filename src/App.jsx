/**
 * @file App.jsx
 * @description Main application component with routing configuration
 */

import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import HomePage from './pages/HomePage';
import ShowDetail from './pages/ShowDetail';
import './styles/main.css';

/**
 * App Component - Main application container with routing
 * Sets up routes for homepage and dynamic show detail pages
 * @returns {JSX.Element} Application with routing
 */
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/show/:showId" element={<ShowDetail />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
