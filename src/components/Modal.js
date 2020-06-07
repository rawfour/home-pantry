import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { Dialog } from '@material-ui/core';
import Button from './Button';

const ModalInnerWrapper = styled.div`
  padding: 40px 64px;
  background-color: ${({ theme }) => theme.colors.white};
  border-radius: 4px;
  box-shadow: ${({ theme }) => theme.shadows.basic};
`;

const ModalText = styled.p`
  display: block;
  text-align: center;
  margin-bottom: 40px;
  font-size: ${({ theme }) => theme.fontSizes.l};
  @media ${({ theme }) => theme.breakpoints.md} {
    font-size: ${({ theme }) => theme.fontSizes.xl};
  }
`;

const ButtonsWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  grid-gap: 16px;
`;

const Modal = ({ open, onClose, action, modalText, btnContent }) => {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <ModalInnerWrapper>
        <ModalText>{modalText}</ModalText>
        <ButtonsWrapper>
          <Button onClick={onClose} type="button" secondary>
            Cancel
          </Button>

          {action && btnContent && (
            <Button onClick={action} type="button">
              {btnContent}
            </Button>
          )}
        </ButtonsWrapper>
      </ModalInnerWrapper>
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
