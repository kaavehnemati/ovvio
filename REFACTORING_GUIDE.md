# Ovvio Refactoring Implementation Guide

## Overview
This guide provides step-by-step instructions to refactor the Ovvio React project from state-based routing to React Router, add TypeScript for the data layer, implement error handling, and improve architecture while maintaining the exact visual design and user experience.

## Goals
1. ✅ Replace state-based routing with React Router
2. ✅ Improve state architecture (remove fragile view flags)
3. ✅ Introduce TypeScript incrementally (data layer only)
4. ✅ Add error handling (Error Boundary + invalid category handling)
5. ✅ Improve project structure

---

## Phase 1: Dependencies & Configuration

### Step 1.1: Install React Router
```bash
npm install react-router-dom
```

### Step 1.2: Create TypeScript Configuration

Create `tsconfig.json` in project root:

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "useDefineForClassFields": true,
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "skipLibCheck": true,
    "allowJs": true,
    "checkJs": false,

    /* Bundler mode */
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "react-jsx",

    /* Linting */
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noFallthroughCasesInSwitch": true
  },
  "include": ["src/**/*.ts", "src/**/*.tsx"],
  "references": [{ "path": "./tsconfig.node.json" }]
}
```

### Step 1.3: Create TypeScript Node Configuration

Create `tsconfig.node.json` in project root:

```json
{
  "compilerOptions": {
    "composite": true,
    "skipLibCheck": true,
    "module": "ESNext",
    "moduleResolution": "bundler",
    "allowSyntheticDefaultImports": true
  },
  "include": ["vite.config.js"]
}
```

---

## Phase 2: TypeScript Data Layer

### Step 2.1: Create Type Definitions

Create `src/types/index.ts`:

```typescript
export interface Category {
  id: number
  title: string
  previewImage: string
  description: string[]
}

export type CategoryId = number
```

### Step 2.2: Convert Categories to TypeScript

Rename `src/data/categories.js` to `src/data/categories.ts` and update content:

```typescript
import type { Category, CategoryId } from '../types'

export const CATEGORIES: readonly Category[] = [
  {
    id: 1,
    title: 'World of Overlays',
    previewImage: '/categories/world-of-overlays.png',
    description: [
      '"World of Overlays" explores a relational approach to space. It traces images where layers of meaning are revealed through interaction, disruption, and overlap with other elements that are often unseen, but profoundly affect what is made visible in a situation. This work touches on immaterial aspects of zones, rooms, architecture, and non-architecture.',
      '"World of Overlays" functions as a territory of an event within which layers exist. In this perspective of overlays, we are interested in spaces that are built when the observer is present, and when they are not. Every layer, when viewed from another perspective, provides a different stage of the unfolding of the event.'
    ]
  },
  {
    id: 2,
    title: 'Pacing with Time',
    previewImage: '/categories/pacing-with-time.png',
    description: [
      'Time is not uniform. It stretches, compresses, and fragments according to our attention and experience. This category examines our relationship with temporal flow.',
      'The rhythms we establish—daily, seasonal, lifetime—create patterns that both constrain and liberate our understanding of duration and change.',
      'By pacing with time rather than against it, we find new modes of presence and awareness.'
    ]
  },
  {
    id: 3,
    title: 'Movements of Feeling',
    previewImage: '/categories/movements-of-feeling.png',
    description: [
      'Emotion is not static. It flows, shifts, and transforms through our physical and mental landscapes. This category tracks the trajectories of feeling.',
      'The language of movement—gesture, posture, rhythm—reveals emotional states that words cannot capture.',
      'Understanding feeling as movement rather than fixed state opens new possibilities for emotional literacy and expression.'
    ]
  },
  {
    id: 4,
    title: 'Geometrical Obsession',
    previewImage: '/categories/geometrical-obsession.png',
    description: [
      'Geometry is the fundamental language of space and form. This category delves into the compulsive desire to find pattern, symmetry, and mathematical order.',
      'The circle, triangle, and rectangle are not mere shapes but archetypes of thought—frameworks through which we organize reality.',
      'Obsession with geometry reveals the human need to impose structure on chaos, to find certainty in the uncertain.'
    ]
  }
] as const

