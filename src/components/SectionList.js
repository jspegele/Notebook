import React, { useContext } from 'react'
import AddSection from './AddSection'
import SectionListItem from './SectionListItem'
import { SectionsContext } from '../contexts/sections'

import styles from './style/SectionList.module.scss'

const SectionList = () => {
  const { sections } = useContext(SectionsContext)
  console.log(sections)
  return (
    <div className={styles.sectionList}>
      <div className={styles.header}>Categories</div>
      <div className={styles.sections}>
        {sections.length > 0 && (
          sections.map(section => (
            <SectionListItem
              key={section.id}
              section={section}
            />
          ))
        )}
      </div>
      <AddSection />
    </div>
  )
}
 
export default SectionList
