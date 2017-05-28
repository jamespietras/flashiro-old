import FontAwesome from 'react-fontawesome';
import React from 'react';

import './Spinner.scss';

function Spinner() {
  return (
    <div className="text-center">
      <FontAwesome className="spinner" name="refresh" spin />
    </div>
  );
}

export default Spinner;
