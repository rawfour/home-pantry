import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import {
  fetchSingleProduct as fetchSingleProductAction,
  editProduct as editProductAction,
} from 'services/productList/actions';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import Input from './Input';
import Select from './Select';
import ImageUpload from './ImageUpload';
import Loading from './Loader';
import Backdrop from './Backdrop';
import withBackdrop from '../hoc/withBackdrop';
import PageContentWrapper from './page/PageContentWrapper';
import Title from './page/PageTitle';
import Button from './Button';
import MessageDone from './MessageDone';

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
    align-items: center;
  }
`;

const StyledButton = styled(Button)`
  margin: 8px 0;
  @media ${({ theme }) => theme.breakpoints.md} {
    margin: 0 8px;
  }
`;

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
      {actionDone && <MessageDone>Changes saved</MessageDone>}
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
            <PageContentWrapper>
              <Title align="left">Product edit</Title>
              {loading.fetchSingle ? (
                <Loading />
              ) : (
                <>
                  <ContentWrapper>
                    <Form id="edit" onSubmit={handleSubmit} noValidate>
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
                    </Form>
                    <ImageLoaderWrapper>
                      <ImageUpload url={formData.img} getImageFile={getImageFile} />
                    </ImageLoaderWrapper>
                    <ButtonsWrapper>
                      <Link to="/yourStorage" type="button">
                        <StyledButton reverse>
                          <ArrowBackIosIcon />
                          Back
                        </StyledButton>
                      </Link>
                      <StyledButton type="submit" form="edit" disabled={isSubmitting}>
                        Save changes
                      </StyledButton>
                    </ButtonsWrapper>
                  </ContentWrapper>
                </>
              )}
            </PageContentWrapper>
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
