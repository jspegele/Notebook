import React, { createContext, useReducer } from 'react'
import { notesReducer } from '../reducers/notebook'

export const NotebookContext = createContext()

const NotebookContextProvider = props => {
  const initialState = {
    currentNotebook: '',
    currentSection: '',
    currentPage: '',
    sections: [],
    pages: []
  }
  const [notebook, dispatchNotebook] = useReducer(notesReducer, {
    currentNotebook: '',
    currentSection: '',
    currentPage: '',
    sections: [],
    pages: []
  })
  // useEffect(() => {
  //   // save current note
  // }, [notes])
  return (
    <NotebookContext.Provider value={{ notebook, dispatchNotebook }}>
      {props.children}
    </NotebookContext.Provider>
  )
}
 
export default NotebookContextProvider
