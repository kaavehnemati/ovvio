import styles from './ImageBlock.module.css'

function ImageBlock({ image }) {
  const containerClass = image.blockType === 'half'
    ? `${styles.blockContainer} ${styles.blockHalf}`
    : `${styles.blockContainer} ${styles.blockFull}`

  return (
    <div className={containerClass}>
      <img
        src={image.src}
        alt=""
        className={styles.image}
        style={{
          top: `${image.offsetTop}px`,
          right: `${image.offsetRight}px`
        }}
      />
    </div>
  )
}

export default ImageBlock
