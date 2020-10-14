import React, { useContext } from 'react'
import AddPage from './AddPage'
import PageListItem from './PageListItem'
import { PagesContext } from '../contexts/pages'
import { FiltersContext } from '../contexts/filters'
import { getVisiblePages } from '../selectors/pages'

import styles from './style/PageList.module.scss'

const PageList = () => {
  const { pages } = useContext(PagesContext)
  const { filters } = useContext(FiltersContext)
  const visiblePages = getVisiblePages(pages, filters)
  return (
    <div className={styles.pageList}>
      {visiblePages.length ? (
        <div className={styles.pages}>
          {visiblePages.length > 0 && (
            visiblePages.map(page => (
              <PageListItem
                key={page.id}
                pageId={page.id}
              />
            ))
          )}
        </div>
      ) : (
        <></>
      )}
      <AddPage />
    </div>
  )
}
 
export default PageList
