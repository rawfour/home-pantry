import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import ProgressBar from 'components/ProgressBar';

const Product = ({ product, openPopUp }) => {
  const { id, name, img, unit, isMax, isLow, currently } = product;
  return (
    <li className="flex mb-4 py-5 px-12 bg-white h-32 rounded">
      <div className="flex item-center pr-2 w-1/6">
        <img
          className="rounded block"
          src={img}
          alt={name}
          style={{
            maxHeight: 100,
          }}
        />
      </div>

      <div className="flex items-center w-1/6 px-2">
        <span className="text-lg md:text-xl">{name}</span>
      </div>

      <div className="flex justify-center items-center w-1/6 px-2">
        <span className="text-md md:text-lg">{currently}</span>
      </div>

      <div className="flex justify-center items-center w-1/6 px-2">
        <span className="text-md md:text-lg">{unit}</span>
      </div>

      <div className="flex justify-center items-center w-1/6 px-2">
        <div className="w-full">
          <ProgressBar isMax={isMax} isLow={isLow} currently={currently} />
        </div>
      </div>
      <div className="flex justify-end items-center w-1/6 pl-2">
        <Link
          to={`${process.env.PUBLIC_URL}/product/${id}/edit`}
          className="border-solid border-2 shadow border-green-500 bg-green-200 rounded-full p-2 mr-4 transform hover:scale-110 transition duration-100"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="19.986"
            height="19.986"
            viewBox="0 0 19.986 19.986"
          >
            <path
              id="icon-edit"
              d="M6.3,12.3l10-10a1,1,0,0,1,1.4,0l4,4a1,1,0,0,1,0,1.4l-10,10a1,1,0,0,1-.7.3H7a1,1,0,0,1-1-1V13a1,1,0,0,1,.3-.7ZM8,16h2.59l9-9L17,4.41l-9,9Zm10-2a1,1,0,0,1,2,0v6a2,2,0,0,1-2,2H4a2,2,0,0,1-2-2V6A2.006,2.006,0,0,1,4,4h6a1,1,0,0,1,0,2H4V20H18Z"
              transform="translate(-2 -2.014)"
              fill="#48bb78"
            />
          </svg>
        </Link>
        {openPopUp && (
          <button
            onClick={() => openPopUp(id)}
            type="button"
            className="border-solid border-2 shadow border-red-500 bg-red-200 rounded-full p-2 transform hover:scale-110 transition duration-100"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20">
              <path
                id="icon-trash"
                d="M8,6V4a2.006,2.006,0,0,1,2-2h4a2,2,0,0,1,2,2V6h5a1,1,0,0,1,0,2H20V20a2,2,0,0,1-2,2H6a2,2,0,0,1-2-2V8H3A1,1,0,0,1,3,6ZM6,8V20H18V8Zm8-2V4H10V6Zm-4,4a1,1,0,0,1,1,1v6a1,1,0,0,1-2,0V11A1,1,0,0,1,10,10Zm4,0a1,1,0,0,1,1,1v6a1,1,0,0,1-2,0V11A1,1,0,0,1,14,10Z"
                transform="translate(-2 -2)"
                fill="#f56565"
              />
            </svg>
          </button>
        )}
      </div>
    </li>
  );
};

Product.propTypes = {
  product: PropTypes.shape().isRequired,
  openPopUp: PropTypes.func.isRequired,
};

export default Product;
