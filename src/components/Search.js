import React, { useContext, useState } from 'react'
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

  const handleSearch = e => {
    setText(e.target.value)
    updateFilters({ text: e.target.value })
  }
  return (
    <div className={styles.container}>
      <input
        type="text"
        placeholder={`Search ${placeholderText}`}
        className={styles.search}
        value={text}
        onChange={handleSearch}
      />
      <div className={styles.message}>
        {text && `showing results from ${placeholderText}`}
      </div>
    </div>
  )
}
 
export default Search