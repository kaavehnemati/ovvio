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
