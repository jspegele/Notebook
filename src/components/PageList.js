import React, { useContext } from 'react'
import { NotebookContext } from '../contexts/notebook'
import AddPage from './AddPage'
import PageListItem from './PageListItem'

import styles from './style/PageList.module.scss'

const PageList = () => {
  const { notebook, currentSection, currentPage } = useContext(NotebookContext)
  if (notebook.currentNotebook) {
    return (
      <div className={styles.pages}>
        {notebook.pages.length > 0 && (
          notebook.pages.map(page => (
            <PageListItem
              key={page.id}
              id={page.id}
              title={page.title}
              currentSectionId={currentSection.id}
              activePage={currentPage.id === page.id ? true : false}
            />
          ))
        )}
        <AddPage />
      </div>
    )
  } else {
    return <></>
  }
}
 
export default PageList
