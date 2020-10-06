import React, { useContext } from 'react'
import PropTypes from 'prop-types'
import { startSetCurrentPage } from '../actions/sections'
import { AuthContext } from '../contexts/auth'
import { SectionsContext } from '../contexts/sections'

import styles from './style/ListItem.module.scss'

const PageListItem = ({ pageId, title, currentSectionId, activePage }) => {
  const { auth } = useContext(AuthContext)
  const { dispatchSections } = useContext(SectionsContext)
  return (
    <div className={activePage ? styles.activeItemContainer : styles.itemContainer}>
      <div
        className={styles.pageItem}
        onClick={() => startSetCurrentPage(auth.uid, currentSectionId, pageId, dispatchSections)}
      >
        {title || 'Untitled Note'}
      </div>
    </div>
  )
}

PageListItem.propTypes = {
  pageId: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  currentSectionId: PropTypes.string.isRequired,
  activePage: PropTypes.bool
}

PageListItem.defaultProps = {
  activePage: false
}
 
export default PageListItem
