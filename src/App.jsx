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
