import React, { useContext } from 'react'
import PropTypes from 'prop-types'
import { FiPlus, FiSettings, FiArrowLeft, FiArrowRight } from 'react-icons/fi'
import { SettingsContext } from '../contexts/settings'

import styles from './style/AppToolbar.module.scss'

const AppToolbar = ({ slim }) => {
  const { settings, updateSettings } = useContext(SettingsContext)
  return (
    <div className={slim ? `${styles.toolbar} ${styles.slim}` : styles.toolbar}>
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
      <button><FiPlus /></button>
      <button><FiSettings /></button>
    </div>
  )
}

AppToolbar.propTypes = {
  slim: PropTypes.bool
}

AppToolbar.defaultProps = {
  slim: false
}
 
export default AppToolbar