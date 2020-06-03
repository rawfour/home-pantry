import React, { useState } from 'react';

const withDialog = (WrappedComponent) => {
  return (props) => {
    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
      setOpen(true);
    };

    const handleClose = () => {
      setOpen(false);
    };

    return (
      <WrappedComponent open={open} onClose={handleClose} onOpen={handleClickOpen} {...props} />
    );
  };
};

export default withDialog;
