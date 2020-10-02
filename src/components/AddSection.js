import React, { useContext } from 'react'
import { FiPlus } from 'react-icons/fi'
import { startAddSection } from '../actions/notebook'
import { AuthContext } from '../contexts/auth'
import { NotebookContext } from '../contexts/notebook'

import styles from './style/AddButton.module.scss'

const AddSection = () => {
  const { auth } = useContext(AuthContext)
  const { notebook, dispatchNotebook } = useContext(NotebookContext)
  return (
    <button
      className={styles.add}
      onClick={() => startAddSection(auth.uid, notebook.currentNotebook, dispatchNotebook)}
    >
      <FiPlus size="2.4rem"/> Add Section
    </button>
  )
}
 
export default AddSection