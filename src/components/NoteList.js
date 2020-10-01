import React, { useContext } from 'react'
import { NotesContext } from '../contexts/notes'
import AddNote from './AddNote'
import NoteDetails from './NoteDetails'

import styles from './style/NoteList.module.scss'

const NoteList = ({ currentNote, setCurrentNote }) => {
  const { notes } = useContext(NotesContext)
  return (
    <div className={styles.pages}>
      {notes.length ? (
        notes.map(note => (
          <NoteDetails
            key={note.id}
            note={note}
            currentNote={currentNote}
            setCurrentNote={setCurrentNote}
          />
        ))
      ) : (
        <p>Create a new note to get started</p>
      )}
      <AddNote />
    </div>
  )
}
 
export default NoteList
