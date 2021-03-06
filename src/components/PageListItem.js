import React, { useContext, useState } from 'react'
import PropTypes from 'prop-types'
import Popover from '@material-ui/core/Popover'
import { FiStar, FiFolder, FiFile, FiX, FiTrash, FiArrowUp } from 'react-icons/fi'
import { FiMoreHorizontal } from 'react-icons/fi'
import { startSetCurrentPage } from '../actions/sections'
import { startRemovePage, startRestoreTrash, startSetFavorite, startRemoveSection, startSetTrash, startAssignSection } from '../actions/pages'
import { AuthContext } from '../contexts/auth'
import { SettingsContext } from '../contexts/settings'
import { SectionsContext } from '../contexts/sections'
import { PagesContext } from '../contexts/pages'
import { FiltersContext } from '../contexts/filters'
import { getVisiblePages } from '../selectors/pages'

import styles from './style/ListItem.module.scss'
import dropdownStyles from './style/Dropdown.module.scss'

const initialState = {
  mouseX: null,
  mouseY: null,
}

const PageListItem = ({ pageId }) => {
  const { auth } = useContext(AuthContext)
  const { settings } = useContext(SettingsContext)
  const { sections, dispatchSections } = useContext(SectionsContext)
  const { pages, dispatchPages } = useContext(PagesContext)
  const { filters, updateFilters } = useContext(FiltersContext)
  const [showDropdownBtn, setShowDropdownBtn] = useState(false)
  const [dropdownPos, setDropdownPos] = React.useState(initialState)
  const [sectionSelect, setSectionSelect] = useState('default')
  
  const visiblePages = getVisiblePages(pages, filters)
  const thisPage = pages.find(page => page.id === pageId)
  const title = thisPage.title
  const sectionId = thisPage.section
  const favorite = thisPage.favorite
  const currentSectionId = filters.section || null
  const currentPageId = filters.page || (visiblePages.length ? visiblePages[0].id : null)
  const activePage = pageId === currentPageId ? true : false

  const handleContextMenu = e => {
    e.preventDefault()
    setDropdownPos({
      mouseX: e.clientX - 2,
      mouseY: e.clientY - 4,
    })
  }

  const handleCloseContextMenu = () => {
    setDropdownPos(initialState)
    setShowDropdownBtn(false)
  }

  const handleSetSection = e => {
    setDropdownPos(initialState)
    setShowDropdownBtn(false)
    setSectionSelect(e.target.value)
    
    // Set a new currentPage if this page is the currentPage for its current section
    const pagesInSection = pages.filter(page => (page.section === sectionId && !page.trash))
    const currentSection = sections.find(section => section.id === sectionId)
    if (sectionId) {
      if (currentSection.currentPage === pageId) {
        if (pagesInSection.length === 1) {
          startSetCurrentPage(auth.uid, sectionId, null, dispatchSections)
          if (filters.section) {
            updateFilters({ page: null })
          }
        } else {
          const newCurrentPage = getNewNoteId()
          startSetCurrentPage(auth.uid, sectionId, newCurrentPage, dispatchSections)
          if (filters.section) {
            updateFilters({ page: newCurrentPage })
          }
        }
      }
    } else {
      if (pageId === filters.page) handleSetPage(getNewNoteId())
    }
    
    // Set this page as currentPage if new section does not have one
    const newSectionId = e.target.value
    const newSection = sections.find(section => section.id === newSectionId)
    if (!newSection.currentPage) startSetCurrentPage(auth.uid, newSectionId, pageId, dispatchSections)

    // Set new section for this page
    startAssignSection(auth.uid, pageId, newSectionId, dispatchPages)
  }

  const handleRemoveSection = () => {
    setShowDropdownBtn(false)

    // Set a new currentPage if this page is the currentPage for its current section 
    const pagesInSection = pages.filter(page => (page.section === sectionId && !page.trash))
    const currentSection = sections.find(section => section.id === sectionId)
    if (pagesInSection.length === 1) {
      if (filters.section === sectionId) updateFilters({ page: null })
      startSetCurrentPage(auth.uid, sectionId, null, dispatchSections)
    } else if (currentSection.currentPage === pageId) {
      const newCurrentPage = getNewNoteId()
      if (filters.section === sectionId) updateFilters({ page: newCurrentPage })
      startSetCurrentPage(auth.uid, sectionId, newCurrentPage, dispatchSections)
    }

    // Remove section from this page
    startRemoveSection(auth.uid, pageId, dispatchPages)
  }

  const handleFavorite = () => {
    setDropdownPos(initialState)
    setShowDropdownBtn(false)

    // Change page in focus if in favorites tab and this page is the current page
    if (filters.tab === 'favorites' && filters.page === pageId) updateFilters({ page: getNewNoteId() })
    
    startSetFavorite(auth.uid, pageId, !favorite, dispatchPages)
  }

  const handleTrash = () => {
    if (pageId === filters.page) handleSetPage(getNewNoteId())

    // Set a sections currentPage to null if this page is its currentPage
    const currentSection = sections.find(section => section.id === sectionId)
    if (currentSection.currentPage === pageId) {
      startSetCurrentPage(auth.uid, sectionId, null, dispatchSections)
    }

    startSetTrash(auth.uid, pageId, dispatchPages)
  }

  const handleRestore = () => {
    if (pageId === filters.page) handleSetPage(getNewNoteId())

    // Set this page as its sections currentPage if section does not have one already
    if (thisPage.section && !pages.filter(page => (page.section === thisPage.section && !page.trash)).length) {
      startSetCurrentPage(auth.uid, sectionId, pageId, dispatchSections)
    }

    startRestoreTrash(auth.uid, pageId, dispatchPages)
  }

  const handlePermanentlyDelete = () => {
    if (pageId === filters.page) handleSetPage(getNewNoteId())
    startRemovePage(auth.uid, pageId, dispatchPages)
  }

  const getNewNoteId = () => {
    const currNoteIndex = visiblePages.findIndex(el => el.id === pageId)
    const newNoteIndex = currNoteIndex === 0 ? 1 : currNoteIndex - 1
    const newPageId = !!visiblePages[newNoteIndex] ? visiblePages[newNoteIndex].id : null
    return newPageId
  }

  const handleSetPage = newPageId => {
    updateFilters({ page: newPageId })
    startSetCurrentPage(auth.uid, currentSectionId, newPageId, dispatchSections)
  }

  return (
    <>
      <div
        className={`${activePage ? styles.activeItem : styles.item} ${styles.borderbtm}`}
        onContextMenu={handleContextMenu}
        onMouseEnter={() => setShowDropdownBtn(true)}
        onMouseLeave={() => dropdownPos.mouseY === null && setShowDropdownBtn(false)}
      >
        <div
          onClick={() => handleSetPage(pageId)}
          className={filters.tab !== 'categories' ? styles.titleContainer : `${styles.titleContainer} ${styles.xlpad}`}
        >
          <div className={styles.title}>
            <div className={styles.icon}>
              {favorite && <FiStar size="1.2rem" />}
            </div>
            <div className={`${styles.text} ${styles.textWide}`}>
              {title || 'Untitled Note'}
            </div>
          </div>
          {filters.tab !== 'categories' && (
            <div className={styles.category}>
              {sectionId ? (
                <>
                  {sections.filter(section => section.id === sectionId).length ? (
                    <>
                      <FiFolder size="1.2rem" />
                      {sections.filter(section => section.id === sectionId)[0].title}
                    </>
                  ) : ''}
                </>
              ) : (
                <>
                  <FiFile size="1.2rem" />
                  Notes
                </>
              )}
            </div>
          )}
        </div>
        {showDropdownBtn && (
          <div
            className={styles.menu}
            onClick={handleContextMenu}
          >
            <FiMoreHorizontal style={{ width: '1.6rem'}} />
          </div>
        )}
      </div>
      {/* Context Menu */}
      <Popover
        open={dropdownPos.mouseY !== null}
        onClose={handleCloseContextMenu}
        anchorReference="anchorPosition"
        anchorPosition={
          dropdownPos.mouseY !== null && dropdownPos.mouseX !== null
            ? { top: dropdownPos.mouseY, left: dropdownPos.mouseX }
            : undefined
        }
      >
        <div className={`${settings.theme} ${dropdownStyles.content}`}>
          {/* Manage section */}
          <div className={dropdownStyles.item}>
            <select
              className={dropdownStyles.select}
              value={sectionSelect}
              onChange={handleSetSection}
            >
              <option value='default' disabled>
                {sectionId ? 'Move to category' : 'Assign a category'}
              </option>
              {sections.map(section => {
                if (section.id !== sectionId) {
                  return (
                    <option
                      key={section.id}
                      value={section.id}
                    >
                      {section.title}
                    </option>
                  )
                } else {
                  return null
                }
              })}
            </select>
          </div>
          {/* Remove section */}
          {sectionId && (
            <div
              className={dropdownStyles.link}
              onClick={handleRemoveSection}
            >
              <FiX size="1.8rem" />Remove from category
            </div>
          )}
          {/* Toggle favorite */}
          <div
            className={dropdownStyles.link}
            onClick={handleFavorite}
          >
            <FiStar size="1.8rem" />
            {favorite ? 'Remove Favorite' : 'Mark as Favorite'}
          </div>
          {/* Trash options */}
          {filters.tab === 'trash' ? (
            <>
              {/* Restore */}
              <div
                className={dropdownStyles.link}
                onClick={handleRestore}
              >
                <FiArrowUp size="1.8rem" />Restore from trash
              </div>
              {/* Delete */}
              <div
                className={`${dropdownStyles.link} ${dropdownStyles.destructive}`}
                onClick={handlePermanentlyDelete}
              >
                <FiX size="1.8rem" />Permanently delete
              </div>
            </>
          ) : (
            // Trash
            <div
              className={`${dropdownStyles.link} ${dropdownStyles.destructive}`}
              onClick={handleTrash}
            >
              <FiTrash size="1.8rem" />Move to trash
            </div>
          )}
        </div>
      </Popover>
    </>
  )
}

PageListItem.propTypes = {
  pageId: PropTypes.string.isRequired
}
 
export default PageListItem
