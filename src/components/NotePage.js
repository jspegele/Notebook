import React, { useState, useEffect, useContext } from 'react'
import { DateTime } from 'luxon'
import { FiCheckCircle, FiRotateCw, FiTrash2 } from 'react-icons/fi'
import { editNote, removeNote } from '../actions/notes'
import { NotesContext } from '../contexts/notes'

import styles from './style/NotePage.module.scss'

const NotePage = ({ note, setCurrentNote }) => {
  const { notes, dispatchNotes } = useContext(NotesContext)
  const [title, setTitle] = useState('')
  const [body, setBody] = useState('')

  useEffect(() => {
    setTitle(note.title)
    setBody(note.body)
  }, [note]);

  const updateTitle = e => {
    setTitle(e.target.value)
    dispatchNotes(editNote(note.id, { title: e.target.value }))
  }

  const updateBody = e => {
    setBody(e.target.value)
    dispatchNotes(editNote(note.id, { body: e.target.value }))
  }

  const deleteNote = () => {
    if (window.confirm("Are you sure you want to delete this note? All data on this will be lost?")) {
      const currNoteIndex = notes.findIndex(el => el.id === note.id)
      const newNoteIndex = currNoteIndex === 0 ? 1 : currNoteIndex - 1
      setCurrentNote(notes[newNoteIndex])
      dispatchNotes(removeNote(note.id))
    }
  }

  return (
    <section className={styles.notePage}>
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
        Last Saved: {DateTime.fromISO(note.lastUpdated).toFormat('cccc, d LLLL y    hh:mm a')}
      </div>
      <textarea
        className={styles.notes}
        value={body}
        onChange={updateBody}
      />
    </section>
  )
}
 
export default NotePage
