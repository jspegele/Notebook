import React from 'react'
import Header from './Header'
import PageList from './PageList'
import SectionList from './SectionList'

import styles from './style/Sidebar.module.scss'

const Sidebar = () => {
  return (
    <div className={styles.contents}>
      <Header />
      <div className={styles.lists}>
        <SectionList />
        <PageList />
      </div>
    </div>
  )
}
 
export default Sidebar