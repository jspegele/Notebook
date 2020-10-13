import React, { createContext, useState } from 'react'

export const SettingsContext = createContext()

const SettingsContextProvider = props => {
  const [settings, setSettings] = useState({
    theme: 'light',
    sidebar: 'full'
  })
  const updateSettings = updates => {
    setSettings({
      ...settings,
      ...updates
    })
  }
  return (
    <SettingsContext.Provider value={{ settings, updateSettings }}>
      {props.children}
    </SettingsContext.Provider>
  )
}
 
export default SettingsContextProvider
