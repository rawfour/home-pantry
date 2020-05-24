import React, { useState } from 'react';
import PropTypes from 'prop-types';

const ProductToBuy = ({ product }) => {
  const { name, img, unit, isMax, isLow, currently } = product;
  const [loaded, setLoaded] = useState(false);
  const onImageLoaded = () => {
    setLoaded(true);
  };
  return (
    <div
      className="rounded shadow bg-white overflow-hidden py-4 px-6 m-4"
      style={{
        maxWidth: 300,
      }}
    >
      <div
        className="w-full rounded flex justify-center items-center"
        style={{
          height: 252,
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {img && (
          <img
            className="animated-img block"
            src={img}
            alt={name}
            onLoad={onImageLoaded}
            style={{
              maxWidth: '100%',
            }}
          />
        )}

        {!loaded && (
          <div className="animated-img flex w-full h-full justify-center items-center rounded bg-gray-200 absolute">
            <svg xmlns="http://www.w3.org/2000/svg" width="85" height="77" viewBox="0 0 20 16">
              <path
                id="icon-image"
                d="M4,4H20a2,2,0,0,1,2,2V18a2,2,0,0,1-2,2H4a2,2,0,0,1-2-2V6A2.006,2.006,0,0,1,4,4Zm16,8.59V6H4v6.59l4.3-4.3a1,1,0,0,1,1.4,0l5.3,5.3,2.3-2.3a1,1,0,0,1,1.4,0l1.3,1.3Zm0,2.82-2-2-2.3,2.3a1,1,0,0,1-1.4,0L9,10.4l-5,5V18H20ZM15,10a1,1,0,1,1,1-1A1,1,0,0,1,15,10Z"
                transform="translate(-2 -4)"
                fill="#fff"
              />
            </svg>
          </div>
        )}
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
