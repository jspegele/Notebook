import React, { useContext, useState } from 'react'
import { FiEdit2 } from 'react-icons/fi'
import { startSetCurrentSection } from '../actions/notebook'
import { AuthContext } from '../contexts/auth'
import { NotebookContext } from '../contexts/notebook'

import styles from './style/ListItem.module.scss'

const SectionListItem = ({ id, title, activeSection }) => {
  const { auth} = useContext(AuthContext)
  const { notebook, dispatchNotebook } = useContext(NotebookContext)
  const [trayOpen, setTrayOpen] = useState(false)
  return (
    <div
      className={activeSection ? styles.activeItem : styles.item}
      onClick={() => startSetCurrentSection(auth.uid, notebook.currentNotebook, id, dispatchNotebook)}
    >
      {title || "Untitled Section"}
      <button className={styles.edit} onClick={() => setTrayOpen(!trayOpen)}><FiEdit2 size="1.5rem" /></button>
    </div>
  )
}
 
export default SectionListItem
