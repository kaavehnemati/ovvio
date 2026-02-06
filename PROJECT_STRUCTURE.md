# Ovvio Project Structure

## Project Overview

Ovvio is a React-based single-page application built with Vite. It's a content presentation platform featuring an introductory experience followed by a category browsing system with detailed category views.

## Tech Stack

### Core Technologies
- **React** v19.2.0 - UI library
- **React DOM** v19.2.0 - React renderer
- **Vite** v5.4.2 - Build tool and dev server

### Development Tools
- **ESLint** v9.39.1 - Code linting
  - `@eslint/js` - ESLint configuration
  - `eslint-plugin-react-hooks` - React hooks linting
  - `eslint-plugin-react-refresh` - React refresh linting
- **TypeScript Types** - Type definitions for React
  - `@types/react` v19.2.5
  - `@types/react-dom` v19.2.3

### Build System
- **Vite** with React plugin (`@vitejs/plugin-react`)
- ES Modules (`"type": "module"`)

## Directory Structure

```
ovvio/
├── public/                         # Static assets
│   ├── Logo_black.png             # Black version of logo
│   ├── categories/                # Category preview images
│   │   ├── geometrical-obsession.png
│   │   ├── movements-of-feeling.png
│   │   ├── pacing-with-time.png
│   │   └── world-of-overlays.png
│   ├── hero.png                   # Hero section image
│   └── logo.png                   # Main logo
│
├── src/                           # Source code
│   ├── main.jsx                   # Application entry point
│   ├── App.jsx                    # Root component with routing logic
│   │
│   ├── assets/                    # Project assets (currently empty)
│   │
│   ├── components/                # Reusable components
│   │   ├── layout/               # Layout components
│   │   │   └── Header/
│   │   │       ├── Header.jsx
│   │   │       └── Header.module.css
│   │   │
│   │   └── sections/             # Section components
│   │       ├── LandingCategories/
│   │       │   ├── LandingCategories.jsx
│   │       │   └── LandingCategories.module.css
│   │       └── LandingHero/
│   │           ├── LandingHero.jsx
│   │           └── LandingHero.module.css
│   │
│   ├── pages/                    # Page-level components
│   │   ├── IntroPage/           # Initial intro screen
│   │   │   ├── IntroPage.jsx
│   │   │   └── IntroPage.module.css
│   │   ├── LandingPage/         # Main landing page
│   │   │   └── LandingPage.jsx
│   │   └── CategoryShowPage/    # Individual category detail page
│   │       ├── CategoryShowPage.jsx
│   │       └── CategoryShowPage.module.css
│   │
│   ├── data/                    # Data and constants
│   │   └── categories.js        # Category data and utilities
│   │
│   └── styles/                  # Global styles
│       └── global.css          # Global CSS styles
│
├── node_modules/               # Dependencies (not tracked)
├── .idea/                      # IDE configuration
│
├── index.html                  # HTML entry point
├── package.json               # Project configuration and dependencies
├── package-lock.json          # Dependency lock file
├── vite.config.js            # Vite configuration
├── eslint.config.js          # ESLint configuration
└── .gitignore                # Git ignore rules
```

## Architecture

### Application Flow

1. **Entry Point** (`main.jsx`)
   - Renders the App component into the DOM
   - Wraps app in React StrictMode
   - Imports global styles

2. **Root Component** (`App.jsx`)
   - Manages application state using React hooks
   - Implements client-side routing logic
   - Controls view transitions

### State Management

The application uses React's built-in `useState` hooks for state management:

```javascript
const [showIntro, setShowIntro] = useState(true)
const [currentView, setCurrentView] = useState('landing')
const [selectedCategory, setSelectedCategory] = useState(null)
```

**State Variables:**
- `showIntro`: Boolean controlling intro page visibility
- `currentView`: String ('landing' | 'category') for view routing
- `selectedCategory`: Number/null for tracking selected category ID

### Routing Pattern

**Client-Side Routing (State-Based):**
The app uses conditional rendering based on state rather than a routing library:

1. **Intro Screen** → Shows when `showIntro === true`
2. **Landing Page** → Shows when `showIntro === false` and `currentView === 'landing'`
3. **Category Detail** → Shows when `currentView === 'category'`

