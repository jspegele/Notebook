import React, { useContext } from 'react'
import { FiPlus } from 'react-icons/fi'
import { addNote } from '../actions/notes'
import { NotesContext } from '../contexts/notes'

import styles from './style/AddNote.module.scss'

const AddNote = () => {
  const { dispatchNotes } = useContext(NotesContext)
  return (
    <button
      className={styles.add}
      onClick={() => dispatchNotes(addNote())}
    >
      <FiPlus size="2.4rem"/> Add Note
    </button>
  )
}
 
export default AddNote