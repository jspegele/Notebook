import React, { useContext } from 'react'
import { NotebooksContext } from '../contexts/notebooks'
import { SectionsContext } from '../contexts/sections'
import { PagesContext } from '../contexts/pages'
import Header from './Header'
import PageList from './PageList'
import SectionList from './SectionList'

import styles from './style/Sidebar.module.scss'

const Sidebar = () => {
  const { notebooks, currentSectionId } = useContext(NotebooksContext)
  const currentNotebookId = notebooks[0].id  // UPDATE when additional notebeook functionality added
  const { sections, currentPageId } = useContext(SectionsContext)
  const { pages, dispatchPages } = useContext(PagesContext)
  return (
    <div className={styles.contents}>
      <Header />
      <div className={styles.lists}>
        <SectionList
          visibleSections={sections.filter(section => section.notebook === currentNotebookId)}
          currentNotebookId={currentNotebookId}
          currentSectionId={currentSectionId}
        />
        <PageList
          visiblePages={pages.filter(page => page.section === currentSectionId)}
          currentSectionId={currentSectionId}
          currentPageId={currentPageId}
          dispatchPages={dispatchPages}
        />
      </div>
    </div>
  )
}
 
export default Sidebar