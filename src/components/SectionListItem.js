import React, { useContext } from 'react'
import { startSetCurrentSection } from '../actions/notebook'
import { AuthContext } from '../contexts/auth'
import { NotebookContext } from '../contexts/notebook'

import styles from './style/ListItem.module.scss'

const SectionListItem = ({ id, title, activeSection }) => {
  const { auth} = useContext(AuthContext)
  const { notebook, dispatchNotebook } = useContext(NotebookContext)
  return (
    <div
      className={activeSection ? styles.activeItem : styles.item}
      onClick={() => startSetCurrentSection(auth.uid, notebook.currentNotebook, id, dispatchNotebook)}
    >
      {title}
    </div>)
}
 
export default SectionListItem
