import React, { useContext } from 'react'
import { FiArrowLeft, FiArrowRight } from 'react-icons/fi'
import { SettingsContext } from '../contexts/settings'

const ToggleSidebar = () => {
  const { settings, updateSettings } = useContext(SettingsContext)
  return (
    <button
      title={settings.sidebar === 'full' ? 'Minimize sidebar' : 'Expand sidebar'}
      onClick={() => updateSettings({
        sidebar: settings.sidebar === 'full' ? 'slim' : 'full'
      })}
    >
      {settings.sidebar === 'full' ? (
        <FiArrowLeft />
      ) : (
        <FiArrowRight />
      )}
    </button>
  )
}
 
export default ToggleSidebar
