import React, { useContext } from 'react'
import { AuthContext } from '../contexts/auth'
import NoteBook from './NoteBook'
import NotesContextProvider from '../contexts/notes'
import Login from './Login'

const AuthRouter = () => {
  const { auth } = useContext(AuthContext)

  return (
    <div>
      {!!auth.uid ? (
        <NotesContextProvider>
          <NoteBook />
        </NotesContextProvider>
      ) : (
        <Login />
      )}
      
    </div>
  )
}
 
export default AuthRouter