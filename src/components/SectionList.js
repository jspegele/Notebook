import React, { useContext } from 'react'
import { NotebookContext } from '../contexts/notebook'
import AddSection from './AddSection'
import SectionListItem from './SectionListItem'

import styles from './style/SectionList.module.scss'

const SectionList = () => {
  const { notebook, currentSection } = useContext(NotebookContext)
  return (
    <div className={styles.sectionList}>
      <div className={styles.sections}>
        {notebook.sections.length > 0 && (
          notebook.sections.map(section => (
            <SectionListItem
              key={section.id}
              id={section.id}
              title={section.title}
              activeSection={currentSection.id === section.id ? true : false}
            />
          ))
        )}
      </div>
      <AddSection />
    </div>
  )
}
 
export default SectionList
