import React from 'react'
import Search from './Search'
import PageListTools from './PageListTools'
import PageList from './PageList'

import styles from './style/PageSidebar.module.scss'

const PageSidebar = () => {
  return (
    <div className={styles.container}>
      <Search />
      <PageListTools />
      <PageList />
    </div>
  )
}
 
export default PageSidebar
