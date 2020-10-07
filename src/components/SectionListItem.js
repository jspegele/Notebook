import React, { useContext, useState } from 'react'
import PropTypes from 'prop-types'
import { FiSettings } from 'react-icons/fi'
import { startSetCurrentSection } from '../actions/notebooks'
import { startEditSection, startRemoveSection } from '../actions/sections'
import { AuthContext } from '../contexts/auth'
import { NotebooksContext } from '../contexts/notebooks'
import { SectionsContext } from '../contexts/sections'
import EditSectionModal from './EditSectionModal'

import styles from './style/ListItem.module.scss'

const SectionListItem = ({ visibleSections, sectionId, title, currentNotebookId, activeSection }) => {
  const { auth } = useContext(AuthContext)
  const { currentSectionId, dispatchNotebooks } = useContext(NotebooksContext)
  const { dispatchSections } = useContext(SectionsContext)
  const [modalOpen, setModalOpen] = useState(false)
  const handleCloseModal = () => {
    setModalOpen(false)
  }
  const handleSave = newTitle => {
    startEditSection(auth.uid, sectionId, { title: newTitle }, dispatchSections)
  }
  const handleDelete = () => {
    const currSectionIndex = visibleSections.findIndex(el => el.id === sectionId)
    const newSectionIndex = currSectionIndex === 0 ? 1 : currSectionIndex - 1
    const newSectionId = !!visibleSections[newSectionIndex] ? visibleSections[newSectionIndex].id : ''
    if (currentSectionId === sectionId) {
      startSetCurrentSection(auth.uid, currentNotebookId, newSectionId, dispatchNotebooks)
    }
    startRemoveSection(auth.uid, sectionId, dispatchSections)
  }
  return (
    <div className={activeSection ? styles.activeItemContainer : styles.itemContainer}>
      <div
        className={styles.item}
        onClick={() => startSetCurrentSection(auth.uid, currentNotebookId, sectionId, dispatchNotebooks)}
      >
        {title || "Untitled Section"}
      </div>
      <div
        className={styles.edit}
        onClick={() => setModalOpen(true)}
      >
        <FiSettings size="1.6rem" />
      </div>
      <EditSectionModal
        modalOpen={modalOpen}
        handleCloseModal={handleCloseModal}
        sectionId={sectionId}
        sectionTitle={title}
        handleSave={handleSave}
        handleDelete={handleDelete}
      />
    </div>
  )
}

SectionListItem.propTypes = {
  sectionId: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  currentNotebookId: PropTypes.string.isRequired,
  activeSection: PropTypes.bool
}

SectionListItem.defaultProps = {
  activeSection: false
}
 
export default SectionListItem
