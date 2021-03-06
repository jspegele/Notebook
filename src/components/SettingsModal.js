import React, { useContext, useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Switch from '@material-ui/core/Switch'
// import { FiX, FiArrowUp, FiArrowDown } from 'react-icons/fi'
import { FiX } from 'react-icons/fi'
import Modal from 'react-modal'
import { startLogout } from '../actions/auth'
import { SettingsContext } from '../contexts/settings'

import styles from './style/SettingsModal.module.scss'
import modalStyles from './style/Modal.module.scss'
import buttonStyles from './style/Buttons.module.scss'
import { FiltersContext } from '../contexts/filters'

const PurpleSwitchLight = withStyles({
  switchBase: {
    '&$checked': {
      color: '#6200ee',
    },
    '&$checked + $track': {
      backgroundColor: '#6200ee',
    },
  },
  checked: {},
  track: {},
})(Switch)

const PurpleSwitchDark = withStyles({
  switchBase: {
    '&$checked': {
      color: '#bb86fc',
    },
    '&$checked + $track': {
      backgroundColor: '#bb86fc',
    },
  },
  checked: {},
  track: {},
})(Switch)

const SettingsModal = ({ modalOpen, handleCloseModal, user }) => {
  const { settings, saveSettings } = useContext(SettingsContext)
  const { updateFilters } = useContext(FiltersContext)

  const [darkMode, setDarkMode] = useState('light')
  useEffect(() => {
    setDarkMode(settings.theme)
  }, [settings.theme])
  const handleTheme = () => {
    saveSettings({ theme: darkMode === 'dark' ? 'light' : 'dark' })
    setDarkMode(darkMode === 'dark' ? 'light' : 'dark')
  }

  const [sidebar, setSidebar] = useState('full')
  useEffect(() => {
    setSidebar(settings.defaultSidebar)
  }, [settings.defaultSidebar])
  const handleSidebar = () => {
    saveSettings({
      sidebar: sidebar === 'full' ? 'slim' : 'full',
      defaultSidebar: sidebar === 'full' ? 'slim' : 'full'
    })
    setSidebar(sidebar === 'full' ? 'slim' : 'full')
  }

  const [defaultSort, setDefaultSort] = useState(settings.defaultSort)
  useEffect(() => {
    setDefaultSort(settings.defaultSort)
  }, [settings.defaultSort])
  const handleSort = e => {
    setDefaultSort(e.target.value)
    updateFilters({ sort: e.target.value })
    saveSettings({ defaultSort: e.target.value })
  }

  return (
    <Modal
      appElement={document.getElementById('root')}
      isOpen={modalOpen}
      onRequestClose={handleCloseModal}
      contentLabel="Confirm"
      closeTimeoutMS={200}
      className={`${settings.theme} ${modalStyles.modal}`}
      overlayClassName={modalStyles.overlay}
    >
      <div className={styles.header}>
        <div className={styles.title}><h2>Settings</h2></div>
        <div className={styles.close} onClick={handleCloseModal}><FiX /></div>
      </div>
      <div className={styles.body}>
        <div className={styles.userInfo}>
          <div className={styles.photo}>
            {user.photoURL ? (
              <img src={user.photoURL} alt="Profile pic" />
            ) : (
              'no photo'
            )}
          </div>
          <div className={styles.user}>
            <div className={styles.name}>
              {user.displayName ? (
                user.displayName
              ) : (
                'Anonymous'
              )}
            </div>
            <div className={styles.email}>
              {user.email ? user.email : ''}
            </div>
          </div>
          <div className={styles.logout}>
            <button
              className={buttonStyles.button}
              onClick={startLogout}
            >
              Logout
            </button>
          </div>
        </div>
        <div className={styles.options}>
          <h4>Options</h4>
          <div className={styles.option}>
            <div className={styles.optionText}>Dark Mode</div>
            <div className={styles.optionValue}>
              <PurpleSwitchDark
                checked={darkMode === 'dark' ? true : false}
                onChange={handleTheme}
                color="secondary"
                name="darkMode"
                inputProps={{ 'aria-label': 'primary checkbox' }}
              />
            </div>
          </div>
          <div className={styles.option}>
            <div className={styles.optionText}>Collapsed Sidebar</div>
            <div className={styles.optionValue}>
              {settings.theme === 'dark' ? (
                <PurpleSwitchDark
                  checked={sidebar === 'full' ? false : true}
                  onChange={handleSidebar}
                  color="secondary"
                  name="darkMode"
                  inputProps={{ 'aria-label': 'primary checkbox' }}
                />
              ) : (
                <PurpleSwitchLight
                  checked={sidebar === 'full' ? false : true}
                  onChange={handleSidebar}
                  color="secondary"
                  name="darkMode"
                  inputProps={{ 'aria-label': 'primary checkbox' }}
                />
              )}
            </div>
          </div>
          <div className={styles.option}>
            <div className={styles.optionText}>Default Note Sort</div>
            <div className={styles.optionValue}>
              <select
                defaultValue={defaultSort}
                onChange={handleSort}
              >
                <option value="createdDesc">Newest First</option>
                <option value="createdAsc">Oldest First</option>
                <option value="titleAsc">Title A-Z</option>
                <option value="titleDesc">Title Z-A</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  )
}

SettingsModal.propTypes = {
  modalOpen: PropTypes.bool.isRequired,
  handleCloseModal: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired
}

export default SettingsModal
