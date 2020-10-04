import React from 'react'
import PropTypes from 'prop-types'
import Modal from 'react-modal'

import styles from './style/Modal.module.scss'
import buttonStyles from './style/Buttons.module.scss'

const ConfirmationModal = ({
  modalOpen,
  handleAction,
  handleCloseModal,
  messageTxt,
  primaryBtnTxt,
  secondaryBtnTxt,
  destructive
}) => (
  <Modal
    appElement={document.getElementById('root')}
    isOpen={modalOpen}
    onRequestClose={handleCloseModal}
    contentLabel="Confirm"
    closeTimeoutMS={200}
    className={styles.modal}
    overlayClassName={styles.overlay}
  >
    <div className={styles.body}>
      <p>{messageTxt}</p>
    </div>
    <div className={styles.actions}>
      <button
        className={`${buttonStyles.button} ${buttonStyles.tertiary}`}
        onClick={handleCloseModal}
      >
        {secondaryBtnTxt}
      </button>
      <button
        className={destructive ? 
          `${buttonStyles.button} ${buttonStyles.destructive}` :
          `${buttonStyles.button}`}
        onClick={handleAction}
      >
        {primaryBtnTxt}
      </button>
    </div>
  </Modal>
)

ConfirmationModal.propTypes = {
  modalOpen: PropTypes.bool.isRequired,
  handleAction: PropTypes.func.isRequired,
  handleCloseModal: PropTypes.func.isRequired,
  messageTxt: PropTypes.string,
  primaryBtnTxt: PropTypes.string,
  secondaryBtnTxt: PropTypes.string,
  destructive: PropTypes.bool
}

ConfirmationModal.defaultProps = {
  messageTxt: 'Are you sure?',
  primaryBtnTxt: 'Confirm',
  secondaryBtnTxt: 'Cancel',
  destructive: false
}

export default ConfirmationModal
