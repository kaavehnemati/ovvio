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