export const getCategoryById = (id: CategoryId): Category | undefined => {
  return CATEGORIES.find(cat => cat.id === id)
}
```

**Key Changes:**
- Now returns `Category | undefined` instead of always returning a fallback
- This forces proper error handling in components

---

## Phase 3: Utilities & Intro Wrapper

### Step 3.1: Create localStorage Utility

Create `src/utils/intro.ts`:

```typescript
const INTRO_SEEN_KEY = 'ovvio_intro_seen'

export const hasSeenIntro = (): boolean => {
  try {
    return localStorage.getItem(INTRO_SEEN_KEY) === 'true'
  } catch (error) {
    console.warn('localStorage not available:', error)
    return false // Show intro if localStorage fails
  }
}

export const markIntroAsSeen = (): void => {
  try {
    localStorage.setItem(INTRO_SEEN_KEY, 'true')
  } catch (error) {
    console.warn('Could not save intro state:', error)
  }
}

// Optional: For testing/debugging
export const resetIntro = (): void => {
  try {
    localStorage.removeItem(INTRO_SEEN_KEY)
  } catch (error) {
    console.warn('Could not reset intro state:', error)
  }
}
```

### Step 3.2: Create IntroWrapper Component

Create `src/components/layout/IntroWrapper/IntroWrapper.jsx`:

```jsx
import { useState } from 'react'
import IntroPage from '../../../pages/IntroPage/IntroPage'
import { hasSeenIntro, markIntroAsSeen } from '../../../utils/intro'

function IntroWrapper({ children }) {
  const [showIntro, setShowIntro] = useState(() => !hasSeenIntro())

  const handleIntroComplete = () => {
    markIntroAsSeen()
    setShowIntro(false)
  }

  if (showIntro) {
    return <IntroPage onComplete={handleIntroComplete} />
  }

  return <>{children}</>
}

export default IntroWrapper
```

---

## Phase 4: React Router Migration

### Step 4.1: Update App.jsx

Replace entire content of `src/App.jsx`:

```jsx
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Header from './components/layout/Header/Header'
import IntroWrapper from './components/layout/IntroWrapper/IntroWrapper'
import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary'
import LandingPage from './pages/LandingPage/LandingPage'
import CategoryShowPage from './pages/CategoryShowPage/CategoryShowPage'

function App() {
  return (
    <ErrorBoundary>
      <BrowserRouter>
        <IntroWrapper>
          <Header />
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/category/:id" element={<CategoryShowPage />} />
          </Routes>
        </IntroWrapper>
      </BrowserRouter>
    </ErrorBoundary>
  )
}

export default App
```

**Key Changes:**
- ❌ Removed: `useState` imports and all state variables (`showIntro`, `currentView`, `selectedCategory`)
- ❌ Removed: All callback functions (`handleIntroComplete`, `handleCategoryClick`, `handleBackToLanding`)
- ✅ Added: React Router components (`BrowserRouter`, `Routes`, `Route`)
- ✅ Added: `IntroWrapper` and `ErrorBoundary` wrappers
- ✅ Added: Route definitions for `/` and `/category/:id`

### Step 4.2: Update Header Component

Replace content of `src/components/layout/Header/Header.jsx`:

```jsx
import { useNavigate } from 'react-router-dom'
import styles from './Header.module.css'

function Header() {
  const navigate = useNavigate()

  return (
    <header className={styles.header}>
      <div className={styles.logo} onClick={() => navigate('/')}>
        <img src="/Logo_black.png" alt="Logo" />
      </div>
    </header>
  )
}

export default Header
```

**Key Changes:**
- ❌ Removed: `onLogoClick` prop
- ❌ Removed: `<nav>` section with hash links (temporarily, per user decision)
- ✅ Added: `useNavigate()` hook
- ✅ Added: Direct navigation to `/` on logo click

### Step 4.3: Update LandingPage Component

Replace content of `src/pages/LandingPage/LandingPage.jsx`:

```jsx
import LandingHero from '../../components/sections/LandingHero/LandingHero'
import LandingCategories from '../../components/sections/LandingCategories/LandingCategories'

function LandingPage() {
  return (
    <>
      <LandingHero />
      <LandingCategories />
    </>
  )
}

