import ImageBlock from '../../ImageBlock/ImageBlock'
import styles from './CategoryImageGrid.module.css'

function CategoryImageGrid({ images }) {
  return (
    <div className={styles.grid}>
      {images.map((image, index) => (
        <ImageBlock key={index} image={image} />
      ))}
    </div>
  )
}

export default CategoryImageGrid
