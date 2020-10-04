import database from '../firebase/firebase'
import { DateTime } from 'luxon'

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
        database.ref(`users/${uid}/notebooks`).orderByChild('created').once('value').then(snapshot => {
          snapshot.forEach(childSnapshot => {
            notebookObj.notebooks.push({
              id: childSnapshot.key,
              ...childSnapshot.val()
            })
          })

          // if section is in current notebook, add to object
          database.ref(`users/${uid}/sections`).orderByChild('created').once('value').then(snapshot => {
            snapshot.forEach(childSnapshot => {
              if (childSnapshot.val().notebook === currentNotebookId) {
                notebookObj.sections.push({
                  id: childSnapshot.key,
                  ...childSnapshot.val()
                })
              }
            })
  
            // if page is in current section, add to object
            database.ref(`users/${uid}/pages`).orderByChild('created').once('value').then(snapshot => {
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
      database.ref(`users/${uid}/notebooks/`).push({ title: 'My Notebook', created: DateTime.local() }).then(snapshot => {
        database.ref(`users/${uid}/sections/`).push({ title: 'Personal', notebook: snapshot.key, created: DateTime.local() }).then(snapshot => {
          database.ref(`users/${uid}/pages/`).push({ title: '', section: snapshot.key, created: DateTime.local(), updated: DateTime.local() })
        })
      })
    }
  })
}

export const addSection = (notebookId, section, pages) => {
  return ({
    type: 'ADD_SECTION',
    payload: {
      notebookId,
      section,
      pages
    }
  })
}

export const startAddSection = (uid, notebookId, title, callback) => {
  const section = {
    notebook: notebookId,
    title,
    created: DateTime.local().toString()
  }
  return database.ref(`users/${uid}/sections/`).push(section).then(snapshot => {
    const sectionId = snapshot.key
    const page = {
      section: sectionId,
      title: '',
      body: '',
      created: DateTime.local().toString(),
      updated: DateTime.local().toString()
    }
    database.ref(`users/${uid}/pages/`).push(page).then(snapshot => {
      const pageId = snapshot.key
      database.ref(`users/${uid}/sections/${sectionId}/currentPage`).set(pageId).then(snapshot => {
        database.ref(`users/${uid}/notebooks/${notebookId}/currentSection`).set(sectionId)
          callback(addSection(notebookId, { ...section, currentPage: pageId, id: sectionId }, [{ ...page, id: pageId}] ))
          // callback(addSection(notebookId, { ...section, id: sectionId }, [page] ))
      })
    })
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
  database.ref(`users/${uid}/pages`).orderByChild('created').once('value').then(snapshot => {
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

export const addPage = page => ({
  type: 'ADD_PAGE',
  payload: {
    page
  }
})

export const startAddPage = (uid, sectionId, callback) => {
  const page = {
    section: sectionId,
    title: '',
    body: '',
    created: DateTime.local().toString(),
    updated: DateTime.local().toString()
  }
  return database.ref(`users/${uid}/pages/`).push(page).then(snapshot => {
    database.ref(`users/${uid}/sections/${sectionId}/currentPage`).set(snapshot.key)
    callback(addPage({
      id: snapshot.key,
      ...page
    }))
  })
}

export const setCurrentPage = (sectionId, pageId) => ({
  type: 'SET_CURRENT_PAGE',
  payload: {
    sectionId,
    pageId
  }
})

export const startSetCurrentPage = (uid, sectionId, pageId, callback) => {
  database.ref(`users/${uid}/sections/${sectionId}/currentPage`).set(pageId)
  return callback(setCurrentPage(sectionId, pageId))
}

export const editPage = (id, updates) => ({
  type: 'EDIT_NOTE',
  payload: {
    id,
    updates
  }
})

export const startEditPage = (uid, id, updates, callback) => {
  const updatesWithDate = {
    ...updates,
    updated: DateTime.local().toString()
  }
  database.ref(`users/${uid}/pages/${id}`).update(updatesWithDate)
  callback(editPage(id, updatesWithDate))
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
