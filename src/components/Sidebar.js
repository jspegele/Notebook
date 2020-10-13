import React, { useContext } from 'react'
import { SettingsContext } from '../contexts/settings'
import { SectionsContext } from '../contexts/sections'
import { PagesContext } from '../contexts/pages'
import { FiltersContext } from '../contexts/filters'
import { getVisiblePages } from '../selectors/pages'
import AppSidebar from './AppSidebar'
import PageSidebar from './PageSidebar'
import AppToolbar from './AppToolbar'

import styles from './style/Sidebar.module.scss'

const Sidebar = () => {
  const { settings } = useContext(SettingsContext)
  const { sections } = useContext(SectionsContext)
  const { pages, dispatchPages } = useContext(PagesContext)
  const { filters } = useContext(FiltersContext)
  const visiblePages = getVisiblePages(pages, filters)
  const currentSectionId = filters.section || null
  const currentPageId = filters.page || (pages.length ? visiblePages[0].id : null)

  if (settings.sidebar === 'full') {
    return (
      <div className={styles.container}>
        <div className={styles.contents}>
          <div className={styles.lists}>
            <AppSidebar
              settings={settings}
              visibleSections={sections}
              currentSectionId={currentSectionId}
            />
            <PageSidebar
              settings={settings}
              pages={pages}
              filters={filters}
              currentSectionId={currentSectionId}
              currentPageId={currentPageId}
              dispatchPages={dispatchPages}
            />
          </div>
        </div>
      </div>
    )
  } else {
    return (
      <div className={`${styles.container} ${styles.slim}`}>
        <AppToolbar slim={settings.sidebar === 'full' ? false : true} />
      </div>
    )
  }
}
 
export default Sidebar