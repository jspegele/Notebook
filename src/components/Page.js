import React, { useState, useEffect, useContext } from 'react'
import { DateTime } from 'luxon'
import { FiCheckCircle, FiRotateCw, FiTrash2 } from 'react-icons/fi'
import { startEditPage, startRemovePage } from '../actions/notebook'
import { AuthContext } from '../contexts/auth'
import { NotebookContext } from '../contexts/notebook'

import styles from './style/Page.module.scss'

const Page = () => {
  const { auth } = useContext(AuthContext)
  const { notebook, dispatchNotebook } = useContext(NotebookContext)
  const currentNote = notebook.pages.find(note => note.id === notebook.currentPage)
  const [title, setTitle] = useState('')
  const [body, setBody] = useState('')


  useEffect(() => {
    if(notebook.currentPage) {
      setTitle(currentNote.title)
      setBody(currentNote.body)
    }
  }, [notebook, currentNote]);

  const updateTitle = e => {
    setTitle(e.target.value)
    startEditPage(auth.uid, notebook.currentPage, { title: e.target.value }, dispatchNotebook)
  }

  const updateBody = e => {
    setBody(e.target.value)
    startEditPage(auth.uid, notebook.currentPage, { body: e.target.value }, dispatchNotebook)
  }

  const deleteNote = () => {
    if (window.confirm("Are you sure you want to delete this note? All data on this will be lost?")) {
      const currNoteIndex = notebook.findIndex(el => el.id === notebook.currentPage)
      const newNoteIndex = currNoteIndex === 0 ? 1 : currNoteIndex - 1
      // setCurrentNote(notebook[newNoteIndex])
      // dispatchNotebook(removeNote(notebook.currentPage))
    }
  }

  return (
    <section className={styles.notePage}>
      {currentNote && (
        <>
          <div className={styles.title}>
            <input
              type="text"
              placeholder="Untitled Note"
              value={currentNote.title}
              onChange={updateTitle}
            />
            <button className={styles.delete} onClick={deleteNote}><FiTrash2 size="3.2rem"/></button>
          </div>
          <div className={styles.lastUpdated}>
            <FiCheckCircle size="1.4rem" title="Page Saved to Cloud" />
            Last Saved: {DateTime.fromISO(currentNote.lastUpdated).toFormat('cccc, d LLLL y    hh:mm a')}
          </div>
          <textarea
            className={styles.notes}
            value={currentNote.body}
            onChange={updateBody}
          />
        </>
      )}
    </section>
  )
}
 
export default Page
