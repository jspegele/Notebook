import React from 'react'
import { startLogout } from '../actions/auth'

import styles from './style/Header.module.scss'
import notbookIcon from '../images/notebook.png'

const Header = () => {
  return (
    <header className={styles.header}>
      <h1>
        <img className={styles.icon} src={notbookIcon} alt="Notebook" />
        My Notebook
      </h1>
      <button onClick={startLogout}>Logout</button>
    </header>
  )
}
 
export default Header
