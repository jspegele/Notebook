import React from 'react'
import Search from './Search'
import PageListTools from './PageListTools'
import PageList from './PageList'

import styles from './style/PageSidebar.module.scss'

const PageSidebar = ({ pages, filters, currentSectionId, currentPageId, dispatchPages }) => {
  return (
    <div className={styles.container}>
      <Search />
      <PageListTools />
      <PageList
        pages={pages}
        filters={filters}
        currentSectionId={currentSectionId}
        currentPageId={currentPageId}
        dispatchPages={dispatchPages}
      />
    </div>
  )
}
 
export default PageSidebar
