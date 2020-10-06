export const notebooksReducer = (state, action) => {
  switch (action.type) {
    case 'SET_NOTEBOOKS':
      return action.payload.notebooks
    case 'SET_CURRENT_SECTION':
      return state.map(notebook => {
        if (notebook.id === action.payload.notebookId) {
          return {
            ...notebook,
            currentSection: action.payload.sectionId
          }
        } else {
          return notebook
        }
      })
    default:
      return state
  }
}
