import React, { useState } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { connect } from 'react-redux';
import { addProduct as addProductAction } from 'services/productList/actions';
import Input from './Input';
import Select from './Select';
import ImageUpload from './ImageUpload';
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

const AddForm = ({ addProduct, loading, open, onOpen, onClose }) => {
  const initialValues = {
    name: '',
    category: 'Drinks',
    unit: 'kg',
    isMax: 3,
    isLow: 1,
    currently: 2,
  };
  const [image, setImage] = useState();
  const [actionDone, setActionDone] = useState(false);

  const getImageFile = (file) => {
    setImage(file);
  };

  const handleActionDone = () => {
    setActionDone(true);
    setTimeout(() => {
      setActionDone(false);
    }, 4000);
  };

  const onSubmit = async (name, category, unit, isMax, isLow, currently) => {
    onOpen();
    await addProduct(name, category, image, unit, isMax, isLow, currently);
    onClose();
    handleActionDone();
  };

  return (
    <>
      {actionDone && <MessageDone>Product added</MessageDone>}
      <Formik
        initialValues={initialValues}
        validationSchema={ValidationSchema}
        onSubmit={(values, { setSubmitting }) => {
          const { name, category, unit, isMax, isLow, currently } = values;
          setSubmitting(false);
          onSubmit(name, category, unit, isMax, isLow, currently);
        }}
      >
        {({ values, handleChange, handleBlur, handleSubmit, isSubmitting }) => (
          <>
            <PageContentWrapper>
              <Title align="left">Add product</Title>
              <ContentWrapper>
                <Form id="add" onSubmit={handleSubmit} noValidate>
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
                    tooltip
                    tooltipText="The minimum amount of this product after reaching which the product will automatically go to the shopping list."
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
                    tooltip
                    tooltipText="The maximum amount of this product you can own."
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
                  <ImageUpload getImageFile={getImageFile} />
                </ImageLoaderWrapper>
                <ButtonsWrapper>
                  <Button type="submit" form="add" disabled={isSubmitting}>
                    Add product
                  </Button>
                </ButtonsWrapper>
              </ContentWrapper>
            </PageContentWrapper>
          </>
        )}
      </Formik>
      {loading.addProduct && <Backdrop open={open} />}
    </>
  );
};

AddForm.propTypes = {
  addProduct: PropTypes.func.isRequired,
  loading: PropTypes.shape().isRequired,
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onOpen: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  addProduct: (name, category, image, unit, isMax, isLow, currently) =>
    dispatch(addProductAction(name, category, image, unit, isMax, isLow, currently)),
});

const mapStateToProps = (state) => {
  const { loading } = state.loading;
  return {
    loading,
  };
};

export default withBackdrop(connect(mapStateToProps, mapDispatchToProps)(AddForm));
