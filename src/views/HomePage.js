import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { getCurrentUserProfile } from '../firebase/index';
import PagecontentWrapper from '../components/page/PageContentWrapper';
import Title from '../components/page/PageTitle';
import Button from '../components/Button';
import GuestInfo from '../components/GuestInfo';

const ButtonsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding-top: 48px;
  width: 100%;
  border-top: 2px solid ${({ theme }) => theme.colors.lightGray};
  @media ${({ theme }) => theme.breakpoints.sm} {
    flex-direction: row;
    justify-content: center;
  }
`;

const HomePage = ({ isAuth }) => {
  const [userInfo, setUserInfo] = useState(false);

  useEffect(() => {
    const unsubscribe = () => {
      const currentUser = getCurrentUserProfile();
      setUserInfo(currentUser);
    };

    return unsubscribe();
  }, []);

  return (
    <PagecontentWrapper>
      <Title>Welcome in your home pantry {userInfo ? userInfo.name : 'guest'}!</Title>
      {!userInfo && <GuestInfo />}
      <ButtonsWrapper>
        {isAuth ? (
          <Link to="/yourStorage">
            <Button>Go to pantry</Button>
          </Link>
        ) : (
          <>
            <Link to="/login">
              <Button>Sign in</Button>
            </Link>
            <Link to="/register">
              <Button reverse>Sign up</Button>
            </Link>
          </>
        )}
      </ButtonsWrapper>
    </PagecontentWrapper>
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
