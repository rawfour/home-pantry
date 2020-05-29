import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { connect } from 'react-redux';
import { addProduct as addProductAction } from 'services/productList/actions';
import Input from './Input';
import Select from './Select';
import ImageUpload from './ImageUpload';

const ValidationSchema = Yup.object().shape({
  name: Yup.string()
    .matches(/^[a-z]+$/i, {
      message: 'Product name should contain only letters',
      excludeEmptyString: true,
    })
    .min(2, 'Product name is too short')
    .max(20, 'Product name is too long')
    .required('Required'),
  currently: Yup.number()
    .min(0, 'Minimum number of products can be 0')
    .max(1000000, 'Nice try, but it`s too much')
    .typeError('Invalid number')
    .required('Required'),
  isMax: Yup.number()
    .min(Yup.ref('isLow'), 'Maximum number cannot be less than the minimum number')
    .max(1000000, 'Nice try, but it`s too much')
    .typeError('Invalid number')
    .required('Required'),
  isLow: Yup.number()
    .min(0, 'Minimum number of products can be 0')
    .max(Yup.ref('isMax'), 'Minimum number cannot be greater than the maximum number')
    .typeError('Invalid number')
    .required('Required'),
});

const AddForm = ({ addProduct, actionDone }) => {
  const initialValues = {
    name: '',
    category: 'Drinks',
    unit: 'kg',
    isMax: 3,
    isLow: 1,
    currently: 2,
  };
  const [image, setImage] = useState();

  const getImageFile = (file) => {
    setImage(file);
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={ValidationSchema}
      onSubmit={(values, { setSubmitting }) => {
        const { name, category, unit, isMax, isLow, currently } = values;
        addProduct(name, category, image, unit, isMax, isLow, currently);
        setSubmitting(false);
      }}
    >
      {({ values, handleChange, handleBlur, handleSubmit, isSubmitting }) => (
        <>
          {actionDone && (
            <div className="py-4 px-6 block text-sm md:text-base md:w-full rounded shadow mb-6 bg-green-200 text-green-600">
              <span>{actionDone}</span>
            </div>
          )}
          <div className="mb-4 py-12 px-8 md:px-12 bg-white rounded">
            <h2 className=" w-full pb-12 text-2xl">Add product</h2>
            <div className="flex flex-wrap">
              <form
                id="add"
                onSubmit={handleSubmit}
                className="w-full md:w-1/2 md:pr-4 lg:pr-16"
                noValidate
              >
                <Input
                  value={values.name}
                  type="text"
                  name="name"
                  id="product_name"
                  blur={handleBlur}
                  action={handleChange}
                  label="Product name"
                  errorMessage="name"
                />
                <Select
                  value={values.category}
                  name="category"
                  id="category"
                  blur={handleBlur}
                  action={handleChange}
                  label="Category"
                  options={[
                    'Drinks',
                    'Bread',
                    'Vegetables / Fruits',
                    'Meat',
                    'Dairy',
                    'Snacks',
                    'Uncategorized',
                  ]}
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
                  errorMessage="isMax"
                />
                <Input
                  value={values.isLow}
                  type="text"
                  name="isLow"
                  id="is_low"
                  blur={handleBlur}
                  action={handleChange}
                  label="Minimum number of products"
                  errorMessage="isLow"
                />
                <Input
                  value={values.currently}
                  type="text"
                  name="currently"
                  id="in_storage"
                  blur={handleBlur}
                  action={handleChange}
                  label="Have now"
                  errorMessage="currently"
                />
              </form>
              <div className="w-full md:w-1/2 md:pl-4 lg:pl-16">
                <ImageUpload getImageFile={getImageFile} />
              </div>
              <div className="flex flex-col md:flex-row md:justify-center pt-12 w-full border-t-2 border-gray-400 border-solid">
                <button
                  className="w-full md:w-auto cursor-pointer text-center mb-4 md:ml-4 md:order-2 duration-200 text-base px-4 md:px-16 py-2 leading-none rounded border-solid border-2 shadow border-green-500 bg-white hover:border-black hover:text-black text-green-500"
                  type="submit"
                  form="add"
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
  // image: PropTypes.shape(),
  addProduct: PropTypes.func.isRequired,
  actionDone: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]).isRequired,
};

AddForm.defaultProps = {
  // image: null,
};

const mapDispatchToProps = (dispatch) => ({
  addProduct: (name, category, image, unit, isMax, isLow, currently) =>
    dispatch(addProductAction(name, category, image, unit, isMax, isLow, currently)),
});

const mapStateToProps = (state) => {
  const {
    // image,
    actionDone,
  } = state.products;
  return {
    // image,
    actionDone,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AddForm);
