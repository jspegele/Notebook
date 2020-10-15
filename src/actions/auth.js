import { firebase, googleAuthProvider } from '../firebase/firebase'

export const login = user => ({
  type: 'LOGIN',
  payload: {
    ...user
  }
})

export const startLogin = () => {
  firebase.auth().signInWithPopup(googleAuthProvider)
}

export const logout = () => ({
  type: 'LOGOUT'
})

export const startLogout = () => {
  firebase.auth().signOut()
}
