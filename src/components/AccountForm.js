import React, { useState, useEffect } from 'react';

import styled from 'styled-components'; // , { css }
import { connect } from 'react-redux';
import { Formik } from 'formik';
import { Link } from 'react-router-dom';
import * as Yup from 'yup';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import Input from './Input';
import Title from './page/PageTitle';
import PageContentWrapper from './page/PageContentWrapper';
// import ImageUpload from './ImageUpload';
import { updateUserName, getCurrentUserProfile } from '../firebase/index';
// import Basic from './userAccount/Basic';
// import Advanced from './userAccount/Advanced';
import MessageDone from './MessageDone';
import Button from './Button';

const ContentWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

const Form = styled.form`
  width: 100%;
  @media ${({ theme }) => theme.breakpoints.md} {
    width: 50%;
    padding-right: 16px;
  }
  @media ${({ theme }) => theme.breakpoints.lg} {
    padding-right: 64px;
  }
`;

const ImageLoaderWrapper = styled.div`
  width: 100%;
  @media ${({ theme }) => theme.breakpoints.md} {
    width: 50%;
    padding-left: 16px;
  }
  @media ${({ theme }) => theme.breakpoints.lg} {
    padding-left: 64px;
  }
`;

const ButtonsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding-top: 48px;
  width: 100%;
  border-top: 2px solid ${({ theme }) => theme.colors.lightGray};
  @media ${({ theme }) => theme.breakpoints.md} {
    flex-direction: row;
    justify-content: center;
  }
`;

const StyledButton = styled(Button)`
  margin: 8px 0;
  @media ${({ theme }) => theme.breakpoints.md} {
    margin: 0 8px;
  }
`;

// const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

const ValidationSchema = Yup.object().shape({
  name: Yup.string()
    .matches(/^[a-z]+$/i, {
      message: 'User name should contain only letters',
      excludeEmptyString: true,
    })
    .min(2, 'User name is too short')
    .max(20, 'User name is too long')
    .required('Required'),
  // email: Yup.string().email('Invalid email').required('Required'),
  // tel: Yup.string().matches(phoneRegExp, {
  //   message: 'Invalid phone number',
  //   excludeEmptyString: true,
  // }),
  // password: Yup.string()
  //   .matches(/[a-zA-Z]/, {
  //     message: 'Password can only contain letters',
  //     excludeEmptyString: true,
  //   })
  //   .min(6, 'Password should contain at least 6 characters')
  //   .required('Required'),
});

const AccountForm = () => {
  const [formData, setFormData] = useState({});
  const [actionDone, setActionDone] = useState(false);

  useEffect(() => {
    const unsubscribe = () => {
      const user = getCurrentUserProfile();
      setFormData(user);
    };

    return unsubscribe();
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => setActionDone(false), 4000);
    return () => clearTimeout(timer);
  }, [actionDone]);

  const onSubmit = (name) => {
    updateUserName(name);
    setActionDone(true);
  };

  return (
    <>
      {actionDone && <MessageDone>Changes saved</MessageDone>}
      {formData.name && (
        <Formik
          initialValues={formData}
          validationSchema={ValidationSchema}
          onSubmit={(values, { setSubmitting }) => {
            const { name } = values;
            setSubmitting(false);
            onSubmit(name);
          }}
        >
          {({ values, handleChange, handleBlur, handleSubmit, isSubmitting }) => (
            <>
              <PageContentWrapper>
                <Title align="left">Your account</Title>
                {/* <TabsWrapper>
                  <Tab active type="button">
                    Basic
                  </Tab>
                  <Tab type="button">Advanced</Tab>
                </TabsWrapper> */}
                <>
                  <ContentWrapper>
                    <Form id="user_edit" onSubmit={handleSubmit} noValidate>
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
                    </Form>
                    <ImageLoaderWrapper>
                      {/* <ImageUpload url={formData.img} getImageFile={getImageFile} /> */}
                    </ImageLoaderWrapper>
                    <ButtonsWrapper>
                      <Link to="/yourStorage" type="button">
                        <StyledButton reverse>
                          <ArrowBackIosIcon />
                          Back
                        </StyledButton>
                      </Link>
                      <StyledButton type="submit" form="user_edit" disabled={isSubmitting}>
                        Save changes
                      </StyledButton>
                    </ButtonsWrapper>
                  </ContentWrapper>
                </>
              </PageContentWrapper>
            </>
          )}
        </Formik>
      )}
    </>
  );
};

const mapStateToProps = (state) => {
  const { loading } = state.loading;
  return {
    loading,
  };
};

export default connect(mapStateToProps, null)(AccountForm);
