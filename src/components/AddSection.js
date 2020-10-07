import React, { useContext, useEffect, useState } from 'react'
import { FiPlus } from 'react-icons/fi'
import { startSetCurrentSection } from '../actions/notebooks'
import { startAddSection } from '../actions/sections'
import { AuthContext } from '../contexts/auth'
import { NotebooksContext } from '../contexts/notebooks'
import { SectionsContext } from '../contexts/sections'
import { FiltersContext } from '../contexts/filters'
import InputModal from './InputModal'

import styles from './style/AddLink.module.scss'

const AddSection = () => {
  const { auth } = useContext(AuthContext)
  const { notebooks, dispatchNotebooks } = useContext(NotebooksContext)
  const { sections, dispatchSections } = useContext(SectionsContext)
  const { updateFilters } = useContext(FiltersContext)
  const currentNotebookId = notebooks[0].id  // UPDATE when additional notebeook functionality added

  const [modalOpen, setModalOpen] = useState(false)
  const [sectionAdded, setSectionAdded] = useState(false)

  useEffect(() => {
    if(sectionAdded) {
      const newSectionId = sections[sections.length - 1].id
      updateFilters({ section: newSectionId, page: null })
      startSetCurrentSection(auth.uid, currentNotebookId, newSectionId, dispatchNotebooks)
      setSectionAdded(false)
    }
  }, [sectionAdded, updateFilters, auth, currentNotebookId, sections, dispatchNotebooks])

  const handleModalInput = sectionTitle => {
    handleAddSection(sectionTitle)
    handleCloseModal()
  }
  const handleAddSection = sectionTitle => {
    startAddSection(auth.uid, currentNotebookId, sectionTitle, dispatchSections).then(() => { setSectionAdded(true) })
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
        <FiPlus size="1.8rem"/> Add Section
      </button>
      <InputModal
        modalOpen={modalOpen}
        handleInput={handleModalInput}
        handleCloseModal={handleCloseModal}
        messageTxt={'New section name:'}
        primaryBtnTxt={'Create Section'}
      />
    </>
  )
}
 
export default AddSection