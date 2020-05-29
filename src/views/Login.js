import React from 'react';
import PropTypes from 'prop-types';
import { Link, withRouter } from 'react-router-dom';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { connect } from 'react-redux';
import Input from '../components/Input';
import { login } from '../firebase/index';
import { firebaseInitialized as firebaseInitializedAction } from '../services/authentication/actions';

const ValidationSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Required'),
  password: Yup.string()
    .matches(/[a-zA-Z]/, {
      message: 'Password can only contain letters',
      excludeEmptyString: true,
    })
    .min(6, 'Password should contain at least 6 characters')
    .required('Required'),
});

const SignIn = ({ history, firebaseInitialized }) => {
  const initialValues = {
    email: '',
    password: '',
  };

  async function signIn(email, password) {
    try {
      await login(email, password);
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
        const { email, password } = values;
        signIn(email, password);
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
          <h2 className=" w-full text-center pb-12 text-2xl">Sign in</h2>
          <form id="login" className="pb-4" onSubmit={handleSubmit} noValidate>
            <Input
              id="email"
              type="email"
              name="email"
              label="Email"
              errorMessage="email"
              value={values.email}
              blur={handleBlur}
              action={handleChange}
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
              form="login"
              disabled={isSubmitting}
            >
              Sign in
            </button>
            <span className="uppercase text-gray-700 text-xs font-bold">- or -</span>
            <Link
              className=" cursor-pointer w-56 text-center duration-200 text-base py-2 leading-none border-2 border-solid rounded border-gray-600 bg-white hover:text-green-500 text-gray-600 hover:border-green-500"
              to="/register"
            >
              Register
            </Link>
          </div>
        </div>
      )}
    </Formik>
  );
};

SignIn.propTypes = {
  history: PropTypes.shape().isRequired,
  firebaseInitialized: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  firebaseInitialized: (value) => dispatch(firebaseInitializedAction(value)),
});

export default withRouter(connect(null, mapDispatchToProps)(SignIn));
