import _capitalize from 'lodash/capitalize';
import _isEmpty from 'lodash/isEmpty';
import _map from 'lodash/map';
import _max from 'lodash/max';
import _min from 'lodash/min';
import _minBy from 'lodash/minBy';
import cx from 'classnames';
import FontAwesome from 'react-fontawesome';
import moment from 'moment';
import PropTypes from 'prop-types';
import React, { Component } from 'react';

import ErrorMessage from 'flashiro/utilities/ErrorMessage';
import Spinner from 'flashiro/utilities/Spinner';

import './Weather.scss';

const propTypes = {
  city: PropTypes.string,
  error: PropTypes.string,
  forecast: PropTypes.arrayOf(PropTypes.shape({
    icon: PropTypes.string.isRequired,
    temperature: PropTypes.number.isRequired,
    time: PropTypes.instanceOf(moment),
  })),
  loading: PropTypes.bool.isRequired,
};

function getIconFor(iconName) {
  switch (iconName) {
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

class Weather extends Component {
  constructor(props) {
    super(props);

    this.state = {
      expanded: false,
    };

    this.toggleExpansion = this.toggleExpansion.bind(this);
  }

  toggleExpansion() {
    this.setState({
      expanded: !this.state.expanded,
    });
  }

  render() {
    if (this.props.error) {
      return (
        <div className="weather--not-loaded">
          <ErrorMessage message={this.props.error} />
        </div>
      );
    }

    if (this.props.loading || _isEmpty(this.props.forecast)) {
      return (
        <div className="weather--not-loaded">
          <Spinner />
        </div>
      );
    }

    const closestEntry = _minBy(this.props.forecast, entry => entry.time.diff());

    return (
      <div>
        <div className="weather__current">
          <span className="weather__current-icon">
            {getIconFor(closestEntry.icon)}
          </span>

          <div>
            <div className="weather__current-temperature">
              {closestEntry.temperature}&deg;
            </div>

            <div className="weather__current-description">
              {_capitalize(closestEntry.description)}
            </div>
          </div>
        </div>

        <div className="weather__info">
          <FontAwesome className="weather__info-icon" name="map-marker" />
          {this.props.city}

          <FontAwesome className="weather__info-icon" name="caret-up" />
          {_max(_map(this.props.forecast, 'temperature'))}&deg;

          <FontAwesome className="weather__info-icon" name="caret-down" />
          {_min(_map(this.props.forecast, 'temperature'))}&deg;
        </div>

        <ul
          className={cx(
            'weather__forecast',
            this.state.expanded && 'weather__forecast--expanded',
            'list-unstyled',
          )}
        >
          {_map(this.props.forecast, (entry, index) => (
            <li key={index} className="weather__forecast-entry">
              <span className="weather__forecast-time">{entry.time.format('HH:mm')}</span>

              <span className="weather__forecast-icon">
                {getIconFor(entry.icon)}
              </span>

              <span className="weather__forecast-temperature">{entry.temperature}&deg;</span>
            </li>
          ))}
        </ul>

        <button className="weather__expander" onClick={this.toggleExpansion}>
          <FontAwesome
            className="weather__expander-icon"
            name={this.state.expanded ? 'angle-double-up' : 'angle-double-down'}
          />
        </button>
      </div>
    );
  }
}

Weather.propTypes = propTypes;

export default Weather;
