import React from 'react';
import PropTypes from 'prop-types';
import { Backdrop as MuiBackdrop } from '@material-ui/core';
import Loading from './Loader';

const Backdrop = ({ open }) => {
  return (
    <MuiBackdrop
      className="rounded"
      style={{
        zIndex: '99',
        backgroundColor: 'rgba(0, 0, 0, 0.3)',
      }}
      open={open}
    >
      <Loading />
    </MuiBackdrop>
  );
};

Backdrop.propTypes = {
  open: PropTypes.bool.isRequired,
};

export default Backdrop;
