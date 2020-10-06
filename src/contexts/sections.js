import React, { createContext, useContext, useReducer } from 'react'
import { sectionsReducer } from '../reducers/sections'
import { NotebooksContext } from './notebooks'

export const SectionsContext = createContext()

const SectionsContextProvider = props => {
  const [sections, dispatchSections] = useReducer(sectionsReducer, [])
  const { currentSectionId } = useContext(NotebooksContext)
  const currentPageId = sections.length ? sections.filter(section => section.id === currentSectionId)[0].currentPage : null
  return (
    <SectionsContext.Provider value={{ sections, currentPageId, dispatchSections }}>
      {props.children}
    </SectionsContext.Provider>
  )
}
 
export default SectionsContextProvider
