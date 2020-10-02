import React, { useContext } from 'react'
import { FiPlus } from 'react-icons/fi'
import { startAddPage } from '../actions/notebook'
import { AuthContext } from '../contexts/auth'
import { NotebookContext } from '../contexts/notebook'

import styles from './style/AddButton.module.scss'

const AddPage = () => {
  const { auth } = useContext(AuthContext)
  const { dispatchNotebook, currentSection } = useContext(NotebookContext)
  return (
    <button
      className={styles.add}
      onClick={() => startAddPage(auth.uid, currentSection.id, dispatchNotebook)}
    >
      <FiPlus size="2.4rem"/> Add Note
    </button>
  )
}
 
export default AddPage
