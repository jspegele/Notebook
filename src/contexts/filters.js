import React, { createContext, useContext,  useState } from 'react'
import database from '../firebase/firebase'
import { AuthContext } from './auth'

export const FiltersContext = createContext()

const FiltersContextProvider = props => {
  const { auth } = useContext(AuthContext)
  const [fetched, setFetched] = useState(false)
  const [filters, setFilters] = useState({
    tab: 'all',
    section: null,
    page: null,
    text: '',
    sort: 'createdAsc'
  })

  const updateFilters = updates => {
    setFilters({
      ...filters,
      ...updates
    })
  }

  if (!fetched) {
    console.log('running')
    database.ref(`users/${auth.uid}`).once('value').then(snapshot => {
      if (snapshot.hasChild('settings')) {
        updateFilters({ sort: snapshot.val().settings.defaultSort })
      }
    })
    setFetched(true)
  }
  return (
    <FiltersContext.Provider value={{ filters, updateFilters }}>
      {props.children}
    </FiltersContext.Provider>
  )
}
 
export default FiltersContextProvider
