import { v4 as uuid } from 'uuid'
import { DateTime } from 'luxon'

export const notesReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_NOTE':
      return [
        ...state,
        {
          id: uuid(),
          lastUpdated: DateTime.local(),
          title: '',
          body: ''
        }
      ]
    case 'REMOVE_NOTE':
      return state.filter(note => note.id !== action.payload.id)
    case 'EDIT_NOTE':
      return state.map(note => {
        if (note.id === action.payload.id) {
          return {
            ...note,
            ...action.payload.updates,
            lastUpdated: DateTime.local()
          }
        } else {
          return note
        }
      })
    default:
      return state
  }
}
