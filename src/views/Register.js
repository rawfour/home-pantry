import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Link, withRouter } from 'react-router-dom';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { connect } from 'react-redux';
import Input from '../components/Input';
import { register, addPantry } from '../firebase/index';
import { firebaseInitialized as firebaseInitializedAction } from '../services/authentication/actions';
import PageContentWrapper from '../components/page/PageContentWrapper';
import Title from '../components/page/PageTitle';
import Button from '../components/Button';

const Form = styled.form`
  padding-bottom: 16px;
`;

const ButtonsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding-top: 16px;
  width: 100%;
  border-top: 2px solid ${({ theme }) => theme.colors.lightGray};
  @media ${({ theme }) => theme.breakpoints.sm} {
    align-items: center;
    justify-content: center;
  }
`;

const InnerWrapper = styled.div`
  width: 100%;
  grid-gap: 10px;
  display: inline-flex;
  flex-direction: column;
  margin: 0 auto;
  @media ${({ theme }) => theme.breakpoints.sm} {
    width: auto;
  }
`;

const Separator = styled.span`
  text-transform: uppercase;
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  font-size: ${({ theme }) => theme.fontSizes.s};
  text-align: center;
`;

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
        <PageContentWrapper small>
          <Title>Sign up</Title>
          <Form id="register" onSubmit={handleSubmit} noValidate>
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
          </Form>

          <ButtonsWrapper>
            <InnerWrapper>
              <Button longer type="submit" form="register" disabled={isSubmitting}>
                Register
              </Button>
              <Separator>- or -</Separator>
              <Link to="/login">
                <Button longer reverse>
                  Go back to Login
                </Button>
              </Link>
            </InnerWrapper>
          </ButtonsWrapper>
        </PageContentWrapper>
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
