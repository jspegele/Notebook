import React from 'react'
import AppNav from './AppNav'
import AppToolbar from './AppToolbar'
import SectionList from './SectionList'

import styles from './style/AppSidebar.module.scss'

const AppSidebar = ({ settings, visibleSections, currentSectionId }) => {
  return (
    <div className={styles.sidebar}>
      <AppToolbar
        settings={settings}
      />
      <AppNav
        settings={settings}
        currentSectionId={currentSectionId}
      />
      <SectionList
        settings={settings}
        visibleSections={visibleSections}
        currentSectionId={currentSectionId}
      />
    </div>
  )
}
 
export default AppSidebar
