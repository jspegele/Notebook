import React, { useContext } from 'react'
import { SettingsContext } from '../contexts/settings'
import ToggleSidebar from './ToggleSidebar'
import AddPage from './AddPage'
import Settings from './Settings'

import styles from './style/AppToolbar.module.scss'

const AppToolbar = () => {
  const { settings } = useContext(SettingsContext)
  return (
    <div className={settings.sidebar === 'slim' ? `${styles.toolbar} ${styles.slim}` : styles.toolbar}>
      <ToggleSidebar />
      <AddPage />
      <Settings />
    </div>
  )
}
 
export default AppToolbar
