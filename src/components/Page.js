import React, { useState, useEffect, useContext, createRef } from 'react'
import { DateTime } from 'luxon'
import { FiCheckCircle, FiRotateCw, FiTrash2 } from 'react-icons/fi'
import { startAddPage, startEditPage, startRemovePage, startSetCurrentPage } from '../actions/notebook'
import { AuthContext } from '../contexts/auth'
import { NotebookContext } from '../contexts/notebook'

import styles from './style/Page.module.scss'
import ConfirmationModal from './ConfirmationModal'

const Page = () => {
  const { auth } = useContext(AuthContext)
  const { notebook, dispatchNotebook, currentSection, currentPage } = useContext(NotebookContext)
  const [title, setTitle] = useState('')
  const [body, setBody] = useState('')
  const [modalOpen, setModalOpen] = useState(false)
  const titleInput = createRef()

  useEffect(() => {
    if(currentPage) {
      setTitle(currentPage.title)
      setBody(currentPage.body)
    }
  }, [currentPage]);

  useEffect(() => {
    if(currentPage.title === '') {
      titleInput.current.focus()
    }
  }, [currentPage.title, titleInput])

  const updateTitle = e => {
    setTitle(e.target.value)
    startEditPage(auth.uid, currentPage.id, { title: e.target.value }, dispatchNotebook)
  }

  const updateBody = e => {
    setBody(e.target.value)
    startEditPage(auth.uid, currentPage.id, { body: e.target.value }, dispatchNotebook)
  }

  const deleteNote = () => {
    const currNoteIndex = notebook.pages.findIndex(el => el.id === currentPage.id)
    const newNoteIndex = currNoteIndex === 0 ? 1 : currNoteIndex - 1
    const newNoteId = !!notebook.pages[newNoteIndex] ? notebook.pages[newNoteIndex].id : ''
    startSetCurrentPage(auth.uid, currentSection.id, newNoteId, dispatchNotebook)
    startRemovePage(auth.uid, currentPage.id, dispatchNotebook)
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
              onClick={() => startAddPage(auth.uid, currentSection.id, dispatchNotebook)}
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
