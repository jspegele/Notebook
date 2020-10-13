import React, { useContext } from 'react'
import { SectionsContext } from '../contexts/sections'
import { PagesContext } from '../contexts/pages'
import { FiltersContext } from '../contexts/filters'
import Header from './Header'
import AppSidebar from './AppSidebar'
import NoteSidebar from './NoteSidebar'

import styles from './style/Sidebar.module.scss'

const Sidebar = () => {
  const { sections } = useContext(SectionsContext)
  const { pages, dispatchPages } = useContext(PagesContext)
  const { filters } = useContext(FiltersContext)
  const currentSectionId = filters.section || null
  const currentPageId = filters.page || (pages.length ? pages[0].id : null)
  return (
    <div className={styles.contents}>
      <Header />
      <div className={styles.lists}>
        <AppSidebar
          visibleSections={sections}
          currentSectionId={currentSectionId}
        />
        <NoteSidebar
          pages={pages}
          filters={filters}
          currentSectionId={currentSectionId}
          currentPageId={currentPageId}
          dispatchPages={dispatchPages}
        />
      </div>
    </div>
  )
}
 
export default Sidebar