import React, { useContext } from 'react'
import { FiSettings } from 'react-icons/fi'
import { SettingsContext } from '../contexts/settings'
import AddPage from './AddPage'

import styles from './style/AppToolbar.module.scss'
import ToggleSidebar from './ToggleSidebar'

const AppToolbar = () => {
  const { settings } = useContext(SettingsContext)
  return (
    <div className={settings.sidebar === 'slim' ? `${styles.toolbar} ${styles.slim}` : styles.toolbar}>
      <ToggleSidebar />
      <AddPage />
      <button><FiSettings /></button>
    </div>
  )
}
 
export default AppToolbar
