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
