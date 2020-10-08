import React, { createContext, useReducer } from 'react'
import { sectionsReducer } from '../reducers/sections'

export const SectionsContext = createContext()

const SectionsContextProvider = props => {
  const [sections, dispatchSections] = useReducer(sectionsReducer, [])
  return (
    <SectionsContext.Provider value={{ sections, dispatchSections }}>
      {props.children}
    </SectionsContext.Provider>
  )
}
 
export default SectionsContextProvider
