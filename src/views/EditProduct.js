import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import ImageUpload from 'components/ImageUpload';
import { connect } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import {
  fetchSingleProduct as fetchSingleProductAction,
  editProduct as editProductAction,
  setImage as setImageAction,
  removeImage as removeImageAction,
} from 'services/productList/actions';

const EditProduct = ({
  image,
  singleProduct,
  error,
  setImage,
  removeImage,
  editProduct,
  fetchSingleProduct,
  actionDone,
}) => {
  const { id } = useParams();

  const { name, currently, category, img, unit } = singleProduct;
  const [nameValue, setName] = useState(name);
  const [categoryValue, setCategory] = useState(category);
  const [unitValue, setUnit] = useState(unit);
  const [currentlyValue, setCurrently] = useState(currently);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!error.isError) {
      const succesMes = 'Changes saved.';
      editProduct(id, nameValue, categoryValue, image, img, unitValue, currentlyValue, succesMes);
    }
  };

  useEffect(() => {
    fetchSingleProduct(id);
    setName(name);
    setCategory(category);
    setUnit(unit);
    setCurrently(currently);
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
              value={nameValue}
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
              value={categoryValue}
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
              value={unitValue}
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
              htmlFor="in_storage"
            >
              Products in storage
            </label>
            <input
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-6 md:mb-12 leading-tight focus:outline-none focus:bg-white"
              id="in_storage"
              type="number"
              onChange={(e) => setCurrently(e.target.value)}
              value={currentlyValue}
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

EditProduct.propTypes = {
  image: PropTypes.shape(),
  error: PropTypes.shape({ isError: PropTypes.bool, errorMes: PropTypes.string }),
  setImage: PropTypes.func.isRequired,
  removeImage: PropTypes.func.isRequired,
  singleProduct: PropTypes.shape(),
  fetchSingleProduct: PropTypes.func.isRequired,
  editProduct: PropTypes.func.isRequired,
  actionDone: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]).isRequired,
};

EditProduct.defaultProps = {
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
  editProduct: (
    id,
    nameValue,
    categoryValue,
    imageValue,
    img,
    unitValue,
    currentlyValue,
    succesMes,
  ) =>
    dispatch(
      editProductAction(
        id,
        nameValue,
        categoryValue,
        imageValue,
        img,
        unitValue,
        currentlyValue,
        succesMes,
      ),
    ),
});

const mapStateToProps = (state) => {
  const { image, error, actionDone, singleProduct } = state.products;
  return { image, error, actionDone, singleProduct };
};

export default connect(mapStateToProps, mapDispatchToProps)(EditProduct);
