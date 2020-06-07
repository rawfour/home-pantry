import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Link, withRouter } from 'react-router-dom';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { connect } from 'react-redux';
import Input from '../components/Input';
import { login } from '../firebase/index';
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
  grid-gap: 10px;
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
  text-align: center;
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  font-size: ${({ theme }) => theme.fontSizes.s};
`;

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
        <PageContentWrapper small>
          <Title>Sign in</Title>
          <Form id="login" onSubmit={handleSubmit} noValidate>
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
          </Form>
          <ButtonsWrapper>
            <InnerWrapper>
              <Button longer type="submit" form="login" disabled={isSubmitting}>
                Sign in
              </Button>
              <Separator>- or -</Separator>
              <Link to="/register">
                <Button longer reverse>
                  Sign up
                </Button>
              </Link>
            </InnerWrapper>
          </ButtonsWrapper>
        </PageContentWrapper>
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
