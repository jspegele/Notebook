import React, { useContext, useState } from 'react'
import PropTypes from 'prop-types'
import { FiSettings } from 'react-icons/fi'
import { startEditSection, startRemoveSection } from '../actions/sections'
import { AuthContext } from '../contexts/auth'
import { FiltersContext } from '../contexts/filters'
import { SectionsContext } from '../contexts/sections'
import EditSectionModal from './EditSectionModal'

import styles from './style/ListItem.module.scss'

const SectionListItem = ({ visibleSections, sectionId, title, activeSection }) => {
  const { auth } = useContext(AuthContext)
  const { sections, dispatchSections } = useContext(SectionsContext)
  const { filters, updateFilters } = useContext(FiltersContext)
  const currentSectionId = filters.section || null
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
      updateFilters({
        section: newSectionId,
        page: sections.filter(section => section.id === newSectionId)[0].currentPage
      })
    }
    startRemoveSection(auth.uid, sectionId, dispatchSections)
  }
  return (
    <div className={activeSection ? styles.activeItemContainer : styles.itemContainer}>
      <div
        className={styles.item}
        onClick={() => updateFilters({
          section: sectionId,
          page: sections.filter(section => section.id === sectionId)[0].currentPage
        })}
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
  title: PropTypes.string,
  activeSection: PropTypes.bool
}

SectionListItem.defaultProps = {
  title: '',
  activeSection: false
}
 
export default SectionListItem
