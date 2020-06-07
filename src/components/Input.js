import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { ErrorMessage } from 'formik';
import Tooltip from './Tooltip';

const LabelWrapper = styled.label`
  display: flex;
  text-transform: uppercase;
  flex-wrap: wrap;
  font-size: ${({ theme }) => theme.fontSizes.s};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  margin-bottom: 8px;
`;

const Label = styled.span`
  display: flex;
  align-items: center;
  white-space: nowrap;
`;

const ErrorText = styled.span`
  color: ${({ theme }) => theme.colors.discard};
`;

const StyledInput = styled.input`
  appearance: none;
  display: block;
  width: 100%;
  transition: 0.2s;
  background-color: ${({ theme }) => theme.colors.lightGray};
  color: ${({ theme }) => theme.colors.text};
  border: 2px solid ${({ theme }) => theme.colors.lightGray};
  border-radius: 4px;
  padding: 12px 16px;
  margin-bottom: 24px;
  line-height: 20px;
  &:focus {
    outline: none;
    background-color: ${({ theme }) => theme.colors.white};
  }
`;

const Input = ({
  id,
  label,
  name,
  blur,
  action,
  value,
  type,
  errorMessage,
  tooltip,
  tooltipText,
}) => {
  return (
    <>
      {label && (
        <LabelWrapper htmlFor={id}>
          <Label>
            {label}
            {tooltip && <Tooltip text={tooltipText} />}
          </Label>

          <ErrorMessage name={errorMessage}>
            {(msg) => (
              <>
                <pre> </pre>
                <ErrorText>* {msg}</ErrorText>
              </>
            )}
          </ErrorMessage>
        </LabelWrapper>
      )}

      <StyledInput
        className="focus:outline-none focus:bg-white"
        id={id}
        type={type}
        name={name}
        onBlur={blur}
        onChange={action}
        value={value}
      />
    </>
  );
};

Input.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string,
  name: PropTypes.string.isRequired,
  blur: PropTypes.func.isRequired,
  action: PropTypes.func.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  type: PropTypes.string.isRequired,
  errorMessage: PropTypes.string.isRequired,
  tooltip: PropTypes.bool,
  tooltipText: PropTypes.string,
};

Input.defaultProps = {
  label: false,
  value: '',
  tooltip: false,
  tooltipText: '',
};

export default Input;
