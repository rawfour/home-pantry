import React from 'react';
import styled, { css } from 'styled-components';
import PropTypes from 'prop-types';

const StyledButton = styled.button`
display: grid;
grid-template-columns: auto auto;
grid-gap: 5px;
justify-content: center;
align-items: center;
width: ${({ wAuto }) => (wAuto ? 'auto' : '100%')};
cursor: pointer;
transition: 0.2s;
padding: 8px ${({ longer }) => (longer ? '48px' : '16px')};
line-height: 16px;
border-radius: 4px;
border: 2px solid ${({ theme }) => theme.colors.primary};
font-size: ${({ theme }) => theme.fontSizes.m};
box-shadow: ${({ theme }) => theme.shadows.basic};
background-color: transparent;
color: ${({ theme }) => theme.colors.primary};
margin: 8px 8px;

&:hover {
  border-color: ${({ theme }) => theme.colors.darkGray};
  color: ${({ theme }) => theme.colors.darkGray};
}

@media ${({ theme }) => theme.breakpoints.md} {
  width: auto;
}

${({ secondary }) =>
  secondary &&
  css`
    border-color: ${({ theme }) => theme.colors.secondary};
    color: ${({ theme }) => theme.colors.secondary};
  `}
${({ reverse }) =>
  reverse &&
  css`
    border-color: ${({ theme }) => theme.colors.darkGray};
    color: ${({ theme }) => theme.colors.darkGray};
    &:hover {
      border-color: ${({ theme }) => theme.colors.primary};
      color: ${({ theme }) => theme.colors.primary};
    }
  `}
${({ white }) =>
  white &&
  css`
    border-color: ${({ theme }) => theme.colors.white};
    color: ${({ theme }) => theme.colors.white};
    &:hover {
      background-color: ${({ theme }) => theme.colors.white};
      color: ${({ theme }) => theme.colors.primary};
      border-color: ${({ theme }) => theme.colors.white};
    }
  `}
`;

const Button = (props) => {
  const { children } = props;
  return <StyledButton {...props}>{children}</StyledButton>;
};

Button.propTypes = {
  children: PropTypes.oneOfType([PropTypes.array, PropTypes.string]).isRequired,
};

export default Button;
