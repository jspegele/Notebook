import React, { useState } from 'react'
import { DateTime } from 'luxon'
import AuthContextProvider, { AuthContext } from './contexts/auth'
import FiltersContextProvider from './contexts/filters'
import SectionsContextProvider from './contexts/sections'
import PagesContextProvider from './contexts/pages'
import SettingsContextProvider from './contexts/settings'
import database from './firebase/firebase'
import Login from './components/Login'
import NotebookContainer from './components/NotebookContainer'

import styles from './styles/App.module.scss'
import spinner from './images/spinner.gif'

function App() {
  const [userData, setUserData] = useState(null)
  return (
    <div className="App">
      <AuthContextProvider>
        <AuthContext.Consumer>{authContext => {
          const { auth } = authContext
          // AUTHENTICATED
          if (!!auth.uid) {
            if (userData) {
              console.log(userData)
              return (
                <SettingsContextProvider settings={userData.settings}>
                  <SectionsContextProvider sections={userData.sections && userData.sections}>
                    <PagesContextProvider pages={userData.pages}>
                      <FiltersContextProvider>
                        <NotebookContainer />
                      </FiltersContextProvider>
                    </PagesContextProvider>
                  </SectionsContextProvider>
                </SettingsContextProvider>
              )
            } else {
              // Initialize user
              database.ref(`users/${auth.uid}`).once('value').then(snapshot => {
                if (!snapshot.val()) {
                  const settings = {
                    theme: 'light',
                    sidebar: 'full',
                    defaultSidebar: 'full',
                    defaultSort: 'createdAsc'
                  }
                  const page = {
                    title: '',
                    body: '',
                    created: DateTime.local().toString(),
                    updated: DateTime.local().toString()
                  }
                  const pages = []
                  database.ref(`users/${auth.uid}/settings`).set(settings).then(() => {
                    database.ref(`users/${auth.uid}/pages`).push(page).then(snapshot => {
                      pages.push({
                        id: snapshot.key,
                        ...page
                      })
                      setUserData({
                        settings,
                        sections: [],
                        pages
                      })
                    })
                  })
                } else {
                  const settings = snapshot.val().settings || {}
                  const sections = []
                  const pages = []
                  if (snapshot.val().pages) {
                    for (const [key, page] of Object.entries(snapshot.val().pages)) {
                      pages.push({
                        id: key,
                        ...page
                      })
                    }
                  }
                  if (snapshot.val().sections) {
                    for (const [key, section] of Object.entries(snapshot.val().sections)) {
                      sections.push({
                        id: key,
                        ...section
                      })
                    }
                  }
                  setUserData({
                    settings,
                    sections,
                    pages
                  })
                }
              })
              return (
                <div className={styles.loader}>
                  <div className={styles.loadingImg}><img src={spinner} alt="loading..." /></div>
                  <div className={styles.loadingMsg}>Loading your Notebook...</div>
                </div>
              )
            }
          } 
          // UNUTHENTICATED
          else {
            return <Login />
          }
        }}</AuthContext.Consumer>
      </AuthContextProvider>
    </div>
  )
}

export default App

