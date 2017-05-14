import _ from 'lodash';
import FontAwesome from 'react-fontawesome';
import moment from 'moment';
import PropTypes from 'prop-types';
import React, {Component} from 'react';

import Spinner from '../../Spinner';

import './Weather.css';

class Weather extends Component {
  static PropTypes = {
    city: PropTypes.string.isRequired,
    forecast: PropTypes.arrayOf(PropTypes.shape({
      icon: PropTypes.string.isRequired,
      temperature: PropTypes.number.isRequired,
      time: PropTypes.instanceOf(moment)
    })).isRequired,
    loading: PropTypes.bool.isRequired
  };

  getIconFor(iconName) {
    switch(iconName) {
      case 'clear':
        return <FontAwesome name="moon-o" />;
      case 'clouds':
        return <FontAwesome name="cloud" />;
      case 'drizzle':
        return <FontAwesome name="cubes" />;
      case 'extreme':
        return <FontAwesome name="warning " />;
      case 'rain':
        return <FontAwesome name="tint" />;
      case 'snow':
        return <FontAwesome name="snowflake-o" />;
      case 'thunderstorm':
        return <FontAwesome name="bolt" />;
      default:
        return <FontAwesome name="question" />;
    }
  }

  render() {
    if(this.props.loading || _.isEmpty(this.props.forecast)) {
      return (<Spinner />);
    }

    const closestEntry = _.minBy(this.props.forecast, (entry) => {
      return entry.time.diff();
    });

    return (
      <div>
        <div className="weather__current">
          <span className="weather__current-icon">{this.getIconFor(closestEntry.icon)}</span>

          <div>
            <div className="weather__current-temperature">
              {closestEntry.temperature}&deg;
            </div>

            <div className="weather__current-description">
              {_.capitalize(closestEntry.description)}
            </div>
          </div>
        </div>

        <div className="weather__info">
          <FontAwesome className="weather__info-icon" name="map-marker" />
          {this.props.city}

          <FontAwesome className="weather__info-icon" name="caret-up" />
          {_.max(_.map(this.props.forecast, 'temperature'))}&deg;

          <FontAwesome className="weather__info-icon" name="caret-down" />
          {_.min(_.map(this.props.forecast, 'temperature'))}&deg;
        </div>

        <ul className="weather__forecast list-unstyled">
          {_.map(this.props.forecast, (entry, index) => (
            <li key={index} className="clearfix">
              <span className="pull-left">{entry.time.format('ha')}</span>
              <span className="weather__forecast-icon">
                {this.getIconFor(entry.icon)}
              </span>
              <span className="pull-right">{entry.temperature}&deg;</span>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default Weather;
