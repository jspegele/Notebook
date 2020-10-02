import React, { useContext} from 'react'
import { startSetNotebook } from '../actions/notebook'
import { AuthContext } from '../contexts/auth'
import { NotebookContext } from '../contexts/notebook'
import Page from './Page'
import Sidebar from './Sidebar'

import spinner from '../images/spinner.gif'
import styles from './style/Notebook.module.scss'

const Notebook = () => {
  const { auth } = useContext(AuthContext)
  const { notebook, dispatchNotebook } = useContext(NotebookContext)

  if (!!notebook.currentNotebook) {
    return (
      <div className={styles.notebook}>
        <Sidebar />
        <Page />
      </div>
    )
  } else {
    startSetNotebook(auth.uid, dispatchNotebook)
    return (
      <div className={styles.loader}>
        <div className={styles.loadingImg}><img src={spinner} alt="loading..." /></div>
        <div className={styles.loadingMsg}>Loading your Notebook...</div>
      </div>
    )
  }


}
 
export default Notebook