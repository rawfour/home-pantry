import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

const ProgressBar = ({ isMax, isLow, currently }) => {
  const [progress, setProgress] = useState(0);
  const [barColor, setBarColor] = useState('red');

  const handleSetBarColor = () => {
    let color;
    const middleValue = (isMax + isLow) / 2;
    if (currently >= middleValue) {
      const toMiddle = currently - middleValue;
      const toHigher = isMax - currently;
      if (toMiddle < toHigher) {
        color = '#ed8936';
      } else {
        color = '#48bb78';
      }
    } else {
      const toLower = currently - isLow;
      const toMiddle = middleValue - currently;
      if (toMiddle < toLower) {
        color = '#ed8936';
      } else {
        color = '#f56565';
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
    <div className="w-40 bg-gray-200 w-full dutarion-200 h-4 overflow-hidden rounded-lg shadow-inner border-solid">
      <div
        className="shadow-inner rounded-lg"
        style={{
          height: '100%',
          width: `${progress}%`,
          backgroundColor: barColor,
        }}
      />
    </div>
  );
};

ProgressBar.propTypes = {
  isLow: PropTypes.number.isRequired,
  isMax: PropTypes.number.isRequired,
  currently: PropTypes.number.isRequired,
};

export default ProgressBar;
