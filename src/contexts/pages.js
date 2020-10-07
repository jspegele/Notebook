import React, { createContext, useContext, useReducer } from 'react'
import { pagesReducer } from '../reducers/pages'
// import { SectionsContext } from './sections'

export const PagesContext = createContext()

const PagesContextProvider = props => {
  const [pages, dispatchPages] = useReducer(pagesReducer, [])
  // const { currentPageId } = useContext(SectionsContext)
  // const currentPage = pages.filter(page => page.id === currentPageId)[0]
  return (
    <PagesContext.Provider value={{ pages, dispatchPages }}>
      {props.children}
    </PagesContext.Provider>
  )
}

export default PagesContextProvider
