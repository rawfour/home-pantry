import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Formik } from 'formik';
import { Link } from 'react-router-dom';
import * as Yup from 'yup';
import Input from './Input';
import Loading from './Loader';
// import ImageUpload from './ImageUpload';
import { userEdit as userEditAction } from '../services/authentication/actions';
import { getCurrentUserProfile } from '../firebase/index';
import Backdrop from './Backdrop';
import withBackdrop from '../hoc/withBackdrop';

const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

const ValidationSchema = Yup.object().shape({
  name: Yup.string()
    .matches(/^[a-z]+$/i, {
      message: 'User name should contain only letters',
      excludeEmptyString: true,
    })
    .min(2, 'User name is too short')
    .max(20, 'User name is too long')
    .required('Required'),
  email: Yup.string().email('Invalid email').required('Required'),
  tel: Yup.string().matches(phoneRegExp, {
    message: 'Invalid phone number',
    excludeEmptyString: true,
  }),
});

const AccountForm = ({ loading, userEdit, open, onOpen, onClose }) => {
  const [formData, setFormData] = useState({});
  const [actionDone, setActionDone] = useState(false);

  useEffect(() => {
    async function getCurrentUser() {
      const currentUser = await getCurrentUserProfile();
      setFormData(currentUser);
    }
    getCurrentUser();
  }, []);

  const handleActionDone = () => {
    setActionDone(true);
    setTimeout(() => {
      setActionDone(false);
    }, 4000);
  };

  const onSubmit = async (name) => {
    onOpen();
    await userEdit(name);
    const updatedUser = await getCurrentUserProfile();
    setFormData(updatedUser);
    setTimeout(() => {
      onClose();
      handleActionDone();
    }, 4000);
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
            const {
              name,
              // email,
              //  tel
            } = values;
            setSubmitting(false);
            onSubmit(name);
          }}
        >
          {({ values, handleChange, handleBlur, handleSubmit, isSubmitting }) => (
            <>
              <div className="py-12 px-8 md:px-12 bg-white rounded">
                <h2 className=" w-full pb-12 text-2xl">Your account</h2>
                {loading.fetchSingle ? (
                  <Loading />
                ) : (
                  <>
                    <div className="flex flex-wrap">
                      <form
                        id="user_edit"
                        onSubmit={handleSubmit}
                        className="w-full md:w-1/2 md:pr-4 lg:pr-16"
                        noValidate
                      >
                        <Input
                          value={values.name}
                          type="text"
                          name="name"
                          id="user_name"
                          blur={handleBlur}
                          action={handleChange}
                          label="User name"
                          errorMessage="name"
                        />
                        {/* <Input
                          id="email"
                          name="email"
                          type="email"
                          value={values.email}
                          action={handleChange}
                          label="Email"
                          errorMessage="email"
                          blur={handleBlur}
                        /> */}
                        {/* <Input
                      id="tel"
                      name="tel"
                      type="text"
                      value={values.tel}
                      action={handleChange}
                      label="Phone number"
                      errorMessage="tel"
                      blur={handleBlur}
                    /> */}
                      </form>
                      <div className="w-full md:w-1/2 md:pl-4 lg:pl-16">
                        {/* <ImageUpload url={formData.img} getImageFile={getImageFile} /> */}
                      </div>
                      <div className="flex flex-col md:flex-row md:justify-center pt-12 w-full border-t-2 border-gray-400 border-solid">
                        <button
                          className="w-full md:w-auto cursor-pointer text-center mb-4 md:ml-4 md:order-2 duration-200 text-base px-4 md:px-16 py-2 leading-none rounded border-solid border-2 shadow border-green-500 bg-white hover:border-black hover:text-black text-green-500"
                          type="submit"
                          form="user_edit"
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
      {loading.userEdit && <Backdrop open={open} />}
    </>
  );
};

AccountForm.propTypes = {
  userEdit: PropTypes.func.isRequired,
  loading: PropTypes.shape().isRequired,
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onOpen: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  userEdit: (name, email) => dispatch(userEditAction(name, email)),
});

const mapStateToProps = (state) => {
  const { loading } = state.loading;
  return {
    loading,
  };
};

export default withBackdrop(connect(mapStateToProps, mapDispatchToProps)(AccountForm));
