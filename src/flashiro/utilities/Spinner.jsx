import FontAwesome from 'react-fontawesome';
import React from 'react';

import './Spinner.scss';

const Spinner = () => (
  <div className="spinner">
    <FontAwesome className="spinner__icon" name="refresh" spin />
  </div>
);

export default Spinner;
