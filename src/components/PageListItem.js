import React, { useEffect, useContext, useState, useRef } from 'react'
import PropTypes from 'prop-types'
import { FiStar, FiFolder, FiFile, FiEdit2, FiX, FiTrash, FiArrowUp } from 'react-icons/fi'
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

const PageListItem = ({ pageId, title, sectionId, favorite, currentSectionId, activePage }) => {
  const { auth } = useContext(AuthContext)
  const { filters, updateFilters } = useContext(FiltersContext)
  const { sections, dispatchSections } = useContext(SectionsContext)
  const { pages, dispatchPages } = useContext(PagesContext)
  const [showDropdownBtn, setShowDropdownBtn] = useState(false)
  const [showDropdown, setShowDropdown] = useState(false)
  const [sectionSelect, setSectionSelect] = useState('default')
  const dropdownWrapperRef = useRef(null)
  const inputRef = useRef(null)

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

  const handleEditTitle = () => {

  }

  const handleSetSection = e => {
    setShowDropdownBtn(false)
    setShowDropdown(false)
    setSectionSelect(e.target.value)
    startAssignSection(auth.uid, pageId, e.target.value, dispatchPages)
  }

  const handleFavorite = () => {
    setShowDropdownBtn(false)
    setShowDropdown(false)
    startSetFavorite(auth.uid, pageId, !favorite, dispatchPages)
  }

  const handleRemoveSection = () => {
    setShowDropdownBtn(false)
    setShowDropdown(false)
    startRemoveSection(auth.uid, pageId, dispatchPages)
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
    const visiblePages = getVisiblePages(pages, filters)
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
        className={activePage ? styles.activeItem : styles.item}
        onContextMenu={handleContextMenu}
        onMouseEnter={() => setShowDropdownBtn(true)}
        onMouseLeave={() => !showDropdown && setShowDropdownBtn(false)}
      >
        <div className={styles.titleContainer}>
          <div
            className={`${styles.title} ${styles.noPadBtm}`}
            onClick={() => handleSetPage(pageId)}
          >
            <div className={styles.icon}>
              {favorite && <FiStar size="1.2rem" />}
            </div>
            <div className={styles.text}>
              {title || 'Untitled Note'}
            </div>
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
        {filters.group === 'trash' ? (
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
              {/* <ConfirmationModal
                modalOpen={modalOpen}
                handleAction={deleteNote}
                handleCloseModal={handleCloseModal}
                messageTxt={`Are you sure you want to permanently delete this note? All of your ${currentPage.title} notes will be deleted and not recoverable.`}
                primaryBtnTxt={'Delete Page'}
                destructive={true}
              /> */}
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
