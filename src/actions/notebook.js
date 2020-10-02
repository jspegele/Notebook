import database from '../firebase/firebase'

export const setNotebook = notebook => ({
  type: 'SET_NOTEBOOK',
  payload: {
    notebook
  }
})

export const addPage = page => ({
  type: 'ADD_NOTE',
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

export const setCurrentPage = id => ({
  type: 'SET_CURRENT_PAGE',
  payload: {
    id
  }
})

export const startSetCurrentPage = (uid, id, callback) => {
  database.ref(`users/${uid}/currentPage`).set(id).then()
  return callback(setCurrentPage(id))
}

export const setCurrentSection = (id, newPages) => {
  console.log(newPages)
  return ({
    type: 'SET_CURRENT_SECTION',
    payload: {
      id,
      newPages
    }
  })
}

export const startSetCurrentSection = (uid, id, callback) => {
  // if page is in current section, add to new pages array
  const pages = []
  database.ref(`users/${uid}/pages`).once('value').then(snapshot => {
    snapshot.forEach(childSnapshot => {
      if (childSnapshot.val().section === id) {
        pages.push({
          id: childSnapshot.key,
          ...childSnapshot.val()
        })
      }
    })
    database.ref(`users/${uid}/currentSection`).set(id).then()
    return callback(setCurrentSection(id, pages))
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

export const removePage = (id) => ({
  type: 'REMOVE_NOTE',
  payload: {
    id
  }
})
