import React from 'react';
import styled, { withTheme } from 'styled-components';
import PropTypes from 'prop-types';
import Loader from 'react-loader-spinner';

const LoaderWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const LoadingText = styled.span`
  text-align: center;
  font-size: ${({ theme }) => theme.fontSizes.xl};
  padding: 16px 0;
`;

const Loading = ({ theme }) => {
  return (
    <LoaderWrapper>
      <Loader type="Puff" color={theme.colors.primary} height={100} width={100} />
      <LoadingText>Loading...</LoadingText>
    </LoaderWrapper>
  );
};

Loading.propTypes = {
  theme: PropTypes.shape().isRequired,
};

export default withTheme(Loading);
