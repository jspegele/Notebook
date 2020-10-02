import React, { useContext } from 'react'
import { startSetCurrentPage } from '../actions/notebook'
import { AuthContext } from '../contexts/auth'
import { NotebookContext } from '../contexts/notebook'

import styles from './style/ListItem.module.scss'

const PageListItem = ({ id, title, currentSectionId, activePage }) => {
  const { auth } = useContext(AuthContext)
  const { dispatchNotebook } = useContext(NotebookContext)
  return (
    <div
      className={activePage ? styles.activeItem : styles.item}
      onClick={() => startSetCurrentPage(auth.uid, currentSectionId, id, dispatchNotebook)}
    >
      {title || 'Untitled Note'}
    </div>
  )
}
 
export default PageListItem
