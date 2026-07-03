# DJS05: Show Detail Page with Routing and Navigation

## Project Overview

In this project, you will build a podcast show detail page as part of a larger podcast browsing app. When users select a show from the homepage or listing page, they should be taken to a dedicated page that displays all details about that show. The app will support dynamic routing so each show has its own unique URL.

You will implement data fetching based on the show ID in the URL, handle loading and error states gracefully, and ensure a smooth user experience by preserving search filters and pagination when users navigate back to the homepage. Additionally, you will build a season navigation system allowing users to expand or switch between seasons to browse episodes efficiently.

This project will demonstrate your ability to work with dynamic routes, manage state across pages, handle asynchronous data, and create a clean, maintainable React codebase.


![alt text](<Show Page Podcast.png>)


---

## Core Objectives

- Implement **dynamic routing** for unique show detail pages.
- Pass the correct show ID via route parameters and use it to **fetch specific show data**.
- Gracefully handle **loading, error, and empty states** during data fetching.
- Display comprehensive show details including title, image, description, genres, and last updated date.
- Preserve previous **filters and search state** when navigating back to the homepage.
- Create an intuitive **season navigation** UI to expand and switch between seasons without excessive scrolling.
- Display episode information clearly with numbering, titles, images, and shortened descriptions.
- Maintain **high code quality** with documentation (JSDoc) and consistent formatting.

---

### API Endpoints

Data can be called via a `fetch` request to the following three endpoints. Note that there is not always a one-to-one mapping between endpoints and actual data structures. Also note that **\*`<ID>`** indicates where the dynamic ID for the requested item should be placed. For example: `[https://podcast-api.netlify.app/genre/3](https://podcast-api.netlify.app/genre/3)`\*

| URL                                          |                                                                                        |
| -------------------------------------------- | -------------------------------------------------------------------------------------- |
| `https://podcast-api.netlify.app`            | Returns an array of PREVIEW                                                            |
| `https://podcast-api.netlify.app/genre/<ID>` | Returns a GENRE object                                                                 |
| `https://podcast-api.netlify.app/id/<ID>`    | Returns a SHOW object with several SEASON and EPISODE objects directly embedded within |

### Genre Titles

Since genre information is only exposed on `PREVIEW` by means of the specific `GENRE` id, it is recommended that you include the mapping between genre id values and title in your code itself:

| ID  | Title                    |
| --- | ------------------------ |
| 1   | Personal Growth          |
| 2   | Investigative Journalism |
| 3   | History                  |
| 4   | Comedy                   |
| 5   | Entertainment            |
| 6   | Business                 |
| 7   | Fiction                  |
| 8   | News                     |
| 9   | Kids and Family          |

## Deliverables

1. **Homepage / Listing Page**

   - List of shows with clickable links or buttons that navigate to each show's detail page.
   - Filters and search functionality that maintain state when navigating back from detail pages.

2. **Dynamic Show Detail Page**

   - A unique page for each show, accessible via a dynamic route.
   - Fetch and display show details including:
     - Title
     - Large podcast image
     - Description
     - Genre tags
     - Last updated date (formatted)
   - Display loading indicator while fetching data.
   - Display user-friendly error message if fetching fails.
   - Handle empty states gracefully (e.g., show not found).

3. **Season Navigation Component**

   - UI to expand/collapse seasons.
   - Show season title and episode count.
   - List episodes per season including:
     - Episode number
     - Episode title
     - Season image
     - Shortened episode description

4. **State Preservation**

   - Maintain applied filters and search terms when navigating back to the homepage from a show detail page.

5. **Code Quality**

   - Well-structured, modular React components.
   - JSDoc comments for all major functions and modules.
   - Consistent and readable formatting across all files.

6. **Responsive Design**

   - The UI adapts smoothly across different device sizes (mobile, tablet, desktop).

7. **README Documentation**
   - Brief project overview.
   - Instructions for running the project locally.
   - Description of main features and any known limitations.

---

## Implementation Summary

This project has been fully implemented with the following features:

