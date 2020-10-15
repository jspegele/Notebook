import React, { createContext, useContext, useState } from 'react'
import database from '../firebase/firebase'
import { AuthContext } from './auth'

export const SettingsContext = createContext()

const SettingsContextProvider = props => {
  const { auth } = useContext(AuthContext)
  const [fetched, setFetched] = useState(false)
  const [settings, setSettings] = useState({
    theme: 'light',
    sidebar: 'full',
    defaultSidebar: 'full',
    defaultSort: 'createdAsc'
  })

  if (!fetched) {
    database.ref(`users/${auth.uid}`).once('value').then(snapshot => {
      if (snapshot.hasChild('settings')) {
        setSettings({
          ...settings,
          ...snapshot.val().settings
        })
      } else {
        database.ref(`users/${auth.uid}/settings`).set(settings)
      }
    })
    setFetched(true)
  }

  const updateSettings = updates => {
    setSettings({
      ...settings,
      ...updates
    })
  }

  const saveSettings = updates => {
    database.ref(`users/${auth.uid}/settings`).set({
      ...settings,
      ...updates
    })
    updateSettings(updates)
  }
  return (
    <SettingsContext.Provider value={{ settings, updateSettings, saveSettings }}>
      {props.children}
    </SettingsContext.Provider>
  )
}
 
export default SettingsContextProvider
