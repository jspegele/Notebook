import React, { useContext, useState } from 'react'
import { NotebookContext } from '../contexts/notebook'
import Page from './Page'
import Sidebar from './Sidebar'

import styles from './style/NoteBook.module.scss'

const NoteBook = () => {
  const { notebook } = useContext(NotebookContext)
  // const startNote = startNoteId ? notes.find(note => note.id === startNoteId) : notes[0]
  // const [currentNote, setCurrentNote] = useState(startNote)
  return (
    <div className={styles.notebook}>
      <Sidebar />
      <Page />
    </div>
  )
}
 
export default NoteBook
