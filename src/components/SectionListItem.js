import React, { useEffect, useContext, useState, useRef, useCallback } from 'react'
import PropTypes from 'prop-types'
import { FiMoreHorizontal, FiFolder, FiEdit2, FiX } from 'react-icons/fi'
import { startEditSection, startRemoveSection } from '../actions/sections'
import { AuthContext } from '../contexts/auth'
import { FiltersContext } from '../contexts/filters'
import { SectionsContext } from '../contexts/sections'

import styles from './style/ListItem.module.scss'
import dropdownStyles from './style/Dropdown.module.scss'

const SectionListItem = ({ section }) => {
  const { auth } = useContext(AuthContext)
  const { sections, dispatchSections } = useContext(SectionsContext)
  const { filters, updateFilters } = useContext(FiltersContext)
  const [showDropdownBtn, setShowDropdownBtn] = useState(false)
  const [showDropdown, setShowDropdown] = useState(false)
  const [editableTitle, setEditableTitle] = useState(false)
  const [titleInput, setTitleInput] = useState(section.title || 'Untitled Category')

  const currentSectionId = filters.section || null
  const activeSection = currentSectionId === section.id ? true : false
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
    setShowDropdownBtn(false)
    setShowDropdown(false)
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
        onMouseLeave={() => !showDropdown && setShowDropdownBtn(false)}
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
    </>
  )
}

SectionListItem.propTypes = {
  section: PropTypes.object.isRequired
}
 
export default SectionListItem
