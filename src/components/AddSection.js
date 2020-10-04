import React, { useContext, useState } from 'react'
import { FiPlus } from 'react-icons/fi'
import { startAddSection } from '../actions/notebook'
import { AuthContext } from '../contexts/auth'
import { NotebookContext } from '../contexts/notebook'
import InputModal from './InputModal'

import styles from './style/AddButton.module.scss'

const AddSection = () => {
  const { auth } = useContext(AuthContext)
  const { notebook, dispatchNotebook } = useContext(NotebookContext)
  const [modalOpen, setModalOpen] = useState(false)

  const handleSectionTitle = sectionTitle => {
    startAddSection(auth.uid, notebook.currentNotebook, sectionTitle, dispatchNotebook)
    handleCloseModal()
  }
  const handleCloseModal = () => {
    setModalOpen(false)
  }
  return (
    <>
      <button
        className={styles.add}
        onClick={() => setModalOpen(true)}
      >
        <FiPlus size="2.4rem"/> Add Section
      </button>
      <InputModal
        modalOpen={modalOpen}
        handleInput={handleSectionTitle}
        handleCloseModal={handleCloseModal}
        messageTxt={'New section name:'}
        primaryBtnTxt={'Create Section'}
      />
    </>
  )
}
 
export default AddSection