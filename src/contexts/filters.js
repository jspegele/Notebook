import React, { createContext, useState } from 'react'

export const FiltersContext = createContext()

const FiltersContextProvider = props => {
  const [filters, setFilters] = useState({
    group: 'all',
    section: null,
    page: null
  })
  const updateFilters = updates => {
    setFilters({
      ...filters,
      ...updates
    })
  }
  return (
    <FiltersContext.Provider value={{ filters, updateFilters }}>
      {props.children}
    </FiltersContext.Provider>
  );
}
 
export default FiltersContextProvider
