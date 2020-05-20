import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  setImage as setImageAction,
  removeImage as removeImageAction,
  addProduct as addProductAction,
} from 'services/productList/actions';
import Input from './Input';
import Select from './Select';
import ImageUpload from './ImageUpload';

const AddForm = ({ image, url, error, setImage, removeImage, addProduct, actionDone }) => {
  const initialState = {
    title: '',
    category: 'Drinks',
    unit: 'kg',
    isMax: 3,
    isLow: 1,
    currently: 2,
  };

  const [{ title, category, unit, isMax, isLow, currently }, setFormData] = useState(initialState);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!error.isError && image) {
      addProduct(title, category, image, unit, isMax, isLow, currently);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
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
            <Input
              value={title}
              type="text"
              name="title"
              id="product_name"
              action={handleInputChange}
              label="Product name"
            />

            <Select
              value={category}
              name="category"
              id="category"
              action={handleInputChange}
              label="Category"
              options={['Drinks', 'Bread', 'Vegetables / Fruits', 'Meat', 'Dairy']}
            />

            <Select
              value={unit}
              name="unit"
              id="unit"
              action={handleInputChange}
              label="Unit"
              options={['kg', 'g', 'l', 'ml', 'packets', 'boxs', 'pieces', 'bottles', 'cans']}
            />

            <Input
              value={isMax}
              type="number"
              name="isMax"
              id="is_max"
              action={handleInputChange}
              label="Maximum number of products"
            />

            <Input
              value={isLow}
              type="number"
              name="isLow"
              id="is_low"
              action={handleInputChange}
              label="Minimal number of products"
            />

            <Input
              value={currently}
              type="number"
              name="currently"
              id="in_storage"
              action={handleInputChange}
              label="Current number of products"
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

AddForm.propTypes = {
  image: PropTypes.shape(),
  url: PropTypes.string,
  error: PropTypes.shape({ isError: PropTypes.bool, errorMes: PropTypes.string }),
  setImage: PropTypes.func.isRequired,
  removeImage: PropTypes.func.isRequired,
  addProduct: PropTypes.func.isRequired,
  actionDone: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]).isRequired,
};

AddForm.defaultProps = {
  image: null,
  url: null,
  error: {
    isError: false,
    errorMes: null,
  },
};

const mapDispatchToProps = (dispatch) => ({
  setImage: (file) => dispatch(setImageAction(file)),
  removeImage: () => dispatch(removeImageAction()),
  addProduct: (name, category, image, unit, isMax, isLow, currently) =>
    dispatch(addProductAction(name, category, image, unit, isMax, isLow, currently)),
});

const mapStateToProps = (state) => {
  const { image, url, error, actionDone } = state.products;
  return { image, url, error, actionDone };
};

export default connect(mapStateToProps, mapDispatchToProps)(AddForm);
