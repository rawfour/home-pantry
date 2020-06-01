import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { getCurrentUsername } from '../firebase/index';

const HomePage = ({ isAuth }) => {
  const [userName, setUserName] = useState(false);

  useEffect(() => {
    const currentUserName = getCurrentUsername();
    setUserName(currentUserName);
  }, []);

  return (
    <div className="mb-4 py-12 px-8 md:px-12 bg-white rounded">
      <h2 className=" w-full text-center pb-12 text-2xl">
        Welcome in your home pantry {userName || 'guest'}!
      </h2>
      <div className="flex flex-col md:flex-row md:justify-center pt-12 w-full border-t-2 border-gray-400 border-solid">
        {isAuth ? (
          <Link
            className="w-full md:w-auto cursor-pointer text-center mb-4 duration-200 text-base px-4 md:px-16 py-2 leading-none rounded border-solid border-2 shadow border-green-500 bg-white hover:border-black hover:text-black text-green-500"
            to="/yourStorage"
          >
            Go to pantry
          </Link>
        ) : (
          <>
            <Link
              to="/login"
              className="w-full md:w-auto cursor-pointer text-center mb-4 md:mr-4 duration-200 text-base px-4 md:px-16 py-2 leading-none rounded border-solid border-2 shadow border-green-500 bg-white hover:border-black hover:text-black text-green-500"
            >
              Sign in
            </Link>
            <Link
              className="w-full md:w-auto cursor-pointer text-center mb-4 duration-200 text-base px-4 md:px-16 py-2 leading-none rounded border-solid border-2 shadow border-red-500 bg-white hover:border-black hover:text-black text-red-500"
              to="/register"
            >
              Sign up
            </Link>
          </>
        )}
      </div>
    </div>
  );
};

HomePage.propTypes = {
  isAuth: PropTypes.oneOfType([PropTypes.bool, PropTypes.shape()]),
};

HomePage.defaultProps = {
  isAuth: false,
};

const mapStateToProps = (state) => {
  const { isAuth } = state.auth;
  return { isAuth };
};

export default connect(mapStateToProps, null)(HomePage);
