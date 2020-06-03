import React from 'react';
import PropTypes from 'prop-types';
import { Dialog } from '@material-ui/core';

const Modal = ({ open, onClose, action, modalText, btnContent }) => {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <div className="px-16 py-10 bg-white rounded shadow">
        <p className="bolck text-center mb-10 text-lg md:text-xl">{modalText}</p>
        <div className="flex justify-center items-center">
          <button
            onClick={onClose}
            type="button"
            className="duration-200 text-base mx-5 px-4 py-2 leading-none rounded border-solid border-2 shadow border-green-500 bg-white hover:bg-green-200 text-green-500"
          >
            Cancel
          </button>
          {action && btnContent && (
            <button
              onClick={action}
              type="button"
              className="duration-200 text-base mx-5 px-4 py-2 leading-none rounded border-solid border-2 shadow border-red-500 bg-white hover:bg-red-200 text-red-500"
            >
              {btnContent}
            </button>
          )}
        </div>
      </div>
    </Dialog>
  );
};

Modal.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  action: PropTypes.func,
  modalText: PropTypes.string.isRequired,
  btnContent: PropTypes.string,
};

Modal.defaultProps = {
  action: false,
  btnContent: false,
};

export default Modal;