### Project Structure
```
src/
├── App.jsx                 # Main app component with routing
├── main.jsx               # React entry point
├── components/
│   └── SeasonNav.jsx      # Season navigation component
├── pages/
│   ├── HomePage.jsx       # Homepage with show listing
│   └── ShowDetail.jsx     # Dynamic show detail page
├── styles/
│   └── main.css          # Global styles and responsive design
└── utils/
    ├── api.js            # API fetch functions
    ├── constants.js      # Genre mapping and constants
    └── helpers.js        # Utility functions for data manipulation
```

### Key Features Implemented

1. **Dynamic Routing**
   - Home page at `/`
   - Show detail pages at `/show/:showId`
   - Automatic redirect for invalid routes

2. **Homepage with Search & Filter**
   - Search by show title or description
   - Filter by genre
   - Filter state persisted in URL query parameters
   - Shows grid display with lazy loading

3. **Show Detail Page**
   - Fetches show data by ID from URL parameters
   - Displays comprehensive show information
   - Collapsible season/episode navigation
   - Back button preserves search and filter state

4. **Season Navigation**
   - Expand/collapse seasons
   - Display episode count per season
   - List episodes with images and descriptions
   - Episode numbering

5. **State Preservation**
   - Search terms and genre filters saved in URL
   - State restored when navigating back from detail page
   - No data loss when switching between pages

6. **Loading & Error Handling**
   - Loading spinners during data fetch
   - User-friendly error messages
   - Empty states with helpful messages

7. **Responsive Design**
   - Works on mobile (320px+), tablet, and desktop
   - CSS Grid for flexible layouts
   - Touch-friendly interactive elements

8. **Code Quality**
   - JSDoc comments on all components and functions
   - Clean modular structure
   - Semantic HTML with ARIA labels
   - Consistent formatting and naming conventions

---

## Getting Started

### Prerequisites
- Node.js 16+ and npm installed

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd YOLZIT318_pto2508_GroupA_Yolani-Zito_DJS05-2025
```

2. Install dependencies:
```bash
npm install
```

### Running Locally

**Development Server:**
```bash
npm run dev
```
The app will be available at `http://localhost:5173` (or another port if 5173 is in use).

**Build for Production:**
```bash
npm run build
```
Output will be in the `dist/` directory.

**Preview Production Build:**
```bash
npm run preview
```

---

## Main Features

### Homepage
- Displays all available podcasts in a responsive grid
- Search functionality to filter shows by title or description
- Genre filter dropdown to narrow results
- Clicking a show card navigates to the detail page
- Search and filter state preserved in URL

### Show Detail Page
- Displays full podcast information including:
  - Large cover image
  - Show title
  - Description
  - Genre tags
  - Last updated date (formatted)
- Expandable season navigation:
  - Shows season title and episode count
  - Click to expand/collapse episodes
  - Each episode displays:
    - Episode image
    - Episode number
    - Episode title
    - Shortened description (150 characters)
- Back button to return to homepage with state preserved

### State Management
- Uses React Router's `useSearchParams` to persist filters
- URL contains search query and genre filter
- Navigating back restores exact previous state
- No data lost when switching between pages

---

## API Integration

The app uses the Podcast API with three endpoints:

- `GET https://podcast-api.netlify.app` - Returns array of show previews
- `GET https://podcast-api.netlify.app/id/<ID>` - Returns full show data with seasons and episodes
- `GET https://podcast-api.netlify.app/genre/<ID>` - Returns genre information

---

## Browser Compatibility

- Chrome/Edge (latest 2 versions)
- Firefox (latest 2 versions)
- Safari (latest 2 versions)
- Mobile browsers (iOS Safari, Chrome Mobile)

---

## Known Limitations

- Genre filtering works on client-side only (API limitation)
- Episode descriptions limited to 150 characters for UI optimization
- Images may take time to load depending on internet speed
- Some older browsers may have limited CSS Grid support

---

## Technologies Used

- **React** 18.3.1 - UI framework
- **React Router DOM** 6.26.1 - Client-side routing
- **Vite** 5.4.2 - Build tool and dev server
- **CSS3** - Styling with responsive design

---

## Author

Yolani Zito (YOLZIT318)

---

## License

This project is part of the CodeSpace Academy curriculum.