export default LandingPage
```

**Key Changes:**
- ❌ Removed: `onCategoryClick` prop
- ✅ Simplified: No prop drilling needed

### Step 4.4: Update LandingCategories Component

Replace content of `src/components/sections/LandingCategories/LandingCategories.jsx`:

```jsx
import { useNavigate } from 'react-router-dom'
import { CATEGORIES } from '../../../data/categories'
import styles from './LandingCategories.module.css'

function LandingCategories() {
  const navigate = useNavigate()

  const handleCategoryClick = (categoryId) => {
    navigate(`/category/${categoryId}`)
  }

  return (
    <section className={styles.categories}>
      {CATEGORIES.map((category, index) => (
        <div
          key={category.id}
          className={`${styles.categoryBlock} ${
            index % 2 === 0 ? styles.imageLeft : styles.imageRight
          }`}
          onClick={() => handleCategoryClick(category.id)}
        >
          <div className={styles.image}>
            <img src={category.previewImage} alt={category.title} />
          </div>
          <div className={styles.titleWrapper}>
            <h2>{category.title}</h2>
          </div>
        </div>
      ))}
    </section>
  )
}

export default LandingCategories
```

**Key Changes:**
- ❌ Removed: `onCategoryClick` prop
- ✅ Added: `useNavigate()` hook
- ✅ Added: Local `handleCategoryClick` function that navigates to `/category/:id`

### Step 4.5: Update CategoryShowPage Component

Replace content of `src/pages/CategoryShowPage/CategoryShowPage.jsx`:

```jsx
import { useParams, Link } from 'react-router-dom'
import { getCategoryById } from '../../data/categories'
import styles from './CategoryShowPage.module.css'

function CategoryShowPage() {
  const { id } = useParams()
  const category = getCategoryById(Number(id))

  if (!category) {
    return (
      <div className={styles.categoryShow}>
        <div className={styles.notFound}>
          <h1>Category Not Found</h1>
          <p>The category you're looking for doesn't exist.</p>
          <Link to="/" className={styles.homeLink}>Return to Home</Link>
        </div>
      </div>
    )
  }

  return (
    <div className={styles.categoryShow}>
      <div className={styles.content}>
        <div className={styles.text}>
          <h1>{category.title}</h1>
          {category.description.map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}
        </div>

        <div className={styles.imageWrapper}>
          <img src={category.previewImage} alt={category.title} />
        </div>
      </div>
    </div>
  )
}

export default CategoryShowPage
```

**Key Changes:**
- ❌ Removed: `categoryId` prop
- ✅ Added: `useParams()` hook to get ID from URL
- ✅ Added: Error handling for invalid category IDs
- ✅ Added: "Not Found" UI with link back to home

### Step 4.6: Add Styles for Not Found State

Add to `src/pages/CategoryShowPage/CategoryShowPage.module.css`:

```css
.notFound {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 60vh;
  text-align: center;
  padding: 2rem;
}

.notFound h1 {
  font-size: 2rem;
  margin-bottom: 1rem;
}

.notFound p {
  font-size: 1.2rem;
  margin-bottom: 2rem;
  color: #666;
}

.homeLink {
  display: inline-block;
  padding: 0.75rem 1.5rem;
  background-color: #000;
  color: #fff;
  text-decoration: none;
  border-radius: 4px;
  transition: background-color 0.2s;
}

.homeLink:hover {
  background-color: #333;
}
```

---

## Phase 5: Error Boundary

### Step 5.1: Create ErrorBoundary Component

Create `src/components/ErrorBoundary/ErrorBoundary.jsx`:

```jsx
import React from 'react'
import styles from './ErrorBoundary.module.css'

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false, error: null, errorInfo: null }
  }

  static getDerivedStateFromError(error) {
    return { hasError: true }
  }

  componentDidCatch(error, errorInfo) {
    console.error('Error caught by boundary:', error, errorInfo)
    this.state = {
      hasError: true,
      error,
      errorInfo
    }
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null, errorInfo: null })
    window.location.href = '/'
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className={styles.errorBoundary}>
          <div className={styles.errorContent}>
            <h1>Oops! Something went wrong</h1>
            <p>We encountered an unexpected error. Please try refreshing the page.</p>
            <button onClick={this.handleReset} className={styles.resetButton}>
              Go to Home
            </button>
            {process.env.NODE_ENV === 'development' && this.state.error && (
              <details className={styles.errorDetails}>
                <summary>Error Details</summary>
                <pre>{this.state.error.toString()}</pre>
                {this.state.errorInfo && (
                  <pre>{this.state.errorInfo.componentStack}</pre>
                )}
              </details>
            )}
          </div>
        </div>
      )
    }

    return this.props.children
  }
}

