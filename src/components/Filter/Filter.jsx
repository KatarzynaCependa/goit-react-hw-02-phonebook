import React, { Component } from 'react';
import PropTypes from 'prop-types';
import css from 'components/Filter/Filter.module.css';

class Filter extends Component {
  handleInputChange = evt => {
    const { value } = evt.target;
    this.props.onChange(value);
  };

  render() {
    return (
      <label className={css.filterLabel}>
        Find contacts by name
        <input type="text" onChange={this.handleInputChange} />
      </label>
    );
  }
}

Filter.propTypes = {
  onChange: PropTypes.func.isRequired,
};

export default Filter;
