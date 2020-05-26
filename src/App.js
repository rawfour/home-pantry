import React from 'react';
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

const AnimatedSwitch = withRouter(({ location }) => (
  <TransitionGroup>
    <CSSTransition key={location.key} classNames="page" timeout={1200}>
      <Switch location={location}>
        {routes.map(({ name, path, Component, isExact }) => (
          <Route key={name} path={path} exact={isExact}>
            <div className="page">
              <Component />
            </div>
          </Route>
        ))}
        <Route path="/" exact render={() => <Redirect to="/yourStorage" />} />
        <Route render={() => <Redirect to="/notFound" />} />
      </Switch>
    </CSSTransition>
  </TransitionGroup>
));

const App = ({ isPopUpOpen, removeProduct, closePopUp, storage, toRemove }) => {
  return (
    <>
      <Router history={history}>
        <Header />
        <div className="page-wrapper md:px-4 py-16">
          <AnimatedSwitch />
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
};

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
