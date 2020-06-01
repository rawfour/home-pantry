import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Route, Redirect, Switch, withRouter } from 'react-router-dom';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import history from 'history.js';
import Header from 'components/Header';
import GlobalStyle from 'theme/GlobalStyle';
import PopUp from 'components/PopUp';
import {
  removeProduct as removeProductAction,
  closePopUp as closePopUpAction,
} from 'services/productList/actions';
import { routes } from './routes';
import { firebaseInitialized as firebaseInitializedAction } from './services/authentication/actions';
import Loading from './components/Loader';

const App = ({ isPopUpOpen, removeProduct, closePopUp, toRemove, firebaseInitialized, isAuth }) => {
  useEffect(() => {
    firebaseInitialized();
  });

  const AnimatedSwitch = withRouter(({ location }) => (
    <TransitionGroup>
      <CSSTransition key={location.key} classNames="page" timeout={1200}>
        <Switch location={location}>
          {routes.map(({ name, path, Component, isExact, needAuth }) => {
            return needAuth ? (
              <Route
                key={name}
                exact={isExact}
                path={path}
                render={() =>
                  isAuth ? (
                    <div className="page pb-16">
                      <Component />
                    </div>
                  ) : (
                    <Redirect to="/login" />
                  )
                }
              />
            ) : (
              <Route key={name} path={path} exact={isExact}>
                <div className="page">
                  <Component />
                </div>
              </Route>
            );
          })}
          <Route render={() => <Redirect to="/notFound" />} />
        </Switch>
      </CSSTransition>
    </TransitionGroup>
  ));

  return (
    <>
      {isAuth !== false ? (
        <>
          <Router history={history}>
            <Header />
            <div className="page-wrapper md:px-4 py-16">
              <AnimatedSwitch />
            </div>
          </Router>

          {isPopUpOpen && (
            <PopUp removeProduct={removeProduct} productID={toRemove} closePopUp={closePopUp} />
          )}
        </>
      ) : (
        <Loading />
      )}
      <GlobalStyle />
    </>

    // <>
    //   <Loading />
    //   <GlobalStyle />
    // </>
  );
};

App.propTypes = {
  removeProduct: PropTypes.func.isRequired,
  closePopUp: PropTypes.func.isRequired,
  isPopUpOpen: PropTypes.bool.isRequired,
  toRemove: PropTypes.string,
  firebaseInitialized: PropTypes.func.isRequired,
  isAuth: PropTypes.oneOfType([PropTypes.bool, PropTypes.shape()]),
};

App.defaultProps = {
  toRemove: null,
  isAuth: false,
};

const mapDispatchToProps = (dispatch) => ({
  removeProduct: (productID) => dispatch(removeProductAction(productID)),
  closePopUp: () => dispatch(closePopUpAction()),
  firebaseInitialized: (value) => dispatch(firebaseInitializedAction(value)),
});

const mapStateToProps = (state) => {
  const { isAuth } = state.auth;
  const { isPopUpOpen, toRemove } = state.products;
  return { isPopUpOpen, toRemove, isAuth };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
