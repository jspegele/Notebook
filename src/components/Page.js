import React, { useState, useEffect, useContext } from 'react'
import { DateTime } from 'luxon'
import { FiCheckCircle, FiRotateCw, FiTrash2 } from 'react-icons/fi'
import { startEditPage, startRemovePage, startSetCurrentPage } from '../actions/notebook'
import { AuthContext } from '../contexts/auth'
import { NotebookContext } from '../contexts/notebook'

import styles from './style/Page.module.scss'

const Page = () => {
  const { auth } = useContext(AuthContext)
  const { notebook, dispatchNotebook, currentSection, currentPage } = useContext(NotebookContext)
  const [title, setTitle] = useState('')
  const [body, setBody] = useState('')


  useEffect(() => {
    if(notebook.currentNotebook) {
      setTitle(currentPage.title)
      setBody(currentPage.body)
    }
  }, [notebook, currentPage]);

  const updateTitle = e => {
    setTitle(e.target.value)
    startEditPage(auth.uid, currentPage.id, { title: e.target.value }, dispatchNotebook)
  }

  const updateBody = e => {
    setBody(e.target.value)
    startEditPage(auth.uid, currentPage.id, { body: e.target.value }, dispatchNotebook)
  }

  const deleteNote = () => {
    if (window.confirm("Are you sure you want to delete this note? All data on this will be lost?")) {
      const currNoteIndex = notebook.pages.findIndex(el => el.id === currentPage.id)
      const newNoteIndex = currNoteIndex === 0 ? 1 : currNoteIndex - 1
      startSetCurrentPage(auth.uid, currentSection.id, notebook.pages[newNoteIndex].id, dispatchNotebook)
      startRemovePage(auth.uid, currentPage.id, dispatchNotebook)
    }
  }

  return (
    <section className={styles.notePage}>
      {currentPage && (
        <>
          <div className={styles.title}>
            <input
              type="text"
              placeholder="Untitled Note"
              value={title}
              onChange={updateTitle}
            />
            <button className={styles.delete} onClick={deleteNote}><FiTrash2 size="3.2rem"/></button>
          </div>
          <div className={styles.lastUpdated}>
            <FiCheckCircle size="1.4rem" title="Page Saved to Cloud" />
            Last Saved: {DateTime.fromISO(currentPage.lastUpdated).toFormat('cccc, d LLLL y    hh:mm a')}
          </div>
          <textarea
            className={styles.notes}
            value={body}
            onChange={updateBody}
          />
        </>
      )}
    </section>
  )
}
 
export default Page
