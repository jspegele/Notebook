import React, { useContext } from 'react'
import { SectionsContext } from '../contexts/sections'
import { PagesContext } from '../contexts/pages'
import { FiltersContext } from '../contexts/filters'
import Header from './Header'
import PageList from './PageList'

import styles from './style/Sidebar.module.scss'
import AppSidebar from './AppSidebar'

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
        <PageList
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