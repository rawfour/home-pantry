import React from 'react';
import PropTypes from 'prop-types';

const Select = ({ id, value, blur, action, label, name, options }) => {
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

      <select
        className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 mb-6 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
        id={id}
        onBlur={blur}
        onChange={action}
        value={value}
        name={name}
      >
        {options.map((item) => (
          <option key={item}>{item}</option>
        ))}
      </select>
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
