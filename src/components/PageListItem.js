import React, { useEffect, useContext, useState, useRef } from 'react'
import PropTypes from 'prop-types'
import { FiStar, FiFolder, FiFile, FiX, FiTrash, FiArrowUp } from 'react-icons/fi'
import { FiMoreHorizontal } from 'react-icons/fi'
import { startSetCurrentPage } from '../actions/sections'
import { startRemovePage, startRestoreTrash, startSetFavorite, startRemoveSection, startSetTrash, startAssignSection } from '../actions/pages'
import { AuthContext } from '../contexts/auth'
import { SectionsContext } from '../contexts/sections'
import { PagesContext } from '../contexts/pages'
import { FiltersContext } from '../contexts/filters'
import { getVisiblePages } from '../selectors/pages'

import styles from './style/ListItem.module.scss'
import dropdownStyles from './style/Dropdown.module.scss'

const PageListItem = ({ pageId }) => {
  const { auth } = useContext(AuthContext)
  const { filters, updateFilters } = useContext(FiltersContext)
  const { sections, dispatchSections } = useContext(SectionsContext)
  const { pages, dispatchPages } = useContext(PagesContext)
  const [showDropdownBtn, setShowDropdownBtn] = useState(false)
  const [showDropdown, setShowDropdown] = useState(false)
  const [sectionSelect, setSectionSelect] = useState('default')
  const dropdownWrapperRef = useRef(null)
  
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
    setShowDropdown(true)
  }

  // Close dropdown if user clicks outside of it
  useEffect(() => {
    if (showDropdown) {
      function handleClickOutside(event) {
        if (dropdownWrapperRef.current && !dropdownWrapperRef.current.contains(event.target)) {
          setShowDropdownBtn(false)
          setShowDropdown(false)
        }
      }

      document.addEventListener("mousedown", handleClickOutside)
      return () => {
          document.removeEventListener("mousedown", handleClickOutside)
      }
    }
  }, [dropdownWrapperRef, showDropdown])

  const handleSetSection = e => {
    setShowDropdownBtn(false)
    setShowDropdown(false)
    setSectionSelect(e.target.value)

    // UPDATE FILTERS IF REMOVING FROM SELECTED SECTION
    const pagesInSection = pages.filter(page => page.section === sectionId)
    const currentSection = sections.find(section => section.id === sectionId)
    if (filters.section === sectionId) {
      if (pagesInSection.length === 1) {
        updateFilters({ page: null })
      } else if (currentSection.currentPage === pageId) {
        const newCurrentPage = pagesInSection[0].id === pageId ? pagesInSection[1].id : pagesInSection[0].id
        updateFilters({ page: newCurrentPage })
      }
    }
    
    const newSection = sections.find(section => section.id === e.target.value)
    if (!newSection.currentPage) startSetCurrentPage(auth.uid, newSection.id, pageId, dispatchSections)
    startAssignSection(auth.uid, pageId, e.target.value, dispatchPages)
  }

  const handleRemoveSection = () => {
    setShowDropdownBtn(false)
    setShowDropdown(false)
    const pagesInSection = pages.filter(page => page.section === sectionId)
    const currentSection = sections.find(section => section.id === sectionId)
    if (pagesInSection.length === 1) {
      if (filters.section === sectionId) updateFilters({ page: null })
      startSetCurrentPage(auth.uid, sectionId, null, dispatchSections)
    } else if (currentSection.currentPage === pageId) {
      const newCurrentPage = pagesInSection[0].id === pageId ? pagesInSection[1].id : pagesInSection[0].id
      if (filters.section === sectionId) updateFilters({ page: newCurrentPage })
      startSetCurrentPage(auth.uid, sectionId, newCurrentPage, dispatchSections)
    }
    startRemoveSection(auth.uid, pageId, dispatchPages)
  }

  const handleFavorite = () => {
    setShowDropdownBtn(false)
    setShowDropdown(false)
    startSetFavorite(auth.uid, pageId, !favorite, dispatchPages)
  }

  const handleTrash = () => {
    if (pageId === filters.page) handleSetPage(getNewNoteId())
    startSetTrash(auth.uid, pageId, dispatchPages)
  }

  const handleRestore = () => {
    if (pageId === filters.page) handleSetPage(getNewNoteId())
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
        onMouseLeave={() => !showDropdown && setShowDropdownBtn(false)}
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
            onClick={() => setShowDropdown(true)}
          >
            <FiMoreHorizontal style={{ width: '1.6rem'}} />
          </div>
        )}
      </div>
      {/* Dropdown */}
      <div 
        className={showDropdown ? (
          `${dropdownStyles.content} ${dropdownStyles.showDropdown}`
        ) : (
          dropdownStyles.content
        )}
        style={{ marginLeft: '1rem' }}
        ref={dropdownWrapperRef}
      >
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
    </>
  )
}

PageListItem.propTypes = {
  pageId: PropTypes.string.isRequired
}
 
export default PageListItem
