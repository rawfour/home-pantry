import React from 'react';
import Loader from 'react-loader-spinner';

const Loading = () => {
  return (
    <div className="flex justify-center flex-col items-center">
      <Loader type="Puff" color="#48bb78" height={100} width={100} />
      <span className="text-center text-2xl py-4">Loading...</span>
    </div>
  );
};

export default Loading;
