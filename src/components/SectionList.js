import React from 'react'
import PropTypes from 'prop-types'
import AddSection from './AddSection'
import SectionListItem from './SectionListItem'

import styles from './style/SectionList.module.scss'

const SectionList = ({ visibleSections, currentNotebookId, currentSectionId }) => {
  return (
    <div className={styles.sectionList}>
      <div className={styles.visibleSections}>
        {visibleSections.length > 0 && (
          visibleSections.map(section => (
            <SectionListItem
              key={section.id}
              sectionId={section.id}
              title={section.title}
              currentNotebookId={currentNotebookId}
              activeSection={currentSectionId === section.id ? true : false}
            />
          ))
        )}
      </div>
      <AddSection />
    </div>
  )
}

SectionList.propTypes = {
  visibleSections: PropTypes.array,
  currentSectionId: PropTypes.string
}

SectionList.defaultProps = {
  visibleSections: [],
  currentSectionId: ''
}
 
export default SectionList
