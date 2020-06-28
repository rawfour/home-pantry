import React from 'react';
import styled from 'styled-components';

const GuestInfoWrapper = styled.div`
  margin: 30px 0;
  & > span {
    display: block;
    margin-bottom: 20px;
  }
  & ul {
    padding: 20px 30px;
    background-color: ${({ theme }) => theme.colors.lightGray};
    border-radius: 4px;
  }
  & li {
    margin: 10px 0;
    & > span {
      font-size: ${({ theme }) => theme.fontSizes.s};
      font-weight: ${({ theme }) => theme.fontWeights.bold};
      text-transform: uppercase;
      margin-right: 10px;
    }
  }
`;

const GuestInfo = () => {
  return (
    <GuestInfoWrapper>
      <span>
        You don&apos;t have to create an account if you don&apos;t want to, just use the demo
        account:
      </span>
      <ul>
        <li>
          <span>E-mail:</span> demo@gmail.com
        </li>
        <li>
          <span>Password:</span> demo123
        </li>
      </ul>
    </GuestInfoWrapper>
  );
};

export default GuestInfo;
