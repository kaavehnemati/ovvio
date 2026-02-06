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
