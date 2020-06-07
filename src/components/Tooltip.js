import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { makeStyles } from '@material-ui/core/styles';
import { Tooltip as MuiTooltip } from '@material-ui/core';
import HelpIcon from '@material-ui/icons/Help';

const IconWrapper = styled.div`
  margin-left: 5px;
`;

const useStyles = makeStyles(() => ({
  customTooltip: {
    fontSize: '1.1rem',
  },
}));

const Tooltip = ({ text }) => {
  const classes = useStyles();
  return (
    <MuiTooltip
      title={text}
      arrow
      classes={{
        tooltip: classes.customTooltip,
      }}
    >
      <IconWrapper>
        <HelpIcon />
      </IconWrapper>
    </MuiTooltip>
  );
};

Tooltip.propTypes = {
  text: PropTypes.string.isRequired,
};

export default Tooltip;
