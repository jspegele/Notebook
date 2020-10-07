import React, { useContext } from 'react'
import PropTypes from 'prop-types'
import { startSetCurrentPage } from '../actions/sections'
import { AuthContext } from '../contexts/auth'
import { FiltersContext } from '../contexts/filters'
import { SectionsContext } from '../contexts/sections'

import styles from './style/ListItem.module.scss'

const PageListItem = ({ pageId, title, currentSectionId, activePage }) => {
  const { auth } = useContext(AuthContext)
  const { updateFilters } = useContext(FiltersContext)
  const { dispatchSections } = useContext(SectionsContext)
  const handleSetPage = () => {
    updateFilters({ page: pageId })
    startSetCurrentPage(auth.uid, currentSectionId, pageId, dispatchSections)
  }
  return (
    <div className={activePage ? styles.activeItemContainer : styles.itemContainer}>
      <div
        className={styles.pageItem}
        onClick={handleSetPage}
      >
        {title || 'Untitled Note'}
      </div>
    </div>
  )
}

PageListItem.propTypes = {
  pageId: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  currentSectionId: PropTypes.string,
  activePage: PropTypes.bool
}

PageListItem.defaultProps = {
  activePage: false,
  currentSectionId: ''
}
 
export default PageListItem
