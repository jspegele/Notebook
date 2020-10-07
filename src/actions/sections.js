import database from '../firebase/firebase'
import { DateTime } from 'luxon'

export const setSections = sections => ({
  type: 'SET_SECTIONS',
  payload: {
    sections
  }
})

export const startSetSections = (uid, callback) => {
  const sections = []
  database.ref(`users/${uid}/sections`).orderByChild('created').once('value').then(snapshot => {
    snapshot.forEach(childSnapshot => {
      sections.push({
        id: childSnapshot.key,
        ...childSnapshot.val()
      })
    })

    callback(setSections(sections))
  })
}

export const addSection = section => ({
  type: 'ADD_SECTION',
  payload: {
    section
  }
})

export const startAddSection = (uid, notebookId, title, callback) => {
  const section = {
    notebook: notebookId,
    title,
    created: DateTime.local().toString()
  }
  return database.ref(`users/${uid}/sections/`).push(section).then(snapshot => {
    callback(addSection({ ...section, id: snapshot.key }))
  })
}

export const editSection = (id, updates) => ({
  type: 'EDIT_SECTION',
  payload: {
    id,
    updates
  }
})

export const startEditSection = (uid, id, updates, callback) => {
  database.ref(`users/${uid}/sections/${id}`).update(updates)
  callback(editSection(id, updates))
}

export const removeSection = id => ({
  type: 'REMOVE_SECTION',
  payload: {
    id
  }
})

export const startRemoveSection = (uid, id, callback) => {
  database.ref(`users/${uid}/sections/${id}`).remove()
  database.ref(`users/${uid}/pages/`).once('value').then(snapshot => {
    snapshot.forEach(childSnapshot => {
      if (childSnapshot.val().section === id) {
        database.ref(`users/${uid}/pages/${childSnapshot.key}/section`).set(null)
      }
    })
  })
  callback(removeSection(id))
}

export const setCurrentPage = (sectionId, pageId) => ({
  type: 'SET_CURRENT_PAGE',
  payload: {
    sectionId,
    pageId
  }
})

export const startSetCurrentPage = (uid, sectionId, pageId, callback) => {
  if (sectionId) {
    database.ref(`users/${uid}/sections/${sectionId}/currentPage`).set(pageId)
    callback(setCurrentPage(sectionId, pageId))
  }
}
