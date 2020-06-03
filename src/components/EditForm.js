import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import {
  fetchSingleProduct as fetchSingleProductAction,
  editProduct as editProductAction,
} from 'services/productList/actions';
import Input from './Input';
import Select from './Select';
import ImageUpload from './ImageUpload';
import Loading from './Loader';
import Backdrop from './Backdrop';
import withBackdrop from '../hoc/withBackdrop';

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
});

const EditForm = ({ id, editProduct, fetchSingleProduct, loading, open, onOpen, onClose }) => {
  const [formData, setFormData] = useState({});
  const [image, setImage] = useState();
  const [actionDone, setActionDone] = useState(false);

  useEffect(() => {
    async function getProduct() {
      const response = await fetchSingleProduct(id);
      setFormData(response);
    }
    getProduct();
  }, []);

  const getImageFile = (file) => {
    setImage(file);
  };

  const handleActionDone = () => {
    setActionDone(true);
    setTimeout(() => {
      setActionDone(false);
    }, 4000);
  };

  const onSubmit = async (name, category, unit, currently) => {
    onOpen();
    await editProduct(id, name, category, image, formData.img, unit, currently);
    onClose();
    handleActionDone();
  };

  return (
    <>
      {actionDone && (
        <div className="py-4 px-6 block text-sm md:text-base md:w-full rounded shadow mb-6 bg-green-200 text-green-600">
          <span>Changes saved</span>
        </div>
      )}
      {formData.name && (
        <Formik
          initialValues={formData}
          validationSchema={ValidationSchema}
          onSubmit={(values, { setSubmitting }) => {
            const { name, category, unit, currently } = values;
            setSubmitting(false);
            onSubmit(name, category, unit, currently);
          }}
        >
          {({ values, handleChange, handleBlur, handleSubmit, isSubmitting }) => (
            <>
              <div className="py-12 px-8 md:px-12 bg-white rounded">
                <h2 className=" w-full pb-12 text-2xl">Product edit</h2>
                {loading.fetchSingle ? (
                  <Loading />
                ) : (
                  <>
                    <div className="flex flex-wrap">
                      <form
                        id="edit"
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
                          options={[
                            'kg',
                            'g',
                            'l',
                            'ml',
                            'packets',
                            'boxs',
                            'pieces',
                            'bottles',
                            'cans',
                          ]}
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
                          tooltip
                          tooltipText="The current amount of this product you have right now."
                        />
                      </form>
                      <div className="w-full md:w-1/2 md:pl-4 lg:pl-16">
                        <ImageUpload url={formData.img} getImageFile={getImageFile} />
                      </div>
                      <div className="flex flex-col md:flex-row md:justify-center pt-12 w-full border-t-2 border-gray-400 border-solid">
                        <button
                          className="w-full md:w-auto cursor-pointer text-center mb-4 md:ml-4 md:order-2 duration-200 text-base px-4 md:px-16 py-2 leading-none rounded border-solid border-2 shadow border-green-500 bg-white hover:border-black hover:text-black text-green-500"
                          type="submit"
                          form="edit"
                          disabled={isSubmitting}
                        >
                          Save changes
                        </button>
                        <Link
                          to="/yourStorage"
                          className="w-full md:w-auto cursor-pointer text-center mb-4 md:mr-4 duration-200 text-base px-4 md:px-16 py-2 leading-none rounded border-solid border-2 shadow border-red-500 bg-white hover:border-black hover:text-black text-red-500"
                          type="button"
                        >
                          Back
                        </Link>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </>
          )}
        </Formik>
      )}
      {loading.editProduct && <Backdrop open={open} />}
    </>
  );
};

EditForm.propTypes = {
  id: PropTypes.string.isRequired,
  fetchSingleProduct: PropTypes.func.isRequired,
  editProduct: PropTypes.func.isRequired,
  loading: PropTypes.shape().isRequired,
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onOpen: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  fetchSingleProduct: (id) => dispatch(fetchSingleProductAction(id)),
  editProduct: (id, nameValue, categoryValue, imageFile, img, unitValue, currentlyValue) =>
    dispatch(
      editProductAction(id, nameValue, categoryValue, imageFile, img, unitValue, currentlyValue),
    ),
});

const mapStateToProps = (state) => {
  const { loading } = state.loading;
  return {
    loading,
  };
};

export default withBackdrop(connect(mapStateToProps, mapDispatchToProps)(EditForm));
