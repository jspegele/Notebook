import React, { createContext, useReducer, useEffect } from 'react'
import { login, logout } from '../actions/auth'
import { firebase } from '../firebase/firebase'
import { authReducer } from '../reducers/auth'

export const AuthContext = createContext()

function onAuthStateChange(callback) {
  return firebase.auth().onAuthStateChanged(user => {
    if (user) {
      callback(login(user.uid))
    } else {
      callback(logout())
    }
  })
}

const AuthContextProvider = props => {
  const [auth, dispatchAuth] = useReducer(authReducer, {})

  useEffect(() => {
    const unsubscribe = onAuthStateChange(dispatchAuth)
    return () => {
      unsubscribe()
    }
  }, [])


  return (
    <AuthContext.Provider value={{ auth }}>
      {props.children}
    </AuthContext.Provider>
  )
}
 
export default AuthContextProvider
