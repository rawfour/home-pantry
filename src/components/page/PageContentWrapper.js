import React from 'react';
import styled, { css } from 'styled-components';
import PropTypes from 'prop-types';

const Wrapper = styled.div`
  padding: 32px 48px;
  border-radius: 4px;
  background-color: ${({ theme, transparent }) =>
    transparent ? 'transparent' : theme.colors.white};
  @media ${({ theme }) => theme.breakpoints.md} {
    padding: 48px;
  }
  ${({ small }) =>
    small &&
    css`
      margin: 0 auto;
      min-width: 300px;
      max-width: 500px;
    `}
`;

const PageContentWrapper = (props) => {
  const { children, small, transparent } = props;
  return (
    <Wrapper transparent={transparent} small={small}>
      {children}
    </Wrapper>
  );
};

PageContentWrapper.propTypes = {
  children: PropTypes.oneOfType([PropTypes.array, PropTypes.element, PropTypes.object]).isRequired,
  small: PropTypes.bool,
  transparent: PropTypes.bool,
};

PageContentWrapper.defaultProps = {
  small: false,
  transparent: false,
};

export default PageContentWrapper;
