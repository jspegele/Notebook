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
    case 'REMOVE_PAGE':
      return state.filter(page => page.id !== action.payload.id)
    default:
      return state
  }
}
