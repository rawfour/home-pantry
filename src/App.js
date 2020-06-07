import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Route, Redirect, Switch, withRouter } from 'react-router-dom';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import history from 'history.js';
import Header from 'components/Header';
import GlobalStyle from 'theme/GlobalStyle';
import MainTemplate from './templates/MainTemplate';
import { routes } from './routes';
import { firebaseInitialized as firebaseInitializedAction } from './services/authentication/actions';
import Loading from './components/Loader';

const PageWrapper = styled.div`
  padding: 64px 16px;
  position: relative;
  max-width: 1500px;
  margin: 0 auto;
`;

const LoadingWrapper = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const App = ({ firebaseInitialized, isAuth }) => {
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
                    <div className="page">
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
    <MainTemplate>
      {isAuth !== false ? (
        <>
          <Router history={history}>
            <Header />
            <PageWrapper>
              <AnimatedSwitch />
            </PageWrapper>
          </Router>
        </>
      ) : (
        <LoadingWrapper>
          <Loading />
        </LoadingWrapper>
      )}
      <GlobalStyle />
    </MainTemplate>
  );
};

App.propTypes = {
  firebaseInitialized: PropTypes.func.isRequired,
  isAuth: PropTypes.oneOfType([PropTypes.bool, PropTypes.shape()]),
};

App.defaultProps = {
  isAuth: false,
};

const mapDispatchToProps = (dispatch) => ({
  firebaseInitialized: (value) => dispatch(firebaseInitializedAction(value)),
});

const mapStateToProps = (state) => {
  const { isAuth } = state.auth;
  return {
    isAuth,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
