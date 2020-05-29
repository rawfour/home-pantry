import React from 'react';
import PropTypes from 'prop-types';
import { Link, withRouter } from 'react-router-dom';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { connect } from 'react-redux';
import Input from '../components/Input';
import { register, addPantry } from '../firebase/index';
import { firebaseInitialized as firebaseInitializedAction } from '../services/authentication/actions';

const ValidationSchema = Yup.object().shape({
  name: Yup.string()
    .matches(/^[a-z]+$/i, {
      message: 'Name should contain only letters',
      excludeEmptyString: true,
    })
    .min(2, 'Name is too short')
    .max(20, 'Product name is too long')
    .required('Required'),
  email: Yup.string().email('Invalid email').required('Required'),
  password: Yup.string()
    .matches(/[a-zA-Z]/, {
      message: 'Password can only contain letters',
      excludeEmptyString: true,
    })
    .min(6, 'Password should contain at least 6 characters')
    .required('Required'),
});

const Register = ({ history, firebaseInitialized }) => {
  const initialValues = {
    name: '',
    email: '',
    password: '',
  };

  async function onRegister(name, email, password) {
    try {
      await register(name, email, password);
      await addPantry();
      await firebaseInitialized();
      history.replace('/yourStorage');
    } catch (error) {
      alert(error.message);
    }
  }

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={ValidationSchema}
      onSubmit={(values, { setSubmitting }) => {
        const { name, email, password } = values;
        onRegister(name, email, password);
        setSubmitting(false);
      }}
    >
      {({ values, handleChange, handleBlur, handleSubmit, isSubmitting }) => (
        <div
          className="mb-4 mx-auto p-12 bg-white rounded"
          style={{
            minWidth: '300px',
            maxWidth: '500px',
          }}
        >
          <h2 className=" w-full text-center pb-12 text-2xl">Sign up</h2>
          <form id="register" className="pb-4" onSubmit={handleSubmit} noValidate>
            <Input
              id="name"
              name="name"
              type="text"
              value={values.name}
              action={handleChange}
              label="Name"
              errorMessage="name"
              blur={handleBlur}
            />
            <Input
              id="email"
              name="email"
              type="email"
              value={values.email}
              action={handleChange}
              label="Email"
              errorMessage="email"
              blur={handleBlur}
            />
            <Input
              name="password"
              type="password"
              id="password"
              label="Password"
              errorMessage="password"
              value={values.password}
              action={handleChange}
              blur={handleBlur}
            />
          </form>

          <div className="flex flex-col gap-5 items-center justify-center pt-10 w-full border-t-2 border-gray-400 border-solid">
            <button
              className=" cursor-pointer w-56 text-center duration-200 text-base py-2 leading-none rounded border-solid border-2 shadow border-green-500 bg-white hover:border-gray-600 hover:text-gray-600 text-green-500"
              type="submit"
              form="register"
              disabled={isSubmitting}
            >
              Register
            </button>
            <span className="uppercase text-gray-700 text-xs font-bold">- or -</span>
            <Link
              className=" cursor-pointer w-56 text-center duration-200 text-base py-2 leading-none border-2 border-solid rounded border-gray-600 bg-white hover:text-green-500 text-gray-600 hover:border-green-500"
              to="/login"
            >
              Go back to Login
            </Link>
          </div>
        </div>
      )}
    </Formik>
  );
};

Register.propTypes = {
  history: PropTypes.shape().isRequired,
  firebaseInitialized: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  firebaseInitialized: (value) => dispatch(firebaseInitializedAction(value)),
});

export default withRouter(connect(null, mapDispatchToProps)(Register));
