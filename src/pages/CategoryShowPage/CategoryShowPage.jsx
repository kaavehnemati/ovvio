import { useRef, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { getCategoryById } from '../../data/categories'
import CategoryImageGrid from '../../components/sections/CategoryImageGrid/CategoryImageGrid'
import styles from './CategoryShowPage.module.css'

function CategoryShowPage() {
  const { id } = useParams()
  const category = getCategoryById(Number(id))
  const containerRef = useRef(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const handleWheel = (e) => {
      // Prevent default vertical scroll
      if (e.preventDefault) {
        e.preventDefault()
      }

      // Convert vertical scroll to horizontal
      const scrollAmount = e.deltaY || e.detail || e.wheelDelta
      container.scrollLeft += scrollAmount

      console.log('Wheel event - deltaY:', e.deltaY, 'scrollLeft:', container.scrollLeft, 'scrollWidth:', container.scrollWidth, 'clientWidth:', container.clientWidth)

      return false
    }

    // Try both the container and window
    container.addEventListener('wheel', handleWheel, { passive: false })
    window.addEventListener('wheel', handleWheel, { passive: false })

    return () => {
      container.removeEventListener('wheel', handleWheel)
      window.removeEventListener('wheel', handleWheel)
    }
  }, [])

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
    <div ref={containerRef} className={styles.categoryShow}>
      <div className={styles.content}>
        <div className={styles.text}>
          <h1>{category.title}</h1>
          {category.description.map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}
        </div>
      </div>

      <div className={styles.imageSection}>
        <CategoryImageGrid images={category.images} />
      </div>
    </div>
  )
}

export default CategoryShowPage
