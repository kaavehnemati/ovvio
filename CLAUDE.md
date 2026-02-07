# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Ovvio is a React portfolio/content website featuring a category-based content structure. The application uses React Router for navigation with a one-time intro experience and category detail pages.

## Development Commands

```bash
# Start development server (Vite dev server on localhost:5173)
npm run dev

# Lint all code (supports both JS/JSX and TS/TSX files)
npm run lint

# Build for production
npm run build

# Preview production build locally
npm run preview
```

## Tech Stack

- **React 19** with Vite as the build tool
- **React Router v6** for client-side routing
- **TypeScript** (hybrid: data layer only, components are JSX)
- **CSS Modules** for component styling
- **ESLint** with separate configs for JS/JSX and TS/TSX files

## Architecture

### Routing Structure

The app uses React Router with the following route hierarchy:

```
App (ErrorBoundary → BrowserRouter → IntroWrapper)
├── Header (persistent across all routes)
└── Routes
    ├── / (LandingPage)
    └── /category/:id (CategoryShowPage)
```

**Key routing behavior:**
- All routes are wrapped in `IntroWrapper` which conditionally shows `IntroPage` on first visit
- `IntroPage` is displayed BEFORE entering the main app (not a route itself)
- Once dismissed, intro is never shown again (stored in localStorage as `ovvio_intro_seen`)

### Component Architecture

**Layout Wrappers:**
- `ErrorBoundary`: Top-level error catching with development error details
- `IntroWrapper`: Manages localStorage-based intro display logic
- `Header`: Persistent header with logo that navigates to home

**Pages:**
- `IntroPage`: One-time intro screen shown on first visit
- `LandingPage`: Composes `LandingHero` + `LandingCategories` sections
- `CategoryShowPage`: Detail view that uses `useParams()` to get category ID from URL, handles invalid IDs with error UI

**Navigation pattern:**
- Components use `useNavigate()` hook to navigate programmatically
- No prop drilling for navigation callbacks
- `Link` component used for anchor-style navigation (e.g., "Return to Home" link)

### TypeScript Integration

**Hybrid approach:**
- TypeScript is used ONLY for the data layer (`src/types/`, `src/data/`, `src/utils/`)
- All React components remain `.jsx` (not `.tsx`)
- Type definitions in `src/types/index.ts` define `Category` and `CategoryId` interfaces

**Data layer:**
- `src/data/categories.ts`: Contains `CATEGORIES` array (readonly) and `getCategoryById()` helper
- `getCategoryById()` returns `Category | undefined` (no fallback) - forces proper error handling in components
- Categories are hardcoded data, not fetched from API

### State Management

**No global state library** - state is managed through:
- React Router URL params for category selection
- localStorage for intro dismissal state (`src/utils/intro.ts`)
- Local component state where needed

**Important localStorage pattern:**
- `hasSeenIntro()`: Checks if user has seen intro
- `markIntroAsSeen()`: Persists intro dismissal
- `resetIntro()`: Debug utility to clear intro state

### CSS Architecture

- **CSS Modules** for all component styles (`.module.css` extension)
- Global styles in `src/styles/global.css` imported in `main.jsx`
- Component-specific styles co-located with components
- Class names follow camelCase convention in CSS Modules

### Error Handling

- `ErrorBoundary` component wraps entire app (class component using `componentDidCatch`)
- Uses `import.meta.env.DEV` (Vite convention) instead of `process.env.NODE_ENV`
- `CategoryShowPage` handles invalid category IDs with a "not found" UI state
- `getCategoryById()` returns `undefined` for missing categories (no fallback data)

## File Structure Conventions

```
src/
├── components/
│   ├── ErrorBoundary/          # App-level error boundary
│   ├── layout/                 # Layout components (Header, IntroWrapper)
│   └── sections/               # Page sections (LandingHero, LandingCategories)
├── pages/                      # Route-level page components
├── data/                       # TypeScript data definitions and exports
├── types/                      # TypeScript type definitions
├── utils/                      # TypeScript utility functions
└── styles/                     # Global CSS
```

**Co-location pattern:** Each component has its own directory with `.jsx` and `.module.css` files together.

## ESLint Configuration

The project uses flat config format (`eslint.config.js`) with:
- Separate configurations for JS/JSX and TS/TSX files
- TypeScript parser (`@typescript-eslint/parser`) for `.ts` and `.tsx` files
- Rule: Variables matching pattern `^[A-Z_]` ignored by unused-vars check (for React components and constants)

## Important Implementation Notes

1. **Intro behavior**: The intro page shows ONLY on first visit. To test repeatedly, clear localStorage:
   ```javascript
   localStorage.removeItem('ovvio_intro_seen')
   ```

2. **Category IDs**: Categories use numeric IDs (1-4). The URL pattern is `/category/:id` where `:id` is a number.

3. **No nav links in Header**: The header currently contains only the logo (removed during refactoring). If adding navigation links back, they should use React Router's `Link` or `NavLink` components, not hash links.

4. **TypeScript strict mode**: Data layer uses strict TypeScript with `noUnusedLocals`, `noUnusedParameters`, and `noFallthroughCasesInSwitch` enabled.

5. **No test framework**: The project currently has no testing setup (no Jest, Vitest, or React Testing Library).
