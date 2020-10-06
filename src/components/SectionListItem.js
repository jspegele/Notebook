import React, { useContext, useState } from 'react'
import PropTypes from 'prop-types'
import { FiSettings } from 'react-icons/fi'
import { startSetCurrentSection } from '../actions/notebooks'
import { AuthContext } from '../contexts/auth'
import { NotebooksContext } from '../contexts/notebooks'
import { SectionsContext } from '../contexts/sections'

import styles from './style/ListItem.module.scss'
import EditSectionModal from './EditSectionModal'
import { startEditSection } from '../actions/sections'

const SectionListItem = ({ sectionId, title, currentNotebookId, activeSection }) => {
  const { auth } = useContext(AuthContext)
  const { dispatchNotebooks } = useContext(NotebooksContext)
  const { dispatchSections } = useContext(SectionsContext)
  const [modalOpen, setModalOpen] = useState(false)
  const handleCloseModal = () => {
    setModalOpen(false)
  }
  const handleUpdateTitle = newTitle => {
    startEditSection(auth.uid, sectionId, { title: newTitle }, dispatchSections)
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
        handleTitle={handleUpdateTitle}
        title={title}
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
