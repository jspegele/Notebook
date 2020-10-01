import React from 'react'
import { startLogin } from '../actions/auth'

import styles from './style/Login.module.scss'

const Login = () => {
  return (
    <div className={styles.loginWrapper}>
      <button onClick={startLogin}>Login with Google</button>
    </div>
  )
}
 
export default Login