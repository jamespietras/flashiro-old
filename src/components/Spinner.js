import FontAwesome from 'react-fontawesome';
import React, {Component} from 'react';

import './Spinner.css';

class Spinner extends Component {
  render() {
    return (
      <div className="text-center">
        <FontAwesome className="spinner" name="refresh" spin />
      </div>
    );
  }
}

export default Spinner;
