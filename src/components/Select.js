import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const Label = styled.label`
  display: block;
  text-transform: uppercase;
  font-size: ${({ theme }) => theme.fontSizes.s};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  margin-bottom: 8px;
`;

const StyledSelect = styled.select`
  display: block;
  appearance: none;
  transition: 0.2s;
  width: 100%;
  background-color: ${({ theme }) => theme.colors.lightGray};
  border: 2px solid ${({ theme }) => theme.colors.lightGray};
  color: ${({ theme }) => theme.colors.text};
  padding: 12px 32px 12px 16px;
  margin-bottom: 24px;
  border-radius: 4px;
  line-height: 20px;
  &:focus {
    outline: none;
    background-color: ${({ theme }) => theme.colors.white};
  }
`;

const Select = ({ id, value, blur, action, label, name, options }) => {
  return (
    <>
      {label && <Label htmlFor={id}>{label}</Label>}

      <StyledSelect id={id} onBlur={blur} onChange={action} value={value} name={name}>
        {options.map((item) => (
          <option key={item}>{item}</option>
        ))}
      </StyledSelect>
    </>
  );
};

Select.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string,
  name: PropTypes.string.isRequired,
  blur: PropTypes.func.isRequired,
  action: PropTypes.func.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  options: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.string, PropTypes.number])).isRequired,
};

Select.defaultProps = {
  label: false,
  value: '',
};

export default Select;