export default ErrorBoundary
```

### Step 5.2: Create ErrorBoundary Styles

Create `src/components/ErrorBoundary/ErrorBoundary.module.css`:

```css
.errorBoundary {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  padding: 2rem;
  background-color: #f5f5f5;
}

.errorContent {
  max-width: 600px;
  padding: 3rem;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  text-align: center;
}

.errorContent h1 {
  font-size: 2rem;
  margin-bottom: 1rem;
  color: #333;
}

.errorContent p {
  font-size: 1.1rem;
  margin-bottom: 2rem;
  color: #666;
  line-height: 1.6;
}

.resetButton {
  padding: 0.75rem 2rem;
  font-size: 1rem;
  font-family: inherit;
  background-color: #000;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.2s;
}

.resetButton:hover {
  background-color: #333;
}

.errorDetails {
  margin-top: 2rem;
  text-align: left;
  font-size: 0.9rem;
}

.errorDetails summary {
  cursor: pointer;
  margin-bottom: 1rem;
  color: #666;
}

.errorDetails pre {
  background-color: #f5f5f5;
  padding: 1rem;
  border-radius: 4px;
  overflow-x: auto;
  font-size: 0.85rem;
  white-space: pre-wrap;
  word-wrap: break-word;
}
```

---

## Phase 6: Update ESLint Configuration

Update `eslint.config.js` to support TypeScript files:

```javascript
import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import { defineConfig, globalIgnores } from 'eslint/config'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{js,jsx,ts,tsx}'],  // Added ts,tsx
    extends: [
      js.configs.recommended,
      reactHooks.configs.flat.recommended,
      reactRefresh.configs.vite,
    ],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
      parserOptions: {
        ecmaVersion: 'latest',
        ecmaFeatures: { jsx: true },
        sourceType: 'module',
      },
    },
    rules: {
      'no-unused-vars': ['error', { varsIgnorePattern: '^[A-Z_]' }],
    },
  },
])
```

---

## Testing Guide

### Manual Testing Checklist

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Start Development Server**
   ```bash
   npm run dev
   ```

3. **Test Intro Flow**
   - Open app in browser (should show intro)
   - Click logo on intro screen
   - Should navigate to landing page
   - Refresh page (intro should NOT appear)
   - Open DevTools → Application → Local Storage
   - Verify `ovvio_intro_seen` is set to `'true'`

4. **Test Landing Page**
   - Verify hero section displays correctly
   - Verify 4 category cards display
   - Layout should alternate image left/right

5. **Test Category Navigation**
   - Click on "World of Overlays" category
   - URL should change to `/category/1`
   - Should show category detail page with full description
   - Click header logo
   - Should return to landing page (`/`)
   - Click browser back button
   - Should return to category detail

6. **Test Invalid Category**
   - Manually navigate to `/category/999` in browser
   - Should show "Category Not Found" error page
   - Click "Return to Home" link
   - Should navigate back to landing

7. **Test Error Boundary** (Optional)
   - Temporarily add `throw new Error('Test')` in CategoryShowPage component
   - Navigate to category
   - Should show error boundary UI
   - Click "Go to Home"
   - Should navigate back to landing
   - Remove test error

8. **Test Browser Navigation**
   - Click through multiple categories
   - Use browser back/forward buttons
   - Verify URL and content sync correctly

9. **Test Intro Reset**
   - Open DevTools → Application → Local Storage
   - Delete `ovvio_intro_seen` key
   - Refresh page
   - Intro should appear again

10. **Run Linter**
    ```bash
    npm run lint
    ```
    Should have no errors

11. **Build for Production**
    ```bash
    npm run build
    ```
    Should complete successfully

---

## Verification Commands

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Run linter
npm run lint

# Build for production
npm run build

# Preview production build
npm run preview
```

---

## New Folder Structure

