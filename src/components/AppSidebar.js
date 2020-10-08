import React, { useContext } from 'react'
import { FiltersContext } from '../contexts/filters'
import SectionList from './SectionList'

import styles from './style/AppSidebar.module.scss'

const AppSidebar = ({ visibleSections, currentSectionId }) => {
  const { updateFilters } = useContext(FiltersContext)
  return (
    <div className={styles.sidebar}>
      <div
        className={currentSectionId ? styles.link : styles.activeLink}
        onClick={() => updateFilters({ section: null })}
      >
        All Notes
      </div>
      <div className={styles.link}>Favorites</div>
      <div className={styles.link}>Trash</div>
      <div className={styles.sectionHeader}>Categories</div>
      <SectionList
        visibleSections={visibleSections}
        currentSectionId={currentSectionId}
      />
    </div>
  )
}
 
export default AppSidebar
