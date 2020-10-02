import React from 'react'
import Login from './components/Login'
import Notebook from './components/Notebook'
import AuthContextProvider, { AuthContext } from './contexts/auth'
import NotebookContextProvider from './contexts/notebook'

function App() {
  return (
    <div className="App">
      <AuthContextProvider>
        <AuthContext.Consumer>{authContext => {
          const { auth } = authContext

          if (!!auth.uid) {
            // AUTHENTICATED
            return (
              <NotebookContextProvider>
                <Notebook />
              </NotebookContextProvider>
            )
          } else {
            // UNUTHENTICATED
            return <Login />
          }

        }}</AuthContext.Consumer>
      </AuthContextProvider>
    </div>
  )
}

export default App

