import React from 'react'
import { setLastNote } from '../firebase/lastNote'

import styles from './style/NoteDetails.module.scss'

const NoteDetails = ({ note, currentNote, setCurrentNote }) => {
  const changeNote = () => {
    setLastNote(note.id)
    setCurrentNote(note)
  }
  const className = currentNote.id === note.id ? styles.activePage : styles.page
  return (
    <div
      className={className}
      onClick={changeNote}
    >
      {note.title || 'Untitled Note'}
    </div>
  )
}
 
export default NoteDetails
