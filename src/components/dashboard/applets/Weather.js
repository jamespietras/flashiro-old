import PropTypes from 'prop-types';
import React, {Component} from 'react';

import Spinner from '../../Spinner';

class Weather extends Component {
  static PropTypes = {
    city: PropTypes.string.isRequired,
    forecast: PropTypes.arrayOf(PropTypes.shape({
      description: PropTypes.string.isRequired,
      temp: PropTypes.number.isRequired
    })).isRequired,
    loading: PropTypes.bool.isRequired
  };

  render() {
    if(this.props.loading) {
      return (<Spinner />);
    }

    return (
      <div>
        Weather
      </div>
    );
  }
}

export default Weather;
