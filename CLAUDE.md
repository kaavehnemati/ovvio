# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

OVVIO is a React 19.2 + Vite SPA that presents a multidisciplinary research platform exploring "states of observation" through four thematic categories. The application features an intro splash screen, a landing page with category cards, and detailed category pages.

## Development Commands

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Run ESLint
npm run lint

# Preview production build locally
npm run preview
```

Note: There are no test scripts configured in this project.

## Architecture

### Routing Structure

The application uses React Router DOM v6 with two main routes:
- `/` - Landing page (hero + category grid)
- `/category/:id` - Category detail page (dynamic route using category ID)

Routes are defined in `src/App.jsx` with the following component hierarchy:
```
ErrorBoundary
└── BrowserRouter
    └── IntroWrapper (conditionally displays IntroPage)
        ├── Header (sticky navigation)
        └── Routes
```

### Component Organization

**Pages** (`src/pages/`): Route-level components
- `LandingPage`: Combines `LandingHero` and `LandingCategories` sections
- `CategoryShowPage`: Displays individual category details using URL parameter
- `IntroPage`: Welcome splash screen shown on first visit

**Layout Components** (`src/components/layout/`):
- `Header`: Sticky navigation with logo (navigates to home on click)
- `IntroWrapper`: HOC that manages intro splash screen display logic

**Section Components** (`src/components/sections/`): Large reusable UI blocks
- `LandingHero`: Hero section with dynamic title width measurement
- `LandingCategories`: Category card grid with alternating left/right layout pattern

**Utility Components**:
- `ErrorBoundary`: Class-based error boundary with development-mode error details

### Data Management

**Static Data** (`src/data/categories.ts`):
- `CATEGORIES`: Readonly array of category objects (4 categories total)
- `getCategoryById(id)`: Helper function to retrieve category by ID

**State Management Patterns**:
- Local component state with `useState()` for UI state
- URL parameters for category selection (React Router)
- `localStorage` for intro screen persistence via `src/utils/intro.ts`:
  - `hasSeenIntro()`: Check if user has viewed intro
  - `markIntroAsSeen()`: Mark intro as viewed
  - `resetIntro()`: Clear intro state (for testing)

**Type Definitions** (`src/types/index.ts`):
- `Category`: Interface for category objects (id, title, previewImage, description[])
- `CategoryId`: Type alias for number

### Styling

- **Global styles**: `src/styles/global.css` (CSS reset, Anton font from Google Fonts)
- **Component styles**: CSS Modules (`.module.css`) for scoped component styling
- **Largest style file**: `LandingCategories.module.css` (153 lines) handles complex alternating layout

### Asset Organization

All static assets are in `/public/`:
- `Logo_black.png`, `logo.png`, `header_logo_hover.png`: Logo variations
- `hero.png`: Hero section background
- `/categories/`: Category preview images (4 PNG files matching category IDs)

## Key Architectural Patterns

1. **Feature-based structure**: Clear separation of pages, components, data, and utilities
2. **Component pattern**: Each component has a `.jsx` file + `.module.css` file
3. **Type safety**: TypeScript with strict mode, `noUnusedLocals`, and `noUnusedParameters`
4. **Immutable data**: Categories defined with `as const` and readonly array
5. **Error handling**: ErrorBoundary wraps entire app at root level
6. **First-time UX**: Intro screen managed via localStorage, displayed once per user

## Configuration

- **TypeScript**: Strict mode enabled, ES2020 target, bundler module resolution
- **Vite**: Standard React plugin configuration, no custom build options
- **ESLint**: React Hooks, React Refresh, and TypeScript plugins configured
- **Module type**: ESM (`"type": "module"` in package.json)

## Adding New Categories

To add a new category:
1. Add PNG image to `/public/categories/`
2. Add category object to `CATEGORIES` array in `src/data/categories.ts`
3. Follow existing structure: `{ id, title, previewImage, description: string[] }`
4. Category will automatically appear on landing page and be routable at `/category/{id}`
