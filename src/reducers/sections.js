export const sectionsReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_SECTION':
      return [...state, action.payload.section]
    case 'EDIT_SECTION':
      return state.map(section => {
        if (section.id === action.payload.id) {
          return {
            ...section,
            ...action.payload.updates
          }
        } else {
          return section
        }
      })
    case 'REMOVE_SECTION':
      return state.filter(section => section.id !== action.payload.id)
    case 'SET_CURRENT_PAGE':
      return state.map(section => {
        if (section.id === action.payload.sectionId) {
          return {
            ...section,
            currentPage: action.payload.pageId
          }
        } else {
          return section
        }
      })
    default:
      return state
  }
}
