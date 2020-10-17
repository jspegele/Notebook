import React, { useState, useEffect, useContext, createRef } from 'react'
import { DateTime } from 'luxon'
import { FiSave } from 'react-icons/fi'
import { startSetCurrentPage } from '../actions/sections'
import { startAddPage, startEditPage } from '../actions/pages'
import { AuthContext } from '../contexts/auth'
import { SectionsContext } from '../contexts/sections'
import { PagesContext } from '../contexts/pages'
import { FiltersContext } from '../contexts/filters'
import { getVisiblePages } from '../selectors/pages'

import styles from './style/Page.module.scss'

const Page = () => {
  const { auth } = useContext(AuthContext)
  const { dispatchSections } = useContext(SectionsContext)
  const { pages, dispatchPages } = useContext(PagesContext)
  const { filters, updateFilters } = useContext(FiltersContext)
  const visiblePages = getVisiblePages(pages, filters)
  const currentSectionId = filters.section || null
  const currentPageId = filters.page || (
    (filters.tab === 'all' && pages.length) ? visiblePages[0].id : (
      (filters.tab === 'categories' && visiblePages.length ? visiblePages[0].id : null)
    )
  )
  const currentPage = pages.filter(page => page.id === currentPageId)[0]
  const [title, setTitle] = useState('')
  const [body, setBody] = useState('')
  const [pageAdded, setPageAdded] = useState(false)
  const titleInput = createRef()

  useEffect(() => {
    if (currentPage) {
      setTitle(currentPage.title)
      setBody(currentPage.body)
    }
  }, [currentPage]);

  useEffect(() => {
    if (currentPage && currentPage.title === '') {
      titleInput.current.focus()
    }
  }, [currentPage, titleInput])

  useEffect(() => {
    if(pageAdded) {
      const newPageId = pages[pages.length - 1].id
      updateFilters({ page: newPageId })
      startSetCurrentPage(auth.uid, currentSectionId, newPageId, dispatchSections)
      setPageAdded(false)
      
    }
  }, [pageAdded, updateFilters, auth, currentSectionId, pages, dispatchSections])

  const updateTitle = e => {
    setTitle(e.target.value)
    startEditPage(auth.uid, currentPage.id, { title: e.target.value }, dispatchPages)
  }

  const updateBody = e => {
    setBody(e.target.value)
    startEditPage(auth.uid, currentPage.id, { body: e.target.value }, dispatchPages)
  }
  return (
    <section className={styles.notePage}>
      {currentPage ? (
        <>
          <div className={styles.title}>
            <input
              type="text"
              placeholder="Untitled Note"
              value={title}
              onChange={updateTitle}
              ref={titleInput}
            />
          </div>
          <div className={styles.updated}>
            <FiSave size="1.4rem" title="Page Saved to Cloud" />
            Last Saved: {DateTime.fromISO(currentPage.updated).toFormat('cccc, d LLLL y    hh:mm a')}
          </div>
          <textarea
            className={styles.notes}
            value={body}
            onChange={updateBody}
          />
        </>
      ) : (
        <div className={styles.getStarted}>
          <p>
            <button
              onClick={() => startAddPage(auth.uid, currentSectionId, dispatchPages).then(() => { setPageAdded(true) })}
            >
              + Create a Note
            </button>
          </p>
        </div>
      )}
    </section>
  )
}
 
export default Page
