import React from 'react'
import Header from './Header'
import NoteList from './NoteList'
import SectionList from './SectionList'

import styles from './style/Sidebar.module.scss'

const Sidebar = ({ currentNote, setCurrentNote }) => {
  return (
    <div className={styles.contents}>
      <Header />
      <div className={styles.lists}>
        <SectionList />
        <NoteList currentNote={currentNote} setCurrentNote={setCurrentNote} />
      </div>
    </div>
  )
}
 
export default Sidebar