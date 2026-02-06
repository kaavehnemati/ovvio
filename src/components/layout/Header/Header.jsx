import { useNavigate } from 'react-router-dom'
import styles from './Header.module.css'

function Header() {
  const navigate = useNavigate()

  return (
    <header className={styles.header}>
      <div className={styles.logo} onClick={() => navigate('/')}>
        <img src="/Logo_black.png" alt="Logo" />
      </div>
    </header>
  )
}

export default Header
