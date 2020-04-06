import React, { useState } from 'react';
import PropTypes from 'prop-types';
import ImageUpload from 'components/ImageUpload';
import { connect } from 'react-redux';

import {
  addProduct as addProductAction,
  openPopUp as openPopUpAction,
  setImage as setImageAction,
  removeImage as removeImageAction,
} from 'services/productList/actions';

const AddProduct = ({ image, url, error, setImage, removeImage, addProduct, actionDone }) => {
  const [name, setName] = useState('');
  const [category, setCategory] = useState('Drinks');
  const [unit, setUnit] = useState('kg');
  const [isMax, setMax] = useState(3);
  const [isLow, setLow] = useState(1);
  const [currently, setCurrently] = useState(2);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!error.isError && image) {
      const succesMes = 'The product has been added.';
      addProduct(name, category, image, unit, isMax, isLow, currently, succesMes);
    }
  };
  return (
    <>
      {actionDone && (
        <div className="py-4 px-6 block text-sm md:text-base md:w-full rounded shadow mb-6 bg-green-200 text-green-40">
          <span>{actionDone}</span>
        </div>
      )}
      <div className="mb-4 py-12 px-8 md:px-12 bg-white rounded">
        <h2 className=" w-full pb-12 text-2xl">Add product</h2>
        <div className="flex flex-wrap">
          <form id="edit" onSubmit={handleSubmit} className="w-full md:w-1/2 md:pr-4 lg:pr-16">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              htmlFor="product_name"
            >
              Product name
            </label>
            <input
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-6 leading-tight focus:outline-none focus:bg-white"
              id="product_name"
              type="text"
              onChange={(e) => setName(e.target.value)}
              value={name}
            />

            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              htmlFor="category"
            >
              Category
            </label>
            <select
              className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 mb-6 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              id="category"
              onChange={(e) => setCategory(e.target.value)}
              value={category}
            >
              <option>Drinks</option>
              <option>Bread</option>
              <option>Vegetables / Fruits</option>
              <option>Meat</option>
              <option>Dairy</option>
            </select>

            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              htmlFor="unit"
            >
              Unit
            </label>
            <select
              className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 mb-6 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              id="unit"
              onChange={(e) => setUnit(e.target.value)}
              value={unit}
            >
              <option>kg</option>
              <option>g</option>
              <option>l</option>
              <option>ml</option>
              <option>packets</option>
              <option>boxs</option>
              <option>pieces</option>
              <option>bottles</option>
              <option>cans</option>
            </select>
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              htmlFor="is_max"
            >
              Maximum number of products
            </label>
            <input
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-6 md:mb-12 leading-tight focus:outline-none focus:bg-white"
              id="is_max"
              type="number"
              onChange={(e) => setMax(e.target.value)}
              value={isMax}
            />
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              htmlFor="is_low"
            >
              Minimal number of products
            </label>
            <input
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-6 md:mb-12 leading-tight focus:outline-none focus:bg-white"
              id="is_low"
              type="number"
              onChange={(e) => setLow(e.target.value)}
              value={isLow}
            />
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              htmlFor="in_storage"
            >
              Current number of products
            </label>
            <input
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-6 md:mb-12 leading-tight focus:outline-none focus:bg-white"
              id="in_storage"
              type="number"
              onChange={(e) => setCurrently(e.target.value)}
              value={currently}
            />
          </form>
          <div className="w-full md:w-1/2 md:pl-4 lg:pl-16">
            <ImageUpload
              setImage={setImage}
              removeImage={removeImage}
              image={image}
              error={error}
              url={url}
            />
          </div>
          <div className="flex flex-col md:flex-row md:justify-center pt-12 w-full border-t-2 border-gray-400 border-solid">
            <button
              className="w-full md:w-auto cursor-pointer text-center mb-4 md:ml-4 md:order-2 duration-200 text-base px-4 md:px-16 py-2 leading-none rounded border-solid border-2 shadow border-green-500 bg-white hover:border-black hover:text-black text-green-500"
              type="submit"
              form="edit"
            >
              Add product
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

AddProduct.propTypes = {
  image: PropTypes.shape(),
  url: PropTypes.string,
  error: PropTypes.shape({ isError: PropTypes.bool, errorMes: PropTypes.string }),
  setImage: PropTypes.func.isRequired,
  removeImage: PropTypes.func.isRequired,
  addProduct: PropTypes.func.isRequired,
  actionDone: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]).isRequired,
};

AddProduct.defaultProps = {
  image: null,
  url: null,
  error: {
    isError: false,
    errorMes: null,
  },
};

const mapDispatchToProps = (dispatch) => ({
  setImage: (file) => dispatch(setImageAction(file)),
  openPopUp: () => dispatch(openPopUpAction()),
  removeImage: () => dispatch(removeImageAction()),
  addProduct: (name, category, image, unit, isMax, isLow, currently, succesMes) =>
    dispatch(addProductAction(name, category, image, unit, isMax, isLow, currently, succesMes)),
});

const mapStateToProps = (state) => {
  const { image, url, error, actionDone } = state.products;
  return { image, url, error, actionDone };
};

export default connect(mapStateToProps, mapDispatchToProps)(AddProduct);
