import React from 'react'
import Login from './components/Login'
import Notebook from './components/Notebook'
import AuthContextProvider, { AuthContext } from './contexts/auth'
import NotebooksContextProvider from './contexts/notebooks'
import SectionsContextProvider from './contexts/sections'
import PagesContextProvider from './contexts/pages'

function App() {
  return (
    <div className="App">
      <AuthContextProvider>
        <AuthContext.Consumer>{authContext => {
          const { auth } = authContext

          if (!!auth.uid) {
            // AUTHENTICATED
            return (
              <NotebooksContextProvider>
                <SectionsContextProvider>
                  <PagesContextProvider>
                    <Notebook />
                  </PagesContextProvider>
                </SectionsContextProvider>
              </NotebooksContextProvider>
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

