import React from 'react'
import database from './firebase/firebase'
import Login from './components/Login'
import NoteBook from './components/NoteBook'
import AuthContextProvider, { AuthContext } from './contexts/auth'
import NotebookContextProvider, { NotebookContext } from './contexts/notebook'
import { setNotebook } from './actions/notebook'

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
                <NotebookContext.Consumer>{NotebookContext => {
                  const { notebook, dispatchNotebook } = NotebookContext

                  //
                  // MOVE THIS TO ACTIONS, USE CALLBACK TO TO DISPATCH (SEE AUTH CONTEXT)
                  //
                  database.ref('users').once('value').then(snapshot => {
                    if (snapshot.hasChild(auth.uid)) {
                      // Load Primary (first) Notebook into context
                      if (notebook.currentNotebook === '') {
                        database.ref(`users/${auth.uid}/`).once('value').then(snapshot => {
                          const data = snapshot.val()
                          
                          const currentNotebook = data.currentNotebook || Object.keys(data.notebooks)[0]
                          const currentSection = data.currentSection || Object.keys(data.sections)[0]
                          const currentPage = data.currentPage || Object.keys(data.pages)[0]

                          // create object for notebook context
                          const notebookObj = {
                            currentNotebook,
                            currentSection,
                            currentPage,
                            sections: [],
                            pages: []
                          }

                          // if section is in current notebook, add to object
                          database.ref(`users/${auth.uid}/sections`).once('value').then(snapshot => {
                            snapshot.forEach(childSnapshot => {
                              if (childSnapshot.val().notebook === currentNotebook) {
                                notebookObj.sections.push({
                                  id: childSnapshot.key,
                                  ...childSnapshot.val()
                                })
                              }
                            })

                            // if page is in current section, add to object
                            database.ref(`users/${auth.uid}/pages`).once('value').then(snapshot => {
                              snapshot.forEach(childSnapshot => {
                                if (childSnapshot.val().section === currentSection) {
                                  notebookObj.pages.push({
                                    id: childSnapshot.key,
                                    ...childSnapshot.val()
                                  })
                                }
                              })

                              dispatchNotebook(setNotebook(notebookObj))
                            })
                          })
                        })
                      }
                    } else {
                      // Create initial notebook for new user
                      database.ref(`users/${auth.uid}/notebooks/`).push({ title: 'My Notebook', default: true }).then(snapshot => {
                        database.ref(`users/${auth.uid}/sections/`).push({ title: 'Personal', notebook: snapshot.key }).then(snapshot => {
                          database.ref(`users/${auth.uid}/pages/`).push({ title: 'Untitled Page', section: snapshot.key })
                        })
                      })
                    }
                  })
                  return (
                    <NoteBook />
                  )
                }}</NotebookContext.Consumer>
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
