import React, { useContext } from 'react'
import PropTypes from 'prop-types'
import { startSetCurrentSection } from '../actions/notebooks'
import { AuthContext } from '../contexts/auth'
import { NotebooksContext } from '../contexts/notebooks'

import styles from './style/ListItem.module.scss'

const SectionListItem = ({ sectionId, title, currentNotebookId, activeSection }) => {
  const { auth} = useContext(AuthContext)
  const { dispatchNotebooks } = useContext(NotebooksContext)
  return (
    <div className={activeSection ? styles.activeItemContainer : styles.itemContainer}>
      <div
        className={styles.item}
        onClick={() => startSetCurrentSection(auth.uid, currentNotebookId, sectionId, dispatchNotebooks)}
      >
        {title || "Untitled Section"}
      </div>
    </div>
  )
}

SectionListItem.propTypes = {
  sectionId: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  currentNotebookId: PropTypes.string.isRequired,
  activeSection: PropTypes.bool
}

SectionListItem.defaultProps = {
  activeSection: false
}
 
export default SectionListItem
