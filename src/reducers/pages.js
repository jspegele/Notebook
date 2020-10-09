export const pagesReducer = (state, action) => {
  switch (action.type) {
    case 'SET_PAGES':
      return action.payload.pages
    case 'ADD_PAGE':
      return [
        ...state,
        action.payload.page
      ]
    case 'EDIT_PAGE':
      return state.map(page => {
        if (page.id === action.payload.id) {
          return {
            ...page,
            ...action.payload.updates
          }
        } else {
          return page
        }
      })
    case 'SET_FAVORITE':
      return state.map(page => {
        if (page.id === action.payload.id) {
          return {
            ...page,
            favorite: action.payload.status
          }
        } else {
          return page
        }
      })
    case 'ASSIGN_SECTION':
      return state.map(page => {
        if (page.id === action.payload.id) {
          return {
            ...page,
            section: action.payload.sectionId
          }
        } else {
          return page
        }
      })
    case 'REMOVE_SECTION':
      return state.map(page => {
        if (page.id === action.payload.id) {
          return {
            ...page,
            section: ''
          }
        } else {
          return page
        }
      })
    case 'SET_TRASH':
      return state.map(page => {
        if (page.id === action.payload.id) {
          return {
            ...page,
            trash: true
          }
        } else {
          return page
        }
      })
    case 'RESTORE_TRASH':
      return state.map(page => {
        if (page.id === action.payload.id) {
          return {
            ...page,
            trash: false
          }
        } else {
          return page
        }
      })
    case 'REMOVE_PAGE':
      return state.filter(page => page.id !== action.payload.id)
    default:
      return state
  }
}
