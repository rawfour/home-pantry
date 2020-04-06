import React from 'react';
import PropTypes from 'prop-types';

const ProductToBuy = ({ product }) => {
  const { name, img, unit, isMax, isLow, currently } = product;
  return (
    <div
      className="rounded shadow bg-white overflow-hidden py-4 px-6 m-4"
      style={{
        maxWidth: 300,
      }}
    >
      <div
        className="w-full rounded"
        style={{
          height: 252,
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <img
          className="w-full block"
          src={img}
          alt={name}
          style={{
            position: 'absolute',
            width: '100%',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%,-50%)',
          }}
        />
      </div>
      <div className="flex flex-col w-full pt-4">
        <div className="w-full pb-4 mb-4 text-center border-b-2 border-gray-400">
          <span className="uppercase tracking-wide text-gray-700 text-xl font-bold mb-2">
            {name}
          </span>
        </div>
        <div className="flex flex-wrap w-full">
          <span className="w-1/2 text-left py-4 block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
            Maximum in pantry:
          </span>
          <span className="w-1/2 text-right py-4 block  tracking-wide text-gray-700 text-base font-bold mb-2">
            {`${isMax} ${unit}`}
          </span>
          <span className="w-1/2 text-left py-4 block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
            Minimum in pantry:
          </span>
          <span className="w-1/2 text-right py-4 block  tracking-wide text-gray-700 text-base font-bold mb-2">
            {`${isLow} ${unit}`}
          </span>
          <span className="w-1/2 text-left py-4 block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
            Currently in pantry:
          </span>
          <span className="w-1/2 text-right py-4 block  tracking-wide text-gray-700 text-base font-bold mb-2">
            {`${currently} ${unit}`}
          </span>
        </div>
        <div className="flex flex-wrap w-full pt-4 mt-4 border-t-2 border-gray-400">
          <span className="w-1/2 text-left py-4 block uppercase tracking-wide text-gray-700 text-xl font-bold mb-2">
            Buy:
          </span>
          <span className="w-1/2 text-right py-4 block  tracking-wide text-green-500 text-xl font-bold mb-2">
            {`${isMax - currently} ${unit}`}
          </span>
        </div>
      </div>
    </div>
  );
};

ProductToBuy.propTypes = {
  product: PropTypes.shape().isRequired,
};

export default ProductToBuy;
