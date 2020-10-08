import React, { useContext, useEffect, useState } from 'react'
import { FiPlus } from 'react-icons/fi'
import { startSetCurrentPage } from '../actions/sections'
import { startAddPage } from '../actions/pages'
import { AuthContext } from '../contexts/auth'
import { FiltersContext } from '../contexts/filters'
import { PagesContext } from '../contexts/pages'
import { SectionsContext } from '../contexts/sections'

import styles from './style/AddLink.module.scss'

const AddPage = () => {
  const { auth } = useContext(AuthContext)
  const { filters, updateFilters } = useContext(FiltersContext)
  const currentSectionId = filters.section || null
  const { dispatchSections } = useContext(SectionsContext)
  const { pages, dispatchPages } = useContext(PagesContext)

  const [pageAdded, setPageAdded] = useState(false)

  useEffect(() => {
    if(pageAdded) {
      const newPageId = pages[pages.length - 1].id
      updateFilters({ page: newPageId })
      startSetCurrentPage(auth.uid, currentSectionId, newPageId, dispatchSections)
      setPageAdded(false)
    }
  }, [pageAdded, updateFilters, auth, currentSectionId, pages, dispatchSections])

  const handleAddPage = () => {
    startAddPage(auth.uid, currentSectionId, dispatchPages).then(() => { setPageAdded(true) })
  }
  return (
    <button
      className={styles.add}
      onClick={handleAddPage}
    >
      <FiPlus size="2.4rem"/> Add Page
    </button>
  )
}
 
export default AddPage
