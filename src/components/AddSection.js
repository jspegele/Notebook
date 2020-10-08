import React, { useContext, useEffect, useState } from 'react'
import { FiPlus } from 'react-icons/fi'
import { startAddSection } from '../actions/sections'
import { AuthContext } from '../contexts/auth'
import { SectionsContext } from '../contexts/sections'
import { FiltersContext } from '../contexts/filters'
import InputModal from './InputModal'

import styles from './style/AddLink.module.scss'

const AddSection = () => {
  const { auth } = useContext(AuthContext)
  const { sections, dispatchSections } = useContext(SectionsContext)
  const { updateFilters } = useContext(FiltersContext)

  const [modalOpen, setModalOpen] = useState(false)
  const [sectionAdded, setSectionAdded] = useState(false)

  useEffect(() => {
    if(sectionAdded) {
      const newSectionId = sections[sections.length - 1].id
      updateFilters({ section: newSectionId, page: null })
      setSectionAdded(false)
    }
  }, [sectionAdded, updateFilters, sections])

  const handleModalInput = sectionTitle => {
    handleAddSection(sectionTitle)
    handleCloseModal()
  }
  const handleAddSection = sectionTitle => {
    startAddSection(auth.uid, sectionTitle, dispatchSections).then(() => { setSectionAdded(true) })
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