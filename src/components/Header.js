import React, { useState } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { NavLink, Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import MenuIcon from '@material-ui/icons/Menu';
import PersonIcon from '@material-ui/icons/Person';
import AddIcon from '@material-ui/icons/Add';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import { userLogout as userLogoutAction } from '../services/authentication/actions';
import Button from './Button';

const Nav = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  background-color: ${({ theme }) => theme.colors.primary};
  padding: 24px;
`;

const Logo = styled.div`
  display: flex;
  flex-shrink: 0;
  align-items: center;
  color: ${({ theme }) => theme.colors.white};
  @media ${({ theme }) => theme.breakpoints.lg} {
    margin-right: 24px;
  }
`;

const LogoText = styled.h1`
  font-size: ${({ theme }) => theme.fontSizes.xl};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  color: ${({ theme }) => theme.colors.white};
`;

const MobileIconWrapper = styled.div`
  display: block;
  @media ${({ theme }) => theme.breakpoints.lg} {
    display: none;
  }
`;

const MobileMenuButton = styled.button`
  display: flex;
  align-items: center;
  transition: 0.2s;
  border: none;
  background-color: transparent;
  color: ${({ theme }) => theme.colors.white};
  &:hover {
    color: ${({ theme }) => theme.colors.activeLink};
  }
`;

const MobileMenuIcon = styled(MenuIcon)`
  height: 24px;
  width: 24px;
`;

const MenuWrapper = styled.div`
  width: 100%;
  display: ${({ isOpen }) => (isOpen ? 'block' : 'none')};
  flex-grow: 1;
  @media ${({ theme }) => theme.breakpoints.lg} {
    display: flex;
    align-items: center;
    width: auto;
  }
`;

const LeftSide = styled.div`
  display: flex;
  flex-direction: column;
  grid-gap: 16px;
  margin: 24px 0 16px 0;
  @media ${({ theme }) => theme.breakpoints.lg} {
    flex-direction: row;
    flex-grow: 1;
    margin: 0 0 0 24px;
  }
  & .active > button {
    color: ${({ theme }) => theme.colors.activeLink};
  }
`;

const LeftSideButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  transition: 0.2s;
  height: 100%;
  background-color: transparent;
  border: none;
  color: ${({ theme }) => theme.colors.white};
  &:hover {
    color: ${({ theme }) => theme.colors.activeLink};
  }
  @media ${({ theme }) => theme.breakpoints.lg} {
    display: inline-flex;
  }
`;

const UserIcon = styled(PersonIcon)`
  height: 20px;
  width: 20px;
`;

const RightSide = styled.div`
  display: flex;
  align-items: flex-start;
  flex-direction: column;
  grid-gap: 16px;
  @media ${({ theme }) => theme.breakpoints.lg} {
    flex-direction: row;
    align-items: center;
    justify-content: center;
    grid-gap: 10px;
  }
`;

const Header = ({ history, userLogout, isAuth }) => {
  const [isOpen, setMenu] = useState(false);

  const handleLogout = async () => {
    await userLogout();
    history.replace('/login');
  };

  return (
    <Nav>
      <Logo>
        <Link to="/">
          <LogoText>Home pantry</LogoText>
        </Link>
      </Logo>
      <MobileIconWrapper>
        <MobileMenuButton onClick={() => setMenu(!isOpen)} type="button">
          <MobileMenuIcon />
        </MobileMenuButton>
      </MobileIconWrapper>
      <MenuWrapper isOpen={isOpen}>
        <LeftSide>
          {isAuth && (
            <>
              <NavLink to="/yourStorage">
                <LeftSideButton>Your products</LeftSideButton>
              </NavLink>
              <NavLink to="/account">
                <LeftSideButton>
                  <UserIcon />
                  Your account
                </LeftSideButton>
              </NavLink>
            </>
          )}
        </LeftSide>
        <RightSide>
          {isAuth && (
            <>
              <Link to="/addProduct">
                <Button white>
                  <AddIcon />
                  Add product
                </Button>
              </Link>

              <Link to="/shoppingList">
                <Button white>
                  <ShoppingCartIcon />
                  Shopping List
                </Button>
              </Link>
            </>
          )}
          {!isAuth && (
            <>
              <Link to="/login">
                <Button white>Sign in</Button>
              </Link>

              <Link to="/register">
                <Button white>Sign up</Button>
              </Link>
            </>
          )}

          {isAuth && (
            <Button wAuto type="button" onClick={() => handleLogout()} secondary>
              Logout
            </Button>
          )}
        </RightSide>
      </MenuWrapper>
    </Nav>
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
