import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { NavLink, Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { userLogout as userLogoutAction } from '../services/authentication/actions';

const Header = ({ history, userLogout, isAuth }) => {
  const [isOpen, setMenu] = useState(false);

  const handleLogout = async () => {
    await userLogout();
    history.replace('/login');
  };

  return (
    <nav className="flex items-center justify-between flex-wrap bg-green-500 p-6">
      <div className="flex items-center flex-shrink-0 text-white mr-6">
        <Link to="/" className="font-semibold text-2xl tracking-tight">
          Home pantry
        </Link>
      </div>
      <div className="block lg:hidden">
        <button
          onClick={() => setMenu(!isOpen)}
          type="button"
          className="flex items-center px-3 py-2 border rounded text-teal-200 border-teal-400 hover:text-white hover:border-white"
          style={{
            border: 'none',
          }}
        >
          <svg
            className="fill-current h-5 w-5"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <title>Menu</title>
            <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
          </svg>
        </button>
      </div>
      <div
        className={`w-full block flex-grow lg:flex lg:items-center lg:w-auto ${
          !isOpen && 'hidden'
        }`}
      >
        <div className="text-sm lg:flex-grow flex flex-col lg:flex-row">
          {isAuth && (
            <>
              <NavLink
                to="/yourStorage"
                className="flex mt-4 lg:inline-flex lg:mt-0 duration-200 text-base text-teal-200 hover:text-white lg:mx-5"
              >
                Your products
              </NavLink>
              <NavLink
                to="/settings"
                className="flex items-center mt-4 lg:inline-flex lg:mt-0 text-base duration-200 text-teal-200 hover:text-white"
              >
                <svg
                  className="fill-current h-5 w-5 mr-1"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  width="24"
                  height="24"
                >
                  <path
                    className="heroicon-ui"
                    d="M12 12a5 5 0 1 1 0-10 5 5 0 0 1 0 10zm0-2a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm9 11a1 1 0 0 1-2 0v-2a3 3 0 0 0-3-3H8a3 3 0 0 0-3 3v2a1 1 0 0 1-2 0v-2a5 5 0 0 1 5-5h8a5 5 0 0 1 5 5v2z"
                  />
                </svg>
                Your account
              </NavLink>
            </>
          )}
        </div>
        {isAuth && (
          <>
            <div>
              <Link
                to="/addProduct"
                className="relative inline-flex justify-center items-center duration-200 text-base mr-4 pl-8 pr-4 py-2 leading-none border rounded text-white border-white hover:border-transparent hover:text-teal-500 hover:bg-white mt-4 lg:mt-0"
              >
                <svg
                  className="absolute fill-current h-5 w-5 mr-1"
                  style={{
                    top: '50%',
                    left: '10px',
                    transform: 'translateY(-50%)',
                  }}
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  width="24"
                  height="24"
                >
                  <path
                    className="heroicon-ui"
                    d="M17 11a1 1 0 0 1 0 2h-4v4a1 1 0 0 1-2 0v-4H7a1 1 0 0 1 0-2h4V7a1 1 0 0 1 2 0v4h4z"
                  />
                </svg>
                Add product
              </Link>
            </div>
            <div>
              <Link
                to="/shoppingList"
                className="relative inline-flex justify-center items-center duration-200 text-base mr-4 pl-8 pr-4 py-2 leading-none border rounded text-white border-white hover:border-transparent hover:text-teal-500 hover:bg-white mt-4 lg:mt-0"
              >
                <svg
                  className=" absolute fill-current h-5 w-5 mr-1"
                  style={{
                    top: '50%',
                    left: '10px',
                    transform: 'translateY(-50%)',
                  }}
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  width="24"
                  height="24"
                >
                  <path
                    className="heroicon-ui"
                    d="M8 4c0-1.1.9-2 2-2h4a2 2 0 0 1 2 2h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6c0-1.1.9-2 2-2h2zm0 2H6v14h12V6h-2a2 2 0 0 1-2 2h-4a2 2 0 0 1-2-2zm2-2v2h4V4h-4z"
                  />
                </svg>
                Shopping List
              </Link>
            </div>
          </>
        )}
        {!isAuth && (
          <>
            <div>
              <Link
                to="/login"
                className="inline-flex justify-center items-center duration-200 text-base mr-4 px-4 py-2 leading-none border rounded text-white border-white hover:border-transparent hover:text-teal-500 hover:bg-white mt-4 lg:mt-0"
              >
                Sign in
              </Link>
            </div>
            <div>
              <Link
                to="/register"
                className="inline-flex justify-center items-center duration-200 text-base px-4 py-2 leading-none border rounded text-white border-white hover:border-transparent hover:text-teal-500 hover:bg-white mt-4 lg:mt-0"
              >
                Sign up
              </Link>
            </div>
          </>
        )}

        {isAuth && (
          <div>
            <button
              type="button"
              className="inline-flex justify-center items-center duration-200 text-base px-4 py-2 leading-none border rounded border-red-500 hover:border-transparent hover:bg-red-200 text-red-500 mt-4 lg:mt-0"
              onClick={() => handleLogout()}
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </nav>
  );
};

const mapDispatchToProps = (dispatch) => ({
  userLogout: () => dispatch(userLogoutAction()),
});

const mapStateToProps = (state) => {
  const { isAuth } = state.auth;
  return { isAuth };
};

Header.propTypes = {
  history: PropTypes.shape().isRequired,
  userLogout: PropTypes.func.isRequired,
  isAuth: PropTypes.oneOfType([PropTypes.bool, PropTypes.shape()]),
};

Header.defaultProps = {
  isAuth: false,
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Header));
