import React, { useContext, useState } from 'react'
import { FiSettings } from 'react-icons/fi'
import { AuthContext } from '../contexts/auth'
import SettingsModal from './SettingsModal'

const Settings = () => {
  const { auth } = useContext(AuthContext)
  const [modalOpen, setModalOpen] = useState(false)
  const handleCloseModal = () => setModalOpen(false)
  return (
    <>
      <button onClick={() => setModalOpen(true)}>
        <FiSettings />
      </button>
      <SettingsModal
        modalOpen={modalOpen}
        handleCloseModal={handleCloseModal}
        user={auth}
      />
    </>
  )
}
 
export default Settings
