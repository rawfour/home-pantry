import React, { useState, useEffect } from 'react';
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
      <div
        style={{
          minWidth: 730,
          paddingBottom: 50,
        }}
      >
        <div className="flex mb-4 py-5 px-12 bg-white rounded">
          <div className="w-1/6 pr-2">
            <span className="text-gray-600">Image</span>
          </div>

          <div className="w-1/6 px-2">
            <span className="text-gray-600">Name</span>
          </div>

          <div className="w-1/6 px-2 text-center">
            <span className="text-gray-600">You have</span>
          </div>

          <div className="w-1/6 px-2 text-center">
            <span className="text-gray-600">Unit</span>
          </div>

          <div className="w-1/6 px-2 text-center">
            <span className="text-gray-600">Pantry condition</span>
          </div>

          <div className="w-1/6 pl-2 text-right">
            <span className="text-gray-600">Actions</span>
          </div>
        </div>
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
                <li className="text-center mt-16 py-5 px-12 text-gray-600 text-xl">
                  Your pantry is empty,
                  <br /> go shopping!{' '}
                  <span role="img" aria-label="grinning_face">
                    😀
                  </span>
                </li>
              )}
            </>
          )}
        </ul>
      </div>
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
