import styles from './IntroPage.module.css'

function IntroPage({ onComplete }) {
  return (
    <div className={styles.introPage}>
      <img
        src="/logo.png"
        alt="OVVIO"
        className={styles.logo}
        onClick={onComplete}
      />
    </div>
  )
}

export default IntroPage
