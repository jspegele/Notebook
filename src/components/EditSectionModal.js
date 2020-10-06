import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { FiX } from 'react-icons/fi'
import Modal from 'react-modal'

import styles from './style/Modal.module.scss'
import buttonStyles from './style/Buttons.module.scss'
import checkmarkStyles from './style/Checkmark.module.scss'

const EditSectionModal = ({ modalOpen, handleCloseModal, handleTitle, title }) => {
  const [newTitle, setNewTitle] = useState('')
  const [titleSaved, setTitleSaved] = useState(false)
  useEffect(() => {
    setNewTitle(title)
  }, [title])

  const handleSubmit = e => {
    e.preventDefault()
    handleTitle(newTitle)
    setTitleSaved(true)
  }

  const handleText = e => {
    if (titleSaved === true) { setTitleSaved(false) }
    setNewTitle(e.target.value)
  }
  return (
    <Modal
      appElement={document.getElementById('root')}
      isOpen={modalOpen}
      onRequestClose={handleCloseModal}
      contentLabel="Edit Section"
      closeTimeoutMS={200}
      className={styles.modalWithClose}
      overlayClassName={styles.overlay}
    >
      <div className={styles.close} onClick={handleCloseModal}><FiX size="2.4rem" /></div>
      <div className={styles.body}>
        <form className={styles.titleForm} onSubmit={handleSubmit}>
          <label htmlFor="titleInput">Rename section</label>
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
            <span>Delete this section</span>
            <button
              disabled
              id="deleteSection"
              className={`${buttonStyles.button} ${buttonStyles.destructive}`}
              type="submit"
            >
              Delete
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
  saveTitle: PropTypes.func.isRequired
}

EditSectionModal.defaultProps = {}

export default EditSectionModal
