# DJS05: Show Detail Page with Routing and Navigation

## Project Overview
This project is a React podcast browser that implements a dynamic show detail page with routing, state preservation, and season-based episode browsing.

Users can:
- Browse a list of podcast shows
- Search and filter shows by genre
- Open a dedicated detail page for each show via route parameters
- Expand seasons and browse episodes
- Return to the homepage without losing search/filter state

![Show Detail Mockup](Show Page Podcast.png)

---

## Features Implemented

### 1. Homepage / Listing Page
- Show cards with image, title, short description, and genre tags
- Search input (title and description)
- Genre dropdown filter
- Clickable cards that route to each show detail page

### 2. Dynamic Show Detail Page
- Dynamic route: `/show/:showId`
- Fetches show details from API using URL parameter
- Displays:
  - Show title
  - Show image
  - Description
  - Genre tags
  - Last updated date (formatted)
- Handles:
  - Loading state
  - Error state
  - Empty/not found state

### 3. Season Navigation Component
- Expand/collapse season panels
- Season title and episode count
- Episode list with:
  - Episode number
  - Episode title
  - Episode image
  - Shortened episode description

### 4. State Preservation
- Search term and genre filter are persisted in URL query params
- Navigating back from show detail restores previous list state

### 5. Code Quality
- Modular structure with pages, components, and utility modules
- JSDoc included for major functions/components/modules
- Consistent formatting and naming

### 6. Responsive Design
- Responsive layout for mobile, tablet, and desktop
- Flexible card and detail layouts
- Touch-friendly spacing on smaller screens

---

## Tech Stack
- React 18
- React Router DOM 6
- Vite 5
- CSS

---

## API Endpoints
Base URL: `https://podcast-api.netlify.app`

- `GET /` returns show previews
- `GET /id/<ID>` returns full show details including seasons and episodes
- `GET /genre/<ID>` returns genre object

Genre map used in-app:
- 1: Personal Growth
- 2: Investigative Journalism
- 3: History
- 4: Comedy
- 5: Entertainment
- 6: Business
- 7: Fiction
- 8: News
- 9: Kids and Family

---

## Project Structure
```text
src/
  App.jsx
  main.jsx
  components/
    SeasonNav.jsx
  pages/
    HomePage.jsx
    ShowDetail.jsx
  styles/
    main.css
  utils/
    api.js
    constants.js
    helpers.js
index.html
vite.config.js
```

---

## Getting Started

### Prerequisites
- Node.js 16+
- npm

### Install
```bash
npm install
```

### Run Development Server
```bash
npm run dev
```

### Build for Production
```bash
npm run build
```

### Preview Production Build
```bash
npm run preview
```

---

## Known Limitations
- Genre filtering is client-side
- Episode descriptions are truncated for readability
- API/image load speed depends on network connection

---

## Author
Yolani Zito (YOLZIT318)

## License
This project is part of the CodeSpace Academy curriculum.
