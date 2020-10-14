import React, { useContext } from 'react'
import { SettingsContext } from '../contexts/settings'
import AppSidebar from './AppSidebar'
import PageSidebar from './PageSidebar'
import AppToolbar from './AppToolbar'

import styles from './style/Sidebar.module.scss'

const Sidebar = () => {
  const { settings } = useContext(SettingsContext)

  if (settings.sidebar === 'full') {
    return (
      <div className={styles.container}>
        <div className={styles.contents}>
          <div className={styles.lists}>
            <AppSidebar />
            <PageSidebar />
          </div>
        </div>
      </div>
    )
  } else {
    return (
      <div className={`${styles.container} ${styles.slim}`}>
        <AppToolbar slim={settings.sidebar === 'full' ? false : true} />
      </div>
    )
  }
}
 
export default Sidebar
