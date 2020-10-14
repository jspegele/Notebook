import React from 'react'
import AppNav from './AppNav'
import AppToolbar from './AppToolbar'
import SectionList from './SectionList'

import styles from './style/AppSidebar.module.scss'

const AppSidebar = () => {
  return (
    <div className={styles.sidebar}>
      <AppToolbar />
      <AppNav />
      <SectionList />
    </div>
  )
}
 
export default AppSidebar
