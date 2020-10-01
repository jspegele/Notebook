import React from 'react'
import Login from './components/Login'
import NoteBook from './components/NoteBook'
import AuthContextProvider, { AuthContext } from './contexts/auth'
import NotesContextProvider from './contexts/notes'

function App() {
  return (
    <div className="App">
      <AuthContextProvider>
        <AuthContext.Consumer>{context => {
          const { auth } = context

          if (!!auth.uid) {
            console.log('logged in')
            return (
              <NotesContextProvider>
                <NoteBook />
              </NotesContextProvider>
            )
          } else {
            console.log('logged out')
            return <Login />
          }
        }}</AuthContext.Consumer>
      </AuthContextProvider>
    </div>
  )
}

export default App
