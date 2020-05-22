import React from 'react';
import PropTypes from 'prop-types';
import { Formik } from 'formik';
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
  const initialValues = {
    title: '',
    category: 'Drinks',
    unit: 'kg',
    isMax: 3,
    isLow: 1,
    currently: 2,
  };

  return (
    <Formik
      initialValues={initialValues}
      validate={(values) => {
        const errors = {};

        if (!values.title) {
          errors.title = 'Required';
        } else if (!/^[a-z]+$/i.test(values.title)) {
          errors.title = 'Invalid title';
        }

        if (!values.isMax) {
          errors.isMax = 'Required';
        } else if (!/^[0-9]+$/i.test(values.isMax)) {
          errors.isMax = 'Invalid number';
        }

        if (!values.isLow) {
          errors.isLow = 'Required';
        } else if (!/^[0-9]/.test(values.isLow)) {
          errors.isLow = 'Invalid number';
        }

        if (!values.currently) {
          errors.currently = 'Required';
        } else if (!/^[0-9]/.test(values.currently)) {
          errors.currently = 'Invalid number';
        }

        return errors;
      }}
      onSubmit={(values, { setSubmitting }) => {
        const { title, category, unit, isMax, isLow, currently } = values;
        addProduct(title, category, image, unit, isMax, isLow, currently);
        setSubmitting(false);
      }}
    >
      {({ values, errors, touched, handleChange, handleBlur, handleSubmit, isSubmitting }) => (
        <>
          {actionDone && (
            <div className="py-4 px-6 block text-sm md:text-base md:w-full rounded shadow mb-6 bg-green-200 text-green-40">
              <span>{actionDone}</span>
            </div>
          )}
          <div className="mb-4 py-12 px-8 md:px-12 bg-white rounded">
            <h2 className=" w-full pb-12 text-2xl">Add product</h2>
            <div className="flex flex-wrap">
              <form
                id="edit"
                onSubmit={handleSubmit}
                className="w-full md:w-1/2 md:pr-4 lg:pr-16"
                noValidate
              >
                <Input
                  value={values.title}
                  type="text"
                  name="title"
                  id="product_name"
                  blur={handleBlur}
                  action={handleChange}
                  label="Product name"
                />
                {errors.title && touched.title && errors.title}
                <Select
                  value={values.category}
                  name="category"
                  id="category"
                  blur={handleBlur}
                  action={handleChange}
                  label="Category"
                  options={['Drinks', 'Bread', 'Vegetables / Fruits', 'Meat', 'Dairy']}
                />

                <Select
                  value={values.unit}
                  name="unit"
                  id="unit"
                  blur={handleBlur}
                  action={handleChange}
                  label="Unit"
                  options={['kg', 'g', 'l', 'ml', 'packets', 'boxs', 'pieces', 'bottles', 'cans']}
                />

                <Input
                  value={values.isMax}
                  type="text"
                  name="isMax"
                  id="is_max"
                  blur={handleBlur}
                  action={handleChange}
                  label="Maximum number of products"
                />
                {errors.isMax && touched.isMax && errors.isMax}
                <Input
                  value={values.isLow}
                  type="text"
                  name="isLow"
                  id="is_low"
                  blur={handleBlur}
                  action={handleChange}
                  label="Minimal number of products"
                />
                {errors.isLow && touched.isLow && errors.isLow}
                <Input
                  value={values.currently}
                  type="text"
                  name="currently"
                  id="in_storage"
                  blur={handleBlur}
                  action={handleChange}
                  label="Current number of products"
                />
                {errors.currently && touched.currently && errors.currently}
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
                  disabled={isSubmitting}
                >
                  Add product
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </Formik>
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
