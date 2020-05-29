import React from 'react';
import PropTypes from 'prop-types';

const PopUp = ({ removeProduct, closePopUp, productID }) => {
  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
      }}
    >
      <div
        className="px-16 py-10 bg-white rounded shadow"
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
        }}
      >
        <p className="bolck text-center mb-10 text-lg md:text-xl">
          Do you really want to remove this product?
        </p>
        <div className="flex justify-center items-center">
          <button
            onClick={closePopUp}
            type="button"
            className="duration-200 text-base mx-5 px-4 py-2 leading-none rounded border-solid border-2 shadow border-green-500 bg-white hover:bg-green-200 text-green-500"
          >
            Cancel
          </button>
          <button
            onClick={() => removeProduct(productID)}
            type="button"
            className="duration-200 text-base mx-5 px-4 py-2 leading-none rounded border-solid border-2 shadow border-red-500 bg-white hover:bg-red-200 text-red-500"
          >
            Remove
          </button>
        </div>
      </div>
    </div>
  );
};

PopUp.propTypes = {
  removeProduct: PropTypes.func.isRequired,
  closePopUp: PropTypes.func.isRequired,
  productID: PropTypes.string.isRequired,
};

export default PopUp;
