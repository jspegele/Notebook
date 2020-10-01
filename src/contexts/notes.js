import React, { createContext, useReducer, useEffect } from 'react'
import { notesReducer } from '../reducers/notes'

export const NotesContext = createContext()

const NotesContextProvider = props => {
  const storageName = 'Notebook'
  const localData = localStorage.getItem(storageName)
  const initialState = localData ? JSON.parse(localData) : []
  const [notes, dispatchNotes] = useReducer(notesReducer, initialState)
  useEffect(() => {
    localStorage.setItem(storageName, JSON.stringify(notes))
  }, [notes]);
  return (
    <NotesContext.Provider value={{ notes, dispatchNotes }}>
      {props.children}
    </NotesContext.Provider>
  )
}
 
export default NotesContextProvider
