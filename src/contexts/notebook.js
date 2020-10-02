import React, { createContext, useReducer } from 'react'
import { notesReducer } from '../reducers/notebook'

export const NotebookContext = createContext()

const NotebookContextProvider = props => {
  const [notebook, dispatchNotebook] = useReducer(notesReducer, {})
  let currentSection = null
  let currentPage = null
  if (notebook.currentNotebook) {
    const currentNotebook = notebook.notebooks.find(book => book.id === notebook.currentNotebook)
    currentSection = notebook.sections.find(section => section.id === currentNotebook.currentSection)
    currentPage = notebook.pages.find(page => page.id === currentSection.currentPage)
  }
  // const [notebook, dispatchNotebook] = useReducer(notesReducer, {
  //   currentNotebook: '',
  //   currentSection: '',
  //   sections: [],
  //   pages: []
  // })
  return (
    <NotebookContext.Provider value={{ notebook, dispatchNotebook, currentSection, currentPage }}>
      {props.children}
    </NotebookContext.Provider>
  )
}
 
export default NotebookContextProvider
