import React from 'react'
import Search from './Search'
import PageList from './PageList'

import styles from './style/NoteSidebar.module.scss'

const NoteSidebar = ({ pages, filters, currentSectionId, currentPageId, dispatchPages }) => {
  return (
    <div className={styles.container}>
      <Search />
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
 
export default NoteSidebar
