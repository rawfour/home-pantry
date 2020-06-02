import React from 'react';
import PropTypes from 'prop-types';
import { ErrorMessage } from 'formik';
import Tooltip from './Tooltip';

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
        <label
          className="flex uppercase tracking-wide flex-wrap text-gray-700 text-xs font-bold mb-2"
          htmlFor={id}
        >
          <span className="flex items-center whitespace-no-wrap">
            {label}
            {tooltip && <Tooltip text={tooltipText} />}
          </span>

          <ErrorMessage name={errorMessage}>
            {(msg) => (
              <>
                <pre> </pre>
                <span className="text-red-400">* {msg}</span>
              </>
            )}
          </ErrorMessage>
        </label>
      )}

      <input
        className=" appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-6 leading-tight focus:outline-none focus:bg-white"
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
