import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const TileWrapper = styled.h2`
  width: 100%;
  text-align: ${({ align }) => align};
  padding-bottom: 48px;
  font-size: ${({ theme }) => theme.fontSizes.xxl};
  font-weight: ${({ theme }) => theme.fontWeights.normal};
`;

const Title = ({ children, align }) => {
  return <TileWrapper align={align}>{children}</TileWrapper>;
};

Title.propTypes = {
  children: PropTypes.oneOfType([PropTypes.array, PropTypes.string]).isRequired,
  align: PropTypes.string,
};

Title.defaultProps = {
  align: 'center',
};

export default Title;
