import React from 'react'
import { FaPenSquare } from 'react-icons/fa'
import { FcGoogle } from 'react-icons/fc'
import { startLogin } from '../actions/auth'

import styles from './style/Login.module.scss'
import demo from '../images/notebook-demo.png'

const Login = () => {
  return (
    <div className={`light ${styles.login}`}>
      <div className={styles.header}>
        <div className={styles.container}>
          <h1><FaPenSquare />Notebook</h1>
          <div className={styles.nav}>
            <button className={styles.gButton} onClick={startLogin}>
              <div className={styles.logo}><FcGoogle /></div>
              <span>Sign in</span>
            </button>
          </div>
        </div>
      </div>
      <div className={styles.mainContent}>
        <div className={styles.container}>
          <h2>A simple and fast app to keep your thoughts organized</h2>
          <div className={styles.subtitle}>Notebook is a free and open-source notes app for the web. Get organized with all your notes in one place.</div>
          <div className={styles.signup}>
            <button className={styles.gButton} onClick={startLogin}>
              <div className={styles.logo}><FcGoogle /></div>
              <span>Sign up with Google</span>
            </button>
          </div>
          <div className={styles.demo}>
            <img src={demo} alt="Sample Notebook" />
          </div>
        </div>
      </div>
      <div className={styles.footer}>
        <div className={styles.container}>
          <div className={styles.logo}>
            <FaPenSquare />
          </div>
          <ul className={styles.nav}>
            <li><a href="https://github.com/jspegele/Notebook">Source</a></li>
            <li><a href="https://github.com/jspegele/Notebook/issues">Issues</a></li>
            <li><a href="https://justinspegele.com">Justin Spegele</a></li>
          </ul>
        </div>
      </div>
    </div>
  )
}
 
export default Login