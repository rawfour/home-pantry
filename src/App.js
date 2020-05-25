import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
import { CSSTransition } from 'react-transition-group';
import history from 'history.js';
import Header from 'components/Header';
import GlobalStyle from 'theme/GlobalStyle';
import PopUp from 'components/PopUp';
import {
  removeProduct as removeProductAction,
  closePopUp as closePopUpAction,
} from 'services/productList/actions';
import { routes } from './routes';

function App({ isPopUpOpen, removeProduct, closePopUp, storage, toRemove }) {
  return (
    <>
      <Router history={history}>
        <Header />
        <div className="page-wrapper md:px-4 pt-10 pb-4 md:py-16">
          <Route path="/" exact render={() => <Redirect to="/yourStorage" />} />
          {routes.map(({ name, path, Component, isExact }) => (
            <Route key={name} path={path} exact={isExact}>
              {({ match }) => (
                <CSSTransition in={match != null} timeout={1200} classNames="page" unmountOnExit>
                  <div className="page">
                    <Component />
                  </div>
                </CSSTransition>
              )}
            </Route>
          ))}
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
      <GlobalStyle />
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
