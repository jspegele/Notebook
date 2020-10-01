import React from 'react'
import AddNote from './AddNote'

import styles from './style/SectionList.module.scss'

const SectionList = () => {
  return (
      <div className={styles.sections}>
        <div className={styles.activeSection}>Section 1</div>
        <div className={styles.section}>Section 2</div>
        <div className={styles.section}>Section 3</div>
        <AddNote />
      </div>
  )
}
 
export default SectionList