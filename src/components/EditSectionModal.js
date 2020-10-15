import React, { useState, useEffect, useContext } from 'react'
import PropTypes from 'prop-types'
import { FiX } from 'react-icons/fi'
import Modal from 'react-modal'
import { PagesContext } from '../contexts/pages'

import styles from './style/Modal.module.scss'
import buttonStyles from './style/Buttons.module.scss'
import checkmarkStyles from './style/Checkmark.module.scss'

const EditSectionModal = ({ modalOpen, handleCloseModal, sectionId, sectionTitle, handleSave, handleDelete }) => {
  const { pages } = useContext(PagesContext)
  const [newTitle, setNewTitle] = useState('')
  const [titleSaved, setTitleSaved] = useState(false)

  useEffect(() => {
    setNewTitle(sectionTitle)
  }, [sectionTitle])

  const startCloseModal = () => {
    setNewTitle('')
    setTitleSaved(false)
    handleCloseModal()
  }
  const handleText = e => {
    if (titleSaved === true) { setTitleSaved(false) }
    setNewTitle(e.target.value)
  }
  const startHandleSave = e => {
    e.preventDefault()
    handleSave(newTitle)
    setTitleSaved(true)
  }
  const startHandleDelete = () => {
    // ADD CONFIRMATION MODAL HERE -- warn that pages in this section will still show in "All Notes"
    handleDelete()
  }
  return (
    <Modal
      appElement={document.getElementById('root')}
      isOpen={modalOpen}
      onRequestClose={startCloseModal}
      contentLabel="Edit Section"
      closeTimeoutMS={200}
      className={styles.modalWithClose}
      overlayClassName={styles.overlay}
    >
      <div className={styles.close} onClick={startCloseModal}><FiX size="2.4rem" /></div>
      <h2 className={styles.title}>Manage Section</h2>
      <div className={styles.body}>
        <form className={styles.titleForm} onSubmit={startHandleSave}>
          <label htmlFor="titleInput">Rename</label>
          <input
            type="text"
            id="titleInput"
            className={styles.input}
            value={newTitle}
            onChange={handleText}
            autoFocus
          />
          <div className={styles.saveAction}>
            {titleSaved ? (
              <svg class={checkmarkStyles.checkmark} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52">
                <circle class={checkmarkStyles.circle} cx="26" cy="26" r="25" fill="none"/>
                <path class={checkmarkStyles.check} fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8"/>
              </svg>
            ) : (
              <button
                className={buttonStyles.button}
                type="submit"
              >
                Save
              </button>
            )}
          </div>
        </form>
        <div className={styles.additionalOptions}>
        <label htmlFor="additionalOptions">Additional Options</label>
          <div id="additionalOptions" className={styles.deleteSection}>
            <button
              id="deleteSection"
              className={`${buttonStyles.button} ${buttonStyles.destructive}`}
              onClick={startHandleDelete}
            >
              Delete Section
            </button>
          </div>
        </div>
      </div>
    </Modal>
  )
}

EditSectionModal.propTypes = {
  modalOpen: PropTypes.bool.isRequired,
  handleCloseModal: PropTypes.func.isRequired,
  handleSave: PropTypes.func.isRequired,
  handleDelete: PropTypes.func.isRequired
}

EditSectionModal.defaultProps = {}

export default EditSectionModal
