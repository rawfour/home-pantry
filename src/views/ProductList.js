import React, { useEffect } from 'react';
import Product from 'components/Product';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  openPopUp as openPopUpAction,
  fetchProducts as fetchProductsAction,
} from 'services/productList/actions';
import Loading from '../components/Loader';

const ProductList = ({ storage, fetchProducts, openPopUp, loading }) => {
  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div
      style={{
        minWidth: 730,
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
              storage.map((item) => <Product key={item.id} product={item} openPopUp={openPopUp} />)
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
  );
};

const mapDispatchToProps = (dispatch) => ({
  openPopUp: (productId) => dispatch(openPopUpAction(productId)),
  fetchProducts: () => dispatch(fetchProductsAction()),
});

const mapStateToProps = (state) => {
  const { loading } = state.loading;
  const { storage } = state.products;
  return { storage, loading };
};

ProductList.propTypes = {
  storage: PropTypes.arrayOf(PropTypes.object),
  openPopUp: PropTypes.func.isRequired,
  fetchProducts: PropTypes.func.isRequired,
  loading: PropTypes.shape().isRequired,
};

ProductList.defaultProps = {
  storage: [],
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductList);
