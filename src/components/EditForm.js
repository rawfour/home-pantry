import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import {
  fetchSingleProduct as fetchSingleProductAction,
  editProduct as editProductAction,
  setImage as setImageAction,
  removeImage as removeImageAction,
} from 'services/productList/actions';
import Input from './Input';
import Select from './Select';
import ImageUpload from './ImageUpload';

const EditForm = ({
  id,
  image,
  singleProduct,
  error,
  setImage,
  removeImage,
  editProduct,
  fetchSingleProduct,
  actionDone,
}) => {
  const [{ name, currently, category, img, unit }, setFormData] = useState(singleProduct);

  const handleInputChange = (e) => {
    const inputName = e.target.name;
    const inputValue = e.target.value;

    setFormData((prevState) => ({ ...prevState, [inputName]: inputValue }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!error.isError) {
      editProduct(id, name, category, image, img, unit, currently);
    }
  };

  useEffect(() => {
    fetchSingleProduct(id);
    setFormData(singleProduct);
  }, [singleProduct.name]);

  return (
    <>
      {actionDone && (
        <div className="py-4 px-6 block text-sm md:text-base md:w-full rounded shadow mb-6 bg-green-200 text-green-40">
          <span>{actionDone}</span>
        </div>
      )}
      <div className="mb-4 py-12 px-8 md:px-12 bg-white rounded">
        <h2 className=" w-full pb-12 text-2xl">Product edit</h2>
        <div className="flex flex-wrap">
          <form id="edit" onSubmit={handleSubmit} className="w-full md:w-1/2 md:pr-4 lg:pr-16">
            <Input
              value={name}
              type="text"
              name="name"
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
              url={img}
            />
          </div>
          <div className="flex flex-col md:flex-row md:justify-center pt-12 w-full border-t-2 border-gray-400 border-solid">
            <button
              className="w-full md:w-auto cursor-pointer text-center mb-4 md:ml-4 md:order-2 duration-200 text-base px-4 md:px-16 py-2 leading-none rounded border-solid border-2 shadow border-green-500 bg-white hover:border-black hover:text-black text-green-500"
              type="submit"
              form="edit"
            >
              Save changes
            </button>
            <Link
              to={`${process.env.PUBLIC_URL}/yourStorage`}
              className="w-full md:w-auto cursor-pointer text-center mb-4 md:mr-4 duration-200 text-base px-4 md:px-16 py-2 leading-none rounded border-solid border-2 shadow border-red-500 bg-white hover:border-black hover:text-black text-red-500"
              type="button"
            >
              Back
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

EditForm.propTypes = {
  id: PropTypes.string.isRequired,
  image: PropTypes.shape(),
  error: PropTypes.shape({ isError: PropTypes.bool, errorMes: PropTypes.string }),
  setImage: PropTypes.func.isRequired,
  removeImage: PropTypes.func.isRequired,
  singleProduct: PropTypes.shape(),
  fetchSingleProduct: PropTypes.func.isRequired,
  editProduct: PropTypes.func.isRequired,
  actionDone: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]).isRequired,
};

EditForm.defaultProps = {
  singleProduct: {},
  image: null,
  error: {
    isError: false,
    errorMes: null,
  },
};

const mapDispatchToProps = (dispatch) => ({
  setImage: (file) => dispatch(setImageAction(file)),
  fetchSingleProduct: (id) => dispatch(fetchSingleProductAction(id)),
  removeImage: () => dispatch(removeImageAction()),
  editProduct: (id, nameValue, categoryValue, imageValue, img, unitValue, currentlyValue) =>
    dispatch(
      editProductAction(id, nameValue, categoryValue, imageValue, img, unitValue, currentlyValue),
    ),
});

const mapStateToProps = (state) => {
  const { image, error, actionDone, singleProduct } = state.products;
  return { image, error, actionDone, singleProduct };
};

export default connect(mapStateToProps, mapDispatchToProps)(EditForm);
