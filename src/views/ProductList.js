import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Product from 'components/Product';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  removeProduct as removeProductAction,
  fetchProducts as fetchProductsAction,
} from 'services/productList/actions';
import Loading from '../components/Loader';
import withDialog from '../hoc/withDialog';
import Modal from '../components/Modal';

const SwipedWrapper = styled.div`
  min-width: 730px;
  padding-bottom: 50px;
`;

const TableHead = styled.ul`
  display: flex;
  margin-bottom: 16px;
  padding: 20px 48px;
  background-color: ${({ theme }) => theme.colors.white};
  border-radius: 4px;
`;

const HeadCell = styled.li`
  flex-basis: calc(100% / 6);
  padding: 0 8px;
  text-align: ${({ align }) => align || 'center'};
  &:first-child {
    padding: 0 8px 0 0;
  }
  &:last-child {
    padding: 0 0 0 8px;
  }
`;

const HeadCellText = styled.span`
  color: ${({ theme }) => theme.colors.gray};
`;

const EmptyListInfo = styled.li`
  text-align: center;
  margin-top: 64px;
  padding: 20px 48px;
  color: ${({ theme }) => theme.colors.gray};
  font-size: ${({ theme }) => theme.fontSizes.xl};
`;

const ProductList = ({ storage, fetchProducts, loading, removeProduct, open, onClose, onOpen }) => {
  useEffect(() => {
    fetchProducts();
  }, []);

  const [toRemove, setToRemove] = useState(null);

  const handleOpenModal = (productID) => {
    setToRemove(productID);
    onOpen();
  };

  const handleRemoveProduct = async () => {
    await removeProduct(toRemove);
    await onClose();
    fetchProducts();
  };

  return (
    <>
      <SwipedWrapper>
        <TableHead>
          <HeadCell>
            <HeadCellText>Image</HeadCellText>
          </HeadCell>

          <HeadCell>
            <HeadCellText>Name</HeadCellText>
          </HeadCell>

          <HeadCell>
            <HeadCellText>You have</HeadCellText>
          </HeadCell>

          <HeadCell>
            <HeadCellText>Unit</HeadCellText>
          </HeadCell>

          <HeadCell>
            <HeadCellText>Pantry condition</HeadCellText>
          </HeadCell>

          <HeadCell align="right">
            <HeadCellText>Actions</HeadCellText>
          </HeadCell>
        </TableHead>
        <ul>
          {loading.fetchList ? (
            <Loading />
          ) : (
            <>
              {storage.length ? (
                storage.map((item) => (
                  <Product key={item.id} product={item} onOpen={handleOpenModal} />
                ))
              ) : (
                <EmptyListInfo>
                  Your pantry is empty,
                  <br /> go shopping!{' '}
                  <span role="img" aria-label="grinning_face">
                    😀
                  </span>
                </EmptyListInfo>
              )}
            </>
          )}
        </ul>
      </SwipedWrapper>
      <Modal
        open={open}
        onClose={onClose}
        action={handleRemoveProduct}
        modalText="Are you sure you want to delete this product?"
        btnContent="Delete"
      />
    </>
  );
};

const mapDispatchToProps = (dispatch) => ({
  fetchProducts: () => dispatch(fetchProductsAction()),
  removeProduct: (productID) => dispatch(removeProductAction(productID)),
});

const mapStateToProps = (state) => {
  const { loading } = state.loading;
  const { storage } = state.products;
  return { storage, loading };
};

ProductList.propTypes = {
  storage: PropTypes.arrayOf(PropTypes.object),
  fetchProducts: PropTypes.func.isRequired,
  loading: PropTypes.shape().isRequired,
  removeProduct: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onOpen: PropTypes.func.isRequired,
};

ProductList.defaultProps = {
  storage: [],
};

export default withDialog(connect(mapStateToProps, mapDispatchToProps)(ProductList));
