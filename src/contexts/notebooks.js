import React, { createContext, useReducer } from 'react'
import { notebooksReducer } from '../reducers/notebooks'

export const NotebooksContext = createContext()

const NotebooksContextProvider = props => {
  const [notebooks, dispatchNotebooks] = useReducer(notebooksReducer, [])
  // const currentSectionId = notebooks.length ? notebooks[0].currentSection : null
  return (
    <NotebooksContext.Provider value={{ notebooks, dispatchNotebooks, currentSectionId: null }}>
      {props.children}
    </NotebooksContext.Provider>
  )
}
 
export default NotebooksContextProvider
