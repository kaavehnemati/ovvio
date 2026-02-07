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
      {CATEGORIES.map((category, index) => {
        const isEven = index % 2 === 0
        const layoutClass = isEven ? styles.imageLeft : styles.imageRight

        return (
          <article
            key={category.id}
            className={`${styles.categoryBlock} ${layoutClass}`}
            onClick={() => handleCategoryClick(category.id)}
          >
            <div className={styles.imageWrapper}>
              <img
                src={category.previewImage}
                alt={category.title}
                className={styles.categoryImage}
              />
            </div>
            <h2 className={styles.categoryTitle}>{category.title}</h2>
          </article>
        )
      })}
    </section>
  )
}

export default LandingCategories
