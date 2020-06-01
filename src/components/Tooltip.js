import React from 'react';
import PropTypes from 'prop-types';
import { Tooltip as MuiTooltip } from '@material-ui/core';

const Tooltip = ({ text }) => {
  return (
    <MuiTooltip title={text} arrow>
      <svg
        className="fill-current h-4 w-4 ml-2"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        width="24"
        height="24"
      >
        <path
          className="heroicon-ui"
          d="M12 22a10 10 0 1 1 0-20 10 10 0 0 1 0 20zm0-2a8 8 0 1 0 0-16 8 8 0 0 0 0 16zM10.59 8.59a1 1 0 1 1-1.42-1.42 4 4 0 1 1 5.66 5.66l-2.12 2.12a1 1 0 1 1-1.42-1.42l2.12-2.12A2 2 0 0 0 10.6 8.6zM12 18a1 1 0 1 1 0-2 1 1 0 0 1 0 2z"
        />
      </svg>
    </MuiTooltip>
  );
};

Tooltip.propTypes = {
  text: PropTypes.string.isRequired,
};

export default Tooltip;