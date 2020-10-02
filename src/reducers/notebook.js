import { v4 as uuid } from 'uuid'
import { DateTime } from 'luxon'

export const notesReducer = (state, action) => {
  switch (action.type) {
    case 'SET_NOTEBOOK':
      return action.payload.notebook
    case 'ADD_NOTE':
      return {
        ...state,
        currentPage: action.payload.page.id,
        pages: [
          ...state.pages,
          action.payload.page
        ]
      }
    case 'ADD_SECTION':
      return {
        ...state,
        sections: [
          ...state.sections,
          action.payload.section
        ]
      }
    case 'SET_CURRENT_PAGE':
      return {
        ...state,
        currentPage: action.payload.id
      }
    case 'SET_CURRENT_SECTION':
      return {
        ...state,
        currentSection: action.payload.id,
        currentPage: action.payload.newPages[0].id,
        pages: action.payload.newPages
      }
    case 'EDIT_NOTE':
      const pages = []
      state.pages.map(page => {
        if (page.id === action.payload.id) {
          pages.push({
            ...page,
            ...action.payload.updates
          })
        } else {
          pages.push(page)
        }
      })
      return {
        ...state,
        pages
      }
    case 'REMOVE_NOTE':
      return state.filter(note => note.id !== action.payload.id)
    default:
      return state
  }
}
