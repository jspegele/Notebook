import database from '../firebase/firebase'

export const setNotebook = notebook => ({
  type: 'SET_NOTEBOOK',
  payload: {
    notebook
  }
})

export const startSetNotebook = (uid, callback) => {
  database.ref('users').once('value').then(snapshot => {
    if (snapshot.hasChild(uid)) {
      // Load Primary (first) Notebook into context
      database.ref(`users/${uid}/`).once('value').then(snapshot => {
        const data = snapshot.val()
        
        const currentNotebookId = data.currentNotebook || Object.keys(data.notebooks)[0]
        const currentSectionId =  data.notebooks[currentNotebookId].currentSection || Object.keys(data.sections)[0]

        // create object for notebook context
        const notebookObj = {
          currentNotebook: currentNotebookId,
          notebooks: [],
          sections: [],
          pages: []
        }

        // add notebooks to object
        database.ref(`users/${uid}/notebooks`).once('value').then(snapshot => {
          snapshot.forEach(childSnapshot => {
            notebookObj.notebooks.push({
              id: childSnapshot.key,
              ...childSnapshot.val()
            })
          })

          // if section is in current notebook, add to object
          database.ref(`users/${uid}/sections`).once('value').then(snapshot => {
            snapshot.forEach(childSnapshot => {
              if (childSnapshot.val().notebook === currentNotebookId) {
                notebookObj.sections.push({
                  id: childSnapshot.key,
                  ...childSnapshot.val()
                })
              }
            })
  
            // if page is in current section, add to object
            database.ref(`users/${uid}/pages`).once('value').then(snapshot => {
              snapshot.forEach(childSnapshot => {
                if (childSnapshot.val().section === currentSectionId) {
                  notebookObj.pages.push({
                    id: childSnapshot.key,
                    ...childSnapshot.val()
                  })
                }
              })
  
              callback(setNotebook(notebookObj))
            })
          })
        })
      })
    } else {
      // Create initial notebook for new user
      database.ref(`users/${uid}/notebooks/`).push({ title: 'My Notebook', default: true }).then(snapshot => {
        database.ref(`users/${uid}/sections/`).push({ title: 'Personal', notebook: snapshot.key }).then(snapshot => {
          database.ref(`users/${uid}/pages/`).push({ title: 'Untitled Page', section: snapshot.key })
        })
      })
    }
  })
}

export const addPage = page => ({
  type: 'ADD_PAGE',
  payload: {
    page
  }
})

export const startAddPage = (uid, sectionId, callback) => {
  const title = 'Untitled Note'
  return database.ref(`users/${uid}/pages/`).push({ section: sectionId, title, body: '' }).then(snapshot => {
    callback(addPage({
      id: snapshot.key,
      section: sectionId,
      title,
      body: ''
    }))
  })
}

export const setCurrentPage = (section, page) => ({
  type: 'SET_CURRENT_PAGE',
  payload: {
    section,
    page
  }
})

export const startSetCurrentPage = (uid, section, page, callback) => {
  database.ref(`users/${uid}/sections/${section}/currentPage`).set(page).then()
  return callback(setCurrentPage(section, page))
}

export const addSection = section => ({
  type: 'ADD_SECTION',
  payload: {
    section
  }
})

export const startAddSection = (uid, notebookId, callback) => {
  const title = 'Untitled Section'
  return database.ref(`users/${uid}/sections/`).push({ notebook: notebookId, title }).then(snapshot => {
    callback(addSection({
      id: snapshot.key,
      notebook: notebookId,
      title
    }))
  })
}

export const setCurrentSection = (notebookId, sectionId, newPages) => {
  return ({
    type: 'SET_CURRENT_SECTION',
    payload: {
      notebookId,
      sectionId,
      newPages
    }
  })
}

export const startSetCurrentSection = (uid, notebookId, sectionId, callback) => {
  // get pages for the newly selected section and add to new pages array
  const pages = []
  database.ref(`users/${uid}/pages`).once('value').then(snapshot => {
    snapshot.forEach(childSnapshot => {
      if (childSnapshot.val().section === sectionId) {
        pages.push({
          id: childSnapshot.key,
          ...childSnapshot.val()
        })
      }
    })
    database.ref(`users/${uid}/notebooks/${notebookId}/currentSection`).set(sectionId)
    return callback(setCurrentSection(notebookId, sectionId, pages))
  })

}

export const editPage = (id, updates) => ({
  type: 'EDIT_NOTE',
  payload: {
    id,
    updates
  }
})

export const startEditPage = (uid, id, updates, callback) => {
  database.ref(`users/${uid}/pages/${id}`).update(updates)
  callback(editPage(id, updates))
}

export const removePage = id => ({
  type: 'REMOVE_PAGE',
  payload: {
    id
  }
})

export const startRemovePage = (uid, id, callback) => {
  database.ref(`users/${uid}/pages/${id}`).remove()
  callback(removePage(id))
}
