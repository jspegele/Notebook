import React, { createContext, useContext, useReducer } from 'react'
import { sectionsReducer } from '../reducers/sections'
// import { FiltersContext } from '../contexts/filters'
// import { NotebooksContext } from '../contexts/notebooks'

export const SectionsContext = createContext()

const SectionsContextProvider = props => {
  const [sections, dispatchSections] = useReducer(sectionsReducer, [])
  // const { filters } = useContext(FiltersContext)
  // const currentSectionId = filters.section || null
  // const { currentSectionId } = useContext(NotebooksContext)
  // const currentPageId = sections.length ? (
  //   sections.filter(section => {
  //     if (currentSectionId) return section.id === currentSectionId
  //     else return section
  //   })[0].currentPage
  // ) :  null
  return (
    <SectionsContext.Provider value={{ sections, dispatchSections }}>
      {props.children}
    </SectionsContext.Provider>
  )
}
 
export default SectionsContextProvider
