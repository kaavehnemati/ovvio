import { useEffect, useRef, useState } from 'react'
import styles from './LandingHero.module.css'

function LandingHero() {
  const titleRef = useRef(null)
  const [titleWidth, setTitleWidth] = useState(null)

  useEffect(() => {
    const measureTitle = () => {
      if (titleRef.current) {
        const width = titleRef.current.getBoundingClientRect().width
        setTitleWidth(width)
      }
    }

    document.fonts.ready.then(() => {
      measureTitle()
    })

    window.addEventListener('resize', measureTitle)

    return () => {
      window.removeEventListener('resize', measureTitle)
    }
  }, [])

  return (
    <section className={styles.hero}>
      <div className={styles.content}>
        <h1 ref={titleRef} className={styles.title}>
          Obsessed with states of the obvious
        </h1>
        <p
          className={styles.description}
          style={{ width: titleWidth ? `${titleWidth}px` : undefined }}
        >
          OVViO is a multidisciplinary research platform that investigates the world of immediate surroundings
          through photography, video, performance, drawing, and objects. It casts light on what is neglected
          and gives voice to the often silent aspects of everyday life.
          OVViO believes in the inexplicable honesty of the obvious. It explores the multi-layered nature of
          reality in search of magics, hidden within the vast layers of undiscovered territories. In the
          background of the un-necessary, the un-popular, the un-ordinary, the un-iconic, and the unseen, it
          searches for a truth that is both bitter and sweet.
          OVViO aims to create a world with strong roots in reality. It respects the spontaneous, plays with
          fiction and dreams of a world that feels familiar yet can inspire in the most obvious ways.
        </p>
      </div>
    </section>
  )
}

export default LandingHero
