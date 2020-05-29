import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import ProductToBuy from 'components/ProductToBuy';
import { getShoppingList as getShoppingListAction } from 'services/productList/actions';

const ShoppingList = ({ getShoppingList, shoppingList }) => {
  useEffect(() => {
    getShoppingList();
  }, []);

  return (
    <>
      <div className="mb-4 pb-12 px-8 md:px-12 bg-gray-300 rounded">
        <h2 className=" w-full pb-12 text-2xl">Shopping List</h2>

        <div className="flex justify-center flex-wrap items-center py-4">
          {shoppingList.length ? (
            shoppingList.map((item) => <ProductToBuy key={item.id} product={item} />)
          ) : (
            <div className="text-center mt-16 py-5 px-12 text-gray-600 text-xl">
              Nothing to buy,
              <br />
              you have everything!{' '}
              <span role="img" aria-label="finger_up">
                👍
              </span>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

ShoppingList.propTypes = {
  getShoppingList: PropTypes.func.isRequired,
  shoppingList: PropTypes.arrayOf(PropTypes.object),
};

ShoppingList.defaultProps = {
  shoppingList: [],
};

const mapStateToProps = (state) => {
  const { shoppingList } = state.products;
  return { shoppingList };
};

const mapDispatchToProps = (dispatch) => ({
  getShoppingList: () => dispatch(getShoppingListAction()),
});

export default connect(mapStateToProps, mapDispatchToProps)(ShoppingList);
