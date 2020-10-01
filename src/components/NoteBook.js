import React, { useContext, useState } from 'react'
import { NotesContext } from '../contexts/notes'
import { getLastNote } from '../firebase/lastNote'
import NotePage from './NotePage'
import Sidebar from './Sidebar'

import styles from './style/NoteBook.module.scss'

const NoteBook = () => {
  const { notes } = useContext(NotesContext)
  const startNoteId = getLastNote()
  const startNote = startNoteId ? notes.find(note => note.id === startNoteId) : notes[0]
  const [currentNote, setCurrentNote] = useState(startNote)
  return (
    <div className={styles.notebook}>
      <Sidebar currentNote={currentNote} setCurrentNote={setCurrentNote} />
      <NotePage note={currentNote} setCurrentNote={setCurrentNote} />
    </div>
  )
}
 
export default NoteBook
