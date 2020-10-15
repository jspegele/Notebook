import React, { useContext} from 'react'
import { startSetSections } from '../actions/sections'
import { startSetPages } from '../actions/pages'
import { AuthContext } from '../contexts/auth'
import { SettingsContext } from '../contexts/settings'
import { SectionsContext } from '../contexts/sections'
import { PagesContext } from '../contexts/pages'
import Page from './Page'
import Sidebar from './Sidebar'

import '../styles/theme.scss'
import spinner from '../images/spinner.gif'
import styles from './style/Notebook.module.scss'

const Notebook = () => {
  const { auth } = useContext(AuthContext)
  const { settings } = useContext(SettingsContext)
  const { dispatchSections } = useContext(SectionsContext)
  const { pages, dispatchPages } = useContext(PagesContext)

  const setNotebook = () => {
    startSetSections(auth.uid, dispatchSections)
    startSetPages(auth.uid, dispatchPages)
  }

  if (!!pages.length) {
    return (
      <div className={`${settings.theme} ${styles.notebook}`}>
        {/* {settings.theme === 'dark' && <></>} */}
        <Sidebar />
        <Page />
      </div>
    )
  } else {
    setNotebook()
    return (
      <div className={styles.loader}>
        <div className={styles.loadingImg}><img src={spinner} alt="loading..." /></div>
        <div className={styles.loadingMsg}>Loading your Notebook...</div>
      </div>
    )
  }


}
 
export default Notebook