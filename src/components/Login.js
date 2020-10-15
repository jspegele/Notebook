import React from 'react'
import { startLogin } from '../actions/auth'

const Login = () => {
  return (
    <div>
      <button onClick={startLogin}>Login with Google</button>
    </div>
  )
}
 
export default Login