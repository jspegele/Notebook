import React, { useContext, useState } from 'react'
import { FiX } from 'react-icons/fi'
import { SectionsContext } from '../contexts/sections'
import { FiltersContext } from '../contexts/filters'

import styles from './style/Search.module.scss'

const Search = () => {
  const { sections } = useContext(SectionsContext)
  const { filters, updateFilters } = useContext(FiltersContext)
  const [text, setText] = useState('')
  const placeholderText = filters.tab === 'all' ? 'all notes' : (
    filters.tab === 'categories' ? sections.find(section => section.id === filters.section).title : (
      filters.tab
    )
  )

  const handleSearch = (text) => {
    setText(text)
    updateFilters({ text })
  }
  return (
    <div className={styles.container}>
      <div className={styles.searchField}>
        <input
          type="text"
          placeholder={`Search ${placeholderText}`}
          className={styles.search}
          value={text}
          onChange={e => handleSearch(e.target.value)}
        />
        {text && (
          <button
            title="clear search"
            onClick={() => handleSearch('')}
          >
            <FiX size="1.6rem"/>
          </button>
        )}
      </div>
    </div>
  )
}
 
export default Search