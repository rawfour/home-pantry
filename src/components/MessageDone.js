import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const ActionDoneMes = styled.div`
  padding: 16px 24px;
  display: block;
  width: 100%;
  border-radius: 4px;
  box-shadow: ${({ theme }) => theme.shadows.basic};
  margin-bottom: 24px;
  background-color: ${({ theme }) => theme.colors.lightAccept};
  color: ${({ theme }) => theme.colors.accept};
  font-size: ${({ theme }) => theme.fontSizes.s};
  @media ${({ theme }) => theme.breakpoints.md} {
    font-size: ${({ theme }) => theme.fontSizes.m};
  }
`;

const MessageDone = ({ children }) => {
  return (
    <ActionDoneMes>
      <span>{children}</span>
    </ActionDoneMes>
  );
};

MessageDone.propTypes = {
  children: PropTypes.string.isRequired,
};

export default MessageDone;
