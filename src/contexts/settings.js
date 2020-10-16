import React, { createContext, useContext, useState } from 'react'
import database from '../firebase/firebase'
import { AuthContext } from './auth'

export const SettingsContext = createContext()

const SettingsContextProvider = props => {
  const { auth } = useContext(AuthContext)
  const [settings, setSettings] = useState(props.settings)

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
