import React from 'react';
import PropTypes from 'prop-types';

class Input extends React.Component {
  render() {
    const { type, name, placeholder, datatestid, value, onChange, label } = this.props;
    return (
      <label htmlFor={ name }>
        { label }
        <input
          data-testid={ datatestid }
          type={ type }
          name={ name }
          placeholder={ placeholder }
          value={ value }
          onChange={ onChange }
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
};

Input.defaultProps = {
  label: '',
  value: '',
  name: '',
  placeholder: '',
  datatestid: '',
  onChange: null,
};
export default Input;
