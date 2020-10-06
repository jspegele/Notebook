import React, { useState } from 'react'
import PropTypes from 'prop-types'
import Modal from 'react-modal'

import styles from './style/Modal.module.scss'
import buttonStyles from './style/Buttons.module.scss'

const InputModal = ({
  modalOpen,
  handleInput,
  handleCloseModal,
  messageTxt,
  primaryBtnTxt,
  secondaryBtnTxt
}) => {
  const [input, setInput] = useState('')
  const handleSubmit = e => {
    e.preventDefault()
    handleInput(input)
    setInput('')
  }
  const startCloseModal = () => {
    setInput('')
    handleCloseModal()
  }
  return (
    <Modal
      appElement={document.getElementById('root')}
      isOpen={modalOpen}
      onRequestClose={startCloseModal}
      contentLabel="Confirm"
      closeTimeoutMS={200}
      className={styles.modal}
      overlayClassName={styles.overlay}
    >
      <div className={styles.body}>
        <p>{messageTxt}</p>
        <form onSubmit={handleSubmit}>
          <input className={styles.input} type="text" value={input} onChange={e => setInput(e.target.value)} autoFocus />
          <div className={styles.actions}>
            <button
              className={`${buttonStyles.button} ${buttonStyles.tertiary}`}
              type="button"
              onClick={startCloseModal}
            >
              {secondaryBtnTxt}
            </button>
            <button
              className={buttonStyles.button}
              type="submit"
            >
              {primaryBtnTxt}
            </button>
          </div>
        </form>
      </div>
    </Modal>
  )
}

InputModal.propTypes = {
  modalOpen: PropTypes.bool.isRequired,
  handleInput: PropTypes.func.isRequired,
  handleCloseModal: PropTypes.func.isRequired,
  messageTxt: PropTypes.string,
  primaryBtnTxt: PropTypes.string,
  secondaryBtnTxt: PropTypes.string
}

InputModal.defaultProps = {
  messageTxt: 'Enter Value',
  primaryBtnTxt: 'Accept',
  secondaryBtnTxt: 'Cancel'
}

export default InputModal
