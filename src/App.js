import React from 'react'
import Login from './components/Login'
import Notebook from './components/Notebook'
import AuthContextProvider, { AuthContext } from './contexts/auth'
import FiltersContextProvider from './contexts/filters'
import SectionsContextProvider from './contexts/sections'
import PagesContextProvider from './contexts/pages'
import SettingsContextProvider from './contexts/settings'

function App() {
  return (
    <div className="App">
      <AuthContextProvider>
        <AuthContext.Consumer>{authContext => {
          const { auth } = authContext

          if (!!auth.uid) {
            // AUTHENTICATED
            return (
              <SettingsContextProvider>
                <SectionsContextProvider>
                  <PagesContextProvider>
                    <FiltersContextProvider>
                      <Notebook />
                      </FiltersContextProvider>
                  </PagesContextProvider>
                </SectionsContextProvider>
              </SettingsContextProvider>
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

