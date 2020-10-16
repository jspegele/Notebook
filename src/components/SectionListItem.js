import React, { useEffect, useContext, useState, useRef, useCallback } from 'react'
import PropTypes from 'prop-types'
import Popover from '@material-ui/core/Popover'
import { FiMoreHorizontal, FiFolder, FiEdit2, FiX } from 'react-icons/fi'
import { startEditSection, startRemoveSection } from '../actions/sections'
import { AuthContext } from '../contexts/auth'
import { SettingsContext } from '../contexts/settings'
import { FiltersContext } from '../contexts/filters'
import { SectionsContext } from '../contexts/sections'

import styles from './style/ListItem.module.scss'
import dropdownStyles from './style/Dropdown.module.scss'

const initialState = {
  mouseX: null,
  mouseY: null,
}

const SectionListItem = ({ section }) => {
  const { auth } = useContext(AuthContext)
  const { settings } = useContext(SettingsContext)
  const { sections, dispatchSections } = useContext(SectionsContext)
  const { filters, updateFilters } = useContext(FiltersContext)
  const [showDropdownBtn, setShowDropdownBtn] = useState(false)
  const [dropdownPos, setDropdownPos] = React.useState(initialState)
  const [editableTitle, setEditableTitle] = useState(false)
  const [titleInput, setTitleInput] = useState(section.title || 'Untitled Category')

  const currentSectionId = filters.section || null
  const activeSection = currentSectionId === section.id ? true : false
  const inputRef = useRef(null)

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

  const handleEditTitle = () => {
    setDropdownPos(initialState)
    setShowDropdownBtn(false)
    setEditableTitle(true)
  }

  const saveSection = useCallback(() => {
    setEditableTitle(false)
    setTitleInput(titleInput.trim())
    startEditSection(auth.uid, section.id, { title: titleInput.trim() }, dispatchSections)
  }, [auth, section.id, titleInput, dispatchSections])

  // Save new title if user clicks outside of input field
  useEffect(() => {
    if (editableTitle) {
      function handleClickOutside(event) {
        if (inputRef.current && !inputRef.current.contains(event.target)) {
          saveSection()
        }
      }

      document.addEventListener("mousedown", handleClickOutside)
      return () => {
          document.removeEventListener("mousedown", handleClickOutside)
      }
    }
  }, [inputRef, editableTitle, saveSection])

  // Save new title if user submits form
  const handleSave = e => {
    e.preventDefault()
    saveSection()
  }

  const handleDelete = () => {
    if (sections.length > 1) {
      const currSectionIndex = sections.findIndex(el => el.id === section.id)
      const newSectionIndex = currSectionIndex === 0 ? 1 : currSectionIndex - 1
      const newSectionId = !!sections[newSectionIndex] ? sections[newSectionIndex].id : ''
      if (currentSectionId === section.id) {
        updateFilters({
          section: newSectionId,
          page: sections.filter(el => el.id === newSectionId)[0].currentPage
        })
      }
    } else {
      updateFilters({
        tab: 'all',
        section: null,
        page: null
      })
    }
    startRemoveSection(auth.uid, section.id, dispatchSections)
  }

  const handleSetSection = () => {
    updateFilters({
      section: section.id,
      page: sections.filter(el => el.id === section.id)[0].currentPage,
      tab: 'categories'
    })
  }

  return (
    <>
      <div
        className={activeSection ? styles.activeItem : styles.item}
        onContextMenu={handleContextMenu}
        onMouseEnter={() => setShowDropdownBtn(true)}
        onMouseLeave={() => dropdownPos.mouseY === null && setShowDropdownBtn(false)}
      >
        <div
          className={styles.titleContainer}
          onClick={handleSetSection}
        >
          <div className={styles.title}>
            {editableTitle ? (
              <form onSubmit={handleSave}>
                <input
                  type="text"
                  ref={inputRef} 
                  value={titleInput}
                  onChange={e => setTitleInput(e.target.value)}
                  autoFocus
                />
              </form>
            ) : (
              <>
                <div className={styles.icon}>
                  <FiFolder size="1.2rem" />
                </div>
                <div className={styles.text}>
                  {section.title || "Untitled Category"}
                </div>
              </>
            )}
          </div>
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
        style={{ background: 'none' }}
      >
        <div className={`${settings.theme} ${dropdownStyles.content}`}>
          <div
            className={dropdownStyles.link}
            onClick={handleEditTitle}
          >
            <FiEdit2 size="1.8rem" />Rename Category
          </div>
          <div
            className={`${dropdownStyles.link} ${dropdownStyles.destructive}`}
            onClick={handleDelete}
          >
            <FiX size="1.8rem" />Delete Permanently
          </div>
        </div>
      </Popover>
    </>
  )
}

SectionListItem.propTypes = {
  section: PropTypes.object.isRequired
}
 
export default SectionListItem
