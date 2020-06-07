import React, { useState, useEffect } from 'react';
import styled, { withTheme } from 'styled-components';
import PropTypes from 'prop-types';

const Bar = styled.div`
  width: 160px;
  background-color: ${({ theme }) => theme.colors.lightGray};
  width: 100%;
  transition: 0.2s;
  height: 16px;
  overflow: hidden;
  border-radius: 8px;
  box-shadow: ${({ theme }) => theme.shadows.inner};
`;

const Progress = styled.div`
  box-shadow: ${({ theme }) => theme.shadows.inner};
  border-radius: 8px;
  height: 100%;
  width: ${({ progress }) => `${progress}%`};
  background-color: ${({ barColor }) => barColor};
`;

const ProgressBar = ({ isMax, isLow, currently, theme }) => {
  const [progress, setProgress] = useState(0);
  const [barColor, setBarColor] = useState('red');

  const handleSetBarColor = () => {
    let color;
    const middleValue = (isMax + isLow) / 2;
    if (currently >= middleValue) {
      const toMiddle = currently - middleValue;
      const toHigher = isMax - currently;
      if (toMiddle < toHigher) {
        color = theme.colors.progress.mid;
      } else {
        color = theme.colors.progress.max;
      }
    } else {
      const toLower = currently - isLow;
      const toMiddle = middleValue - currently;
      if (toMiddle < toLower) {
        color = theme.colors.progress.mid;
      } else {
        color = theme.colors.progress.low;
      }
    }
    return color;
  };

  useEffect(() => {
    const countProgress = (currently / isMax) * 100;
    setProgress(countProgress);
    setBarColor(handleSetBarColor);
  }, [currently]);

  return (
    <Bar>
      <Progress progress={progress} barColor={barColor} />
    </Bar>
  );
};

ProgressBar.propTypes = {
  isLow: PropTypes.number.isRequired,
  isMax: PropTypes.number.isRequired,
  currently: PropTypes.number.isRequired,
  theme: PropTypes.shape().isRequired,
};

export default withTheme(ProgressBar);