```
ovvio/
├── src/
│   ├── types/                          # NEW
│   │   └── index.ts
│   ├── utils/                          # NEW
│   │   └── intro.ts
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Header/
│   │   │   │   ├── Header.jsx        # MODIFIED
│   │   │   │   └── Header.module.css
│   │   │   ├── IntroWrapper/          # NEW
│   │   │   │   └── IntroWrapper.jsx
│   │   │   └── ErrorBoundary/         # NEW
│   │   │       ├── ErrorBoundary.jsx
│   │   │       └── ErrorBoundary.module.css
│   │   └── sections/
│   │       ├── LandingHero/
│   │       └── LandingCategories/
│   │           └── LandingCategories.jsx  # MODIFIED
│   ├── pages/
│   │   ├── IntroPage/
│   │   ├── LandingPage/
│   │   │   └── LandingPage.jsx       # MODIFIED
│   │   └── CategoryShowPage/
│   │       ├── CategoryShowPage.jsx   # MODIFIED
│   │       └── CategoryShowPage.module.css  # MODIFIED
│   ├── data/
│   │   └── categories.ts              # RENAMED & MODIFIED
│   ├── styles/
│   ├── App.jsx                         # MODIFIED
│   └── main.jsx
├── tsconfig.json                        # NEW
├── tsconfig.node.json                   # NEW
└── package.json                         # MODIFIED (add react-router-dom)
```

---

## Summary of Changes

### Deleted
- ❌ State management code in App.jsx (`showIntro`, `currentView`, `selectedCategory`)
- ❌ Callback props for navigation (`onCategoryClick`, `onLogoClick`, etc.)
- ❌ Header navigation links (temporarily)
- ❌ Fallback behavior in `getCategoryById` (now returns undefined)

### Added
- ✅ React Router (BrowserRouter, Routes, Route, useNavigate, useParams, Link)
- ✅ TypeScript support (tsconfig.json)
- ✅ Type definitions (src/types/index.ts)
- ✅ IntroWrapper component (handles intro session logic)
- ✅ ErrorBoundary component (catches render errors)
- ✅ localStorage utilities (intro.ts)
- ✅ Error handling for invalid category IDs
- ✅ Not Found UI in CategoryShowPage

### Modified
- 🔄 App.jsx - Complete rewrite with Router
- 🔄 categories.js → categories.ts - TypeScript conversion
- 🔄 Header.jsx - Uses useNavigate instead of prop
- 🔄 LandingPage.jsx - No longer passes callback props
- 🔄 LandingCategories.jsx - Uses useNavigate internally
- 🔄 CategoryShowPage.jsx - Uses useParams, adds error handling
- 🔄 CategoryShowPage.module.css - Added not found styles

### Benefits
- ✅ URL-based navigation (shareable links, browser back/forward works)
- ✅ Cleaner component architecture (no prop drilling)
- ✅ Type safety for data layer
- ✅ Proper error handling
- ✅ Better separation of concerns
- ✅ More maintainable and scalable

---

## Troubleshooting

### Issue: TypeScript errors in IDE
**Solution**: Restart your IDE/editor after creating tsconfig.json

### Issue: Intro shows every time
**Solution**: Check browser DevTools → Application → Local Storage for `ovvio_intro_seen` key

### Issue: 404 when accessing /category/1 directly
**Solution**: This is expected in production. Vite dev server handles it automatically. In production, you'll need to configure your host to serve index.html for all routes.

### Issue: ESLint errors on .ts files
**Solution**: Make sure eslint.config.js includes `'**/*.{js,jsx,ts,tsx}'` in files array

### Issue: Import errors after renaming categories.js to .ts
**Solution**: Update all imports to use `'../../data/categories'` (extension is automatic)

---

## Next Steps (Future Enhancements)

Once this refactor is complete, consider:

1. **Add 404 route** for non-existent paths
2. **Category slugs in URLs** (`/category/world-of-overlays` instead of `/category/1`)
3. **Smooth page transitions** using Framer Motion or similar
4. **Add navigation links back** to Header (cv, index, contact pages)
5. **Full TypeScript conversion** if team prefers stricter typing
6. **Add testing** with Vitest + React Testing Library
7. **Image optimization** and lazy loading
8. **SEO metadata** with react-helmet or similar

---

## Questions?

If you encounter any issues during implementation:
1. Check the console for errors
2. Verify all imports are correct
3. Make sure react-router-dom is installed
4. Check that file names and paths match exactly
5. Refer to the testing checklist above

Good luck with the refactor! 🚀
