import { useApp } from '../../context/AppContext'
import styles from './Toast.module.css'

export default function Toast() {
  const { toast } = useApp()

  return (
    <div className={`${styles.toast} ${toast.visible ? styles.show : ''} ${styles[toast.type]}`}>
      {toast.message}
    </div>
  )
}
