import database from '../firebase/firebase'

export const setNotebooks = notebooks => ({
  type: 'SET_NOTEBOOKS',
  payload: {
    notebooks
  }
})

export const startSetNotebooks = (uid, callback) => {
  const notebooks = []
  database.ref(`users/${uid}/notebooks`).orderByChild('created').once('value').then(snapshot => {
    snapshot.forEach(childSnapshot => {
      notebooks.push({
        id: childSnapshot.key,
        ...childSnapshot.val()
      })
    })

    callback(setNotebooks(notebooks))
  })
}

export const setCurrentSection = (notebookId, sectionId) => ({
  type: 'SET_CURRENT_SECTION',
  payload: {
    notebookId,
    sectionId
  }
})

export const startSetCurrentSection = (uid, notebookId, sectionId, callback) => {
  database.ref(`users/${uid}/notebooks/${notebookId}/currentSection`).set(sectionId)
  callback(setCurrentSection(notebookId, sectionId))
}
