import React from 'react';
import PropTypes from 'prop-types';

const Input = ({ id, label, name, action, value, type }) => {
  return (
    <>
      {label && (
        <label
          className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
          htmlFor={id}
        >
          {label}
        </label>
      )}
      <input
        className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-6 leading-tight focus:outline-none focus:bg-white"
        id={id}
        type={type}
        name={name}
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
  action: PropTypes.func.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  type: PropTypes.string.isRequired,
};

Input.defaultProps = {
  label: false,
  value: '',
};

export default Input;
