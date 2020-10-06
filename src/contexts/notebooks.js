import React, { createContext, useReducer } from 'react'
import { notebooksReducer } from '../reducers/notebooks'

export const NotebooksContext = createContext()

const NotebooksContextProvider = props => {
  const [notebooks, dispatchNotebooks] = useReducer(notebooksReducer, [])
  const currentSectionId = notebooks.length ? notebooks[0].currentSection : null
  return (
    <NotebooksContext.Provider value={{ notebooks, dispatchNotebooks, currentSectionId }}>
      {props.children}
    </NotebooksContext.Provider>
  )
}
 
export default NotebooksContextProvider



/* OLD NOTEBOOK CONTEXT FOR TEMP REFERENCE */

// import React, { createContext, useReducer } from 'react'
// import { notesReducer } from '../reducers/notebook'

// export const NotebookContext = createContext()

// const NotebookContextProvider = props => {
//   const [notebook, dispatchNotebook] = useReducer(notesReducer, {})
//   let currentSection = null
//   let currentPage = null
//   if (notebook.currentNotebook) {
//     const currentNotebook = notebook.notebooks.find(book => book.id === notebook.currentNotebook)
//     currentSection = notebook.sections.find(section => section.id === currentNotebook.currentSection)
//     currentPage = notebook.pages.find(page => page.id === currentSection.currentPage)
//   }
//   // const [notebook, dispatchNotebook] = useReducer(notesReducer, {
//   //   currentNotebook: '',
//   //   currentSection: '',
//   //   sections: [],
//   //   pages: []
//   // })
//   return (
//     <NotebookContext.Provider value={{ notebook, dispatchNotebook, currentSection, currentPage }}>
//       {props.children}
//     </NotebookContext.Provider>
//   )
// }
 
// export default NotebookContextProvider
