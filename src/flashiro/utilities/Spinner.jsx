import FontAwesome from 'react-fontawesome';
import React from 'react';

import './Spinner.scss';

const Spinner = () => (
  <div className="text-center">
    <FontAwesome className="spinner" name="refresh" spin />
  </div>
);

export default Spinner;
