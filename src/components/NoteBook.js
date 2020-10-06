import React, { useContext} from 'react'
import { startSetNotebooks } from '../actions/notebooks'
import { startSetSections } from '../actions/sections'
import { startSetPages } from '../actions/pages'
import { AuthContext } from '../contexts/auth'
import { NotebooksContext } from '../contexts/notebooks'
import { SectionsContext } from '../contexts/sections'
import { PagesContext } from '../contexts/pages'
import Page from './Page'
import Sidebar from './Sidebar'

import spinner from '../images/spinner.gif'
import styles from './style/Notebook.module.scss'

const Notebook = () => {
  const { auth } = useContext(AuthContext)
  const { notebooks, dispatchNotebooks } = useContext(NotebooksContext)
  const { dispatchSections } = useContext(SectionsContext)
  const { dispatchPages } = useContext(PagesContext)

  const setNotebook = () => {
    startSetNotebooks(auth.uid, dispatchNotebooks)
    startSetSections(auth.uid, dispatchSections)
    startSetPages(auth.uid, dispatchPages)
  }

  if (!!notebooks.length) {
    return (
      <div className={styles.notebook}>
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