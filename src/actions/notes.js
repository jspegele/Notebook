export const addNote = () => ({
  type: 'ADD_NOTE'
})

export const removeNote = (id) => ({
  type: 'REMOVE_NOTE',
  payload: {
    id
  }
})

export const editNote = (id, updates) => ({
  type: 'EDIT_NOTE',
  payload: {
    id,
    updates
  }
})
