import React, { useState, useEffect, useContext, createRef } from 'react'
import { DateTime } from 'luxon'
import { FiCheckCircle, FiRotateCw, FiTrash2 } from 'react-icons/fi'
import { startSetCurrentPage } from '../actions/sections'
import { startAddPage, startEditPage, startRemovePage } from '../actions/pages'
import { AuthContext } from '../contexts/auth'
// import { NotebooksContext } from '../contexts/notebooks'
import { SectionsContext } from '../contexts/sections'
import { PagesContext } from '../contexts/pages'
import { FiltersContext } from '../contexts/filters'

import styles from './style/Page.module.scss'
import ConfirmationModal from './ConfirmationModal'

const Page = () => {
  const { auth } = useContext(AuthContext)
  // const { currentSectionId } = useContext(NotebooksContext)
  const { dispatchSections } = useContext(SectionsContext)
  const { pages, dispatchPages } = useContext(PagesContext)
  const { filters, updateFilters } = useContext(FiltersContext)
  const currentSectionId = filters.section || null
  const currentPageId = filters.page || (currentSectionId ? null : pages.length ? pages[0].id : null)
  const currentPage = pages.filter(page => page.id === currentPageId)[0]
  const [title, setTitle] = useState('')
  const [body, setBody] = useState('')
  const [modalOpen, setModalOpen] = useState(false)
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

  const deleteNote = () => {
    const visiblePages = currentSectionId ? (
      pages.filter(page => page.section === currentSectionId)
    ) : (
      pages
    )
    const currNoteIndex = visiblePages.findIndex(el => el.id === currentPage.id)
    const newNoteIndex = currNoteIndex === 0 ? 1 : currNoteIndex - 1
    const newPageId = !!visiblePages[newNoteIndex] ? visiblePages[newNoteIndex].id : ''
    updateFilters({ page: newPageId })
    startSetCurrentPage(auth.uid, currentSectionId, newPageId, dispatchSections)
    startRemovePage(auth.uid, currentPage.id, dispatchPages)
    handleCloseModal()
  }

  const handleCloseModal = () => {
    setModalOpen(false)
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
            <button className={styles.delete} onClick={() => setModalOpen(true)}><FiTrash2 size="3.2rem"/></button>
            <ConfirmationModal
              modalOpen={modalOpen}
              handleAction={deleteNote}
              handleCloseModal={handleCloseModal}
              messageTxt={`Are you sure you want to delete this notes page? All of your ${currentPage.title} notes will be deleted and not recoverable.`}
              primaryBtnTxt={'Delete Page'}
              destructive={true}
            />
          </div>
          <div className={styles.updated}>
            <FiCheckCircle size="1.4rem" title="Page Saved to Cloud" />
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
          <h2>There aren't any pages in this section.</h2>
          <p>
            <button
              onClick={() => startAddPage(auth.uid, currentSectionId, dispatchPages).then(() => { setPageAdded(true) })}
            >
              + Add a page
            </button>
            to start taking notes.
          </p>
        </div>
      )}
    </section>
  )
}
 
export default Page
