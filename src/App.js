import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import GlobalStyle from 'theme/GlobalStyle';
import { Router, Switch, Route, Redirect } from 'react-router-dom';
import ProductList from 'views/ProductList';
import ShoppingList from 'views/ShoppingList';
import AddProduct from 'views/AddProduct';
import EditProduct from 'views/EditProduct';
import Settings from 'views/Settings';
import NotFound from 'views/NotFound';
import ErrorPage from 'views/Error';
import history from 'history.js';
import Header from 'components/Header';
import PopUp from 'components/PopUp';
import {
  removeProduct as removeProductAction,
  closePopUp as closePopUpAction,
} from 'services/productList/actions';

function App({ isPopUpOpen, removeProduct, closePopUp, storage, toRemove }) {
  return (
    <>
      <GlobalStyle />
      <Router history={history}>
        <Header />
        <div
          className="px-2 md:px-4 pt-10 pb-4 md:py-16"
          style={{
            maxWidth: 1500,
            margin: '0 auto',
            overflowX: 'scroll',
            scrollbarWidth: 'none',
          }}
        >
          <Switch>
            <Route path="/" exact render={() => <Redirect to="/yourStorage" />} />
            <Route path="/yourStorage" component={ProductList} />
            <Route path="/shoppingList" exact component={ShoppingList} />
            <Route path="/addProduct" exact component={AddProduct} />
            <Route path="/product/:id/edit" exact component={EditProduct} />
            <Route path="/settings" exact component={Settings} />
            <Route path="/notFound" exact component={NotFound} />
            <Route path="/error" exact component={ErrorPage} />
            <Route path="*/error" render={() => <Redirect to="/error" />} />
            <Route render={() => <Redirect to="/notFound" />} />
          </Switch>
        </div>
      </Router>

      {isPopUpOpen && (
        <PopUp
          removeProduct={removeProduct}
          storage={storage}
          productId={toRemove}
          closePopUp={closePopUp}
        />
      )}
    </>
  );
}

App.propTypes = {
  removeProduct: PropTypes.func.isRequired,
  closePopUp: PropTypes.func.isRequired,
  isPopUpOpen: PropTypes.bool.isRequired,
  storage: PropTypes.arrayOf(PropTypes.object),
  toRemove: PropTypes.string,
};

App.defaultProps = {
  toRemove: null,
  storage: [],
};

const mapDispatchToProps = (dispatch) => ({
  removeProduct: (storage, product) => dispatch(removeProductAction(storage, product)),
  closePopUp: () => dispatch(closePopUpAction()),
});

const mapStateToProps = (state) => {
  const { isPopUpOpen, storage, toRemove } = state.products;
  return { isPopUpOpen, storage, toRemove };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
