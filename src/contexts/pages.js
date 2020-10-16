import React, { createContext, useReducer } from 'react'
import { pagesReducer } from '../reducers/pages'

export const PagesContext = createContext()

const PagesContextProvider = props => {
  const [pages, dispatchPages] = useReducer(pagesReducer, props.pages)
  return (
    <PagesContext.Provider value={{ pages, dispatchPages }}>
      {props.children}
    </PagesContext.Provider>
  )
}

export default PagesContextProvider
