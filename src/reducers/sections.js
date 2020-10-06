export const sectionsReducer = (state, action) => {
  switch (action.type) {
    case 'SET_SECTIONS':
      return action.payload.sections
    case 'ADD_SECTION':
      return [...state, action.payload.section]
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
