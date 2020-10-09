import database from '../firebase/firebase'
import { DateTime } from 'luxon'

export const setPages = pages => ({
  type: 'SET_PAGES',
  payload: {
    pages
  }
})

export const startSetPages = (uid, callback) => {
  const pages = []
  database.ref(`users/${uid}/pages`).orderByChild('created').once('value').then(snapshot => {
    snapshot.forEach(childSnapshot => {
      pages.push({
        id: childSnapshot.key,
        ...childSnapshot.val()
      })
    })

    callback(setPages(pages))
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
    if (sectionId) database.ref(`users/${uid}/sections/${sectionId}/currentPage`).set(snapshot.key)
    callback(addPage({
      id: snapshot.key,
      ...page
    }))
  })
}

export const editPage = (id, updates) => ({
  type: 'EDIT_PAGE',
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

export const setFavorite = (id, status) => ({
  type: 'SET_FAVORITE',
  payload: {
    id,
    status
  }
})

export const startSetFavorite = (uid, id, status, callback) => {
  database.ref(`users/${uid}/pages/${id}/favorite`).set(status)
  callback(setFavorite(id, status))
}

export const assignSection = (id, sectionId) => ({
  type: 'ASSIGN_SECTION',
  payload: {
    id,
    sectionId
  }
})

export const startAssignSection = (uid, id, sectionId, callback) => {
  console.log(sectionId)
  database.ref(`users/${uid}/pages/${id}/section`).set('test')
  callback(assignSection(id, sectionId))
}

export const removeSection = id => ({
  type: 'REMOVE_SECTION',
  payload: {
    id
  }
})

export const startRemoveSection = (uid, id, callback) => {
  database.ref(`users/${uid}/pages/${id}/section`).set('')
  callback(removeSection(id))
}

export const setTrash = id => ({
  type: 'SET_TRASH',
  payload: {
    id
  }
})

export const startSetTrash = (uid, id, callback) => {
  database.ref(`users/${uid}/pages/${id}/trash`).set(true)
  callback(setTrash(id))
}

export const restoreTrash = id => ({
  type: 'RESTORE_TRASH',
  payload: {
    id
  }
})

export const startRestoreTrash = (uid, id, callback) => {
  database.ref(`users/${uid}/pages/${id}/trash`).remove()
  callback(restoreTrash(id))
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
