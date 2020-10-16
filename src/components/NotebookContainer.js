import React, { useContext} from 'react'
import { SettingsContext } from '../contexts/settings'
import Page from './Page'
import Sidebar from './Sidebar'

import '../styles/theme.scss'
import styles from './style/NotebookContainer.module.scss'

const NotebookContainer = () => {
  const { settings } = useContext(SettingsContext)

  return (
    <div className={`${settings.theme} ${styles.notebook}`}>
      <Sidebar />
      <Page />
    </div>
  )
}
 
export default NotebookContainer
