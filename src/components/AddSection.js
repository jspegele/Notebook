import React, { useContext, useEffect, useState, useRef, useCallback } from 'react'
import { FiPlus } from 'react-icons/fi'
import { startAddSection } from '../actions/sections'
import { AuthContext } from '../contexts/auth'
import { SectionsContext } from '../contexts/sections'
import { FiltersContext } from '../contexts/filters'

import styles from './style/AddSection.module.scss'

const AddSection = () => {
  const { auth } = useContext(AuthContext)
  const { sections, dispatchSections } = useContext(SectionsContext)
  const { updateFilters } = useContext(FiltersContext)
  const [showTitleInput, setShowTitleInput] = useState(false)
  const [titleInput, setTitleInput] = useState('')
  const [error, setError] = useState('')
  const [sectionAdded, setSectionAdded] = useState(false)
  const inputRef = useRef(null)

  const addSection = useCallback(() => {
    if (!titleInput) {
      setShowTitleInput(false)
    } else if (sections.some(section => section.title.toLowerCase() === titleInput.trim().toLowerCase())) {
      setError('Category already exists.')
    } else {
      setShowTitleInput(false)
      startAddSection(auth.uid, titleInput.trim(), dispatchSections).then(
        () => { setSectionAdded(true) }
      )
      setTitleInput('')
    }
  }, [auth, sections, titleInput, dispatchSections])

  // Save new title if user clicks outside of input field
  useEffect(() => {
    if (showTitleInput) {
      function handleClickOutside(event) {
        if (inputRef.current && !inputRef.current.contains(event.target)) {
          addSection()
        }
      }

      document.addEventListener("mousedown", handleClickOutside)
      return () => {
          document.removeEventListener("mousedown", handleClickOutside)
      }
    }
  }, [inputRef, addSection, showTitleInput])

  // Save new title if user submits form
  const handleSave = e => {
    e.preventDefault()
    addSection()
  }

  useEffect(() => {
    if(sectionAdded) {
      const newSectionId = sections[sections.length - 1].id
      updateFilters({ tab: 'categories', section: newSectionId, page: null })
      setSectionAdded(false)
    }
  }, [sectionAdded, updateFilters, sections])


  if (showTitleInput) {
    return (
      <form className={styles.addForm} onSubmit={handleSave}>
        <input
          type="text"
          ref={inputRef} 
          value={titleInput}
          onChange={e => {
            setTitleInput(e.target.value)
            setError('')
          }}
          autoFocus
        />
        {error && <span className={styles.error}>{error}</span>}
      </form>
    )
  } else {
    return (
      <button
        className={styles.add}
        onClick={() => setShowTitleInput(true)}
      >
        <FiPlus /> Add Category
      </button>
    )
  }
}
 
export default AddSection