import React from 'react';
import PropTypes from 'prop-types';

class Input extends React.Component {
  render() {
    const { type, name, placeholder, datatestid, value, onChange, label,
      labelClass, id } = this.props;
    return (
      <label
        htmlFor={ name }
        className={ labelClass }
      >
        { label }
        <input
          data-testid={ datatestid }
          type={ type }
          name={ name }
          placeholder={ placeholder }
          value={ value }
          onChange={ onChange }
          id={ id }
        />
      </label>
    );
  }
}
Input.propTypes = {
  type: PropTypes.string.isRequired,
  label: PropTypes.string,
  value: PropTypes.string,
  placeholder: PropTypes.string,
  datatestid: PropTypes.string,
  name: PropTypes.string,
  onChange: PropTypes.func,
  id: PropTypes.string,
  labelClass: PropTypes.string,
};

Input.defaultProps = {
  label: '',
  value: '',
  name: '',
  placeholder: '',
  datatestid: '',
  onChange: null,
  id: '',
  labelClass: '',
};
export default Input;
