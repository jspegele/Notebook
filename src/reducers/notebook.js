import { v4 as uuid } from 'uuid'
import { DateTime } from 'luxon'

export const notesReducer = (state, action) => {
  let notebooks = []
  let sections = []
  let pages = []
  switch (action.type) {
    case 'SET_NOTEBOOK':
      return action.payload.notebook
    case 'ADD_PAGE':
      sections = []
      state.sections.forEach(section => {
        if (section.id === action.payload.page.section) {
          sections.push({
            ...section,
            currentPage: action.payload.page.id
          })
        } else {
          sections.push(section) 
        }
      })
      return {
        ...state,
        sections,
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
      sections = []
      state.sections.forEach(section => {
        if (section.id === action.payload.section) {
          sections.push({
            ...section,
            currentPage: action.payload.page
          })
        } else {
          sections.push(section) 
        }
      })
      return {
        ...state,
        // currentPage: action.payload.page,
        sections
      }
    case 'SET_CURRENT_SECTION':
      notebooks = []
      state.notebooks.forEach(notebook => {
        if (notebook.id === action.payload.notebookId) {
          notebooks.push({
            ...notebook,
            currentSection: action.payload.sectionId
          })
        }
      })
      return {
        ...state,
        notebooks,
        pages: action.payload.newPages
      }
    case 'EDIT_NOTE':
      pages = []
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
    case 'REMOVE_PAGE':
      pages = []
      state.pages.forEach(page => {
        if (page.id !== action.payload.id) {
          pages.push(page)
        }
      })
      return {
        ...state,
        pages
      }
    default:
      return state
  }
}
