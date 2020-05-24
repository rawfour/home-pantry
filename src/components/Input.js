import React from 'react';
import PropTypes from 'prop-types';
import { ErrorMessage } from 'formik';

const Input = ({ id, label, name, blur, action, value, type, errorMessage }) => {
  return (
    <>
      {label && (
        <label
          className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
          htmlFor={id}
        >
          {label}

          <ErrorMessage name={errorMessage}>
            {(msg) => (
              <>
                <span> - </span>
                <span className="text-red-400">{msg}</span>
              </>
            )}
          </ErrorMessage>
        </label>
      )}
      <input
        className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-6 leading-tight focus:outline-none focus:bg-white"
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
};

Input.defaultProps = {
  label: false,
  value: '',
};

export default Input;