**Navigation Functions:**
- `handleIntroComplete()` - Transitions from intro to landing
- `handleCategoryClick(categoryId)` - Opens category detail view
- `handleBackToLanding()` - Returns to landing page

## Component Architecture

### Layout Components

#### Header (`src/components/layout/Header/`)
- Persistent navigation component
- Contains logo with click handler for home navigation
- Uses CSS Modules for styling

### Section Components

#### LandingHero (`src/components/sections/LandingHero/`)
- Hero section for landing page
- Displays main visual/message

#### LandingCategories (`src/components/sections/LandingCategories/`)
- Displays category grid on landing page
- Handles category selection

### Page Components

#### IntroPage (`src/pages/IntroPage/`)
- Initial welcome/intro screen
- Accepts `onComplete` callback prop
- Single-use component shown once on load

#### LandingPage (`src/pages/LandingPage/`)
- Main landing page
- Composes LandingHero and LandingCategories
- Accepts `onCategoryClick` callback prop

#### CategoryShowPage (`src/pages/CategoryShowPage/`)
- Detail view for individual categories
- Receives `categoryId` prop
- Displays category-specific content

## Data Structure

### Categories Data (`src/data/categories.js`)

**Exports:**
- `CATEGORIES` - Array of category objects
- `getCategoryById(id)` - Utility function to fetch category by ID

**Category Object Schema:**
```javascript
{
  id: Number,              // Unique identifier (1-4)
  title: String,          // Category name
  previewImage: String,   // Path to preview image
  description: String[]   // Array of description paragraphs
}
```

**Available Categories:**
1. World of Overlays - Exploring relational space and layered meaning
2. Pacing with Time - Examining temporal flow and rhythm
3. Movements of Feeling - Tracking emotional trajectories
4. Geometrical Obsession - Pattern, symmetry, and mathematical order

## Styling Strategy

### CSS Modules
Components use CSS Modules for scoped styling:
- `*.module.css` files
- Prevents style conflicts
- Component-specific styles

### Global Styles
- `src/styles/global.css` - Global CSS rules
- Applied application-wide

### External Fonts
- Google Fonts: Anton family
- Loaded via HTML link tags in `index.html`

## Configuration Files

### package.json
- **Name**: ovvio
- **Version**: 0.0.0 (development)
- **Type**: module (ES Modules)

**Scripts:**
- `npm run dev` - Start Vite dev server
- `npm run build` - Build for production
- `npm run lint` - Run ESLint
- `npm run preview` - Preview production build

### vite.config.js
- Minimal configuration
- React plugin enabled
- Default Vite settings

### eslint.config.js
- ESLint configuration for React
- React Hooks rules
- React Refresh rules

### .gitignore
- Ignores node_modules, dist, build artifacts
- Standard React/Vite ignore patterns

## Development Workflow

### Getting Started
```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Run linter
npm run lint
```

### Build for Production
```bash
# Create production build
npm run build

# Preview production build
npm run preview
```

## Key Features

1. **Introductory Experience** - One-time intro screen on first load
2. **Category Browsing** - Grid view of four thematic categories
3. **Detail Views** - In-depth content for each category
4. **Simple Navigation** - Logo-based navigation back to home
5. **Responsive Design** - CSS Modules for component styling
6. **Modern Build System** - Vite for fast development and optimized builds

## Project Patterns

### Component Organization
- Pages compose sections
- Sections are reusable, context-aware components
- Layout components persist across views
- Each component has co-located styles

### State Over Router
- Uses React state instead of routing library
- Simpler for small applications
- All state in root App component
- Props drilling for callbacks

### Data Management
- Static data in JS files
- Utility functions for data access
- No external data fetching (yet)

## Future Considerations

Based on the current structure, potential expansion paths:

1. **Routing Library** - React Router for URL-based navigation
2. **State Management** - Context API or Redux for complex state
3. **API Integration** - Backend for dynamic content
4. **Authentication** - User accounts and personalization
5. **CMS Integration** - Content management system
6. **Image Optimization** - Next.js Image or similar
7. **Testing** - Jest/Vitest + React Testing Library
8. **TypeScript Migration** - Full type safety

## Notes

- No git repository initialized yet
- Project is in early development (v0.0.0)
- Uses latest React 19 features
- Modern ES modules throughout
- Clean, minimal setup focused on content presentation
