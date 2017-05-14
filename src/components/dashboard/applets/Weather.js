import _ from 'lodash';
import classnames from 'classnames';
import FontAwesome from 'react-fontawesome';
import moment from 'moment';
import PropTypes from 'prop-types';
import React, {Component} from 'react';

import ErrorMessage from '../../ErrorMessage';
import Spinner from '../../Spinner';

import './Weather.css';

class Weather extends Component {
  static propTypes = {
    city: PropTypes.string,
    error: PropTypes.shape(),
    forecast: PropTypes.arrayOf(PropTypes.shape({
      icon: PropTypes.string.isRequired,
      temperature: PropTypes.number.isRequired,
      time: PropTypes.instanceOf(moment)
    })),
    loading: PropTypes.bool.isRequired
  };

  constructor(props) {
    super(props);

    this.state = {
      expanded: false
    };

    this.toggleExpansion = this.toggleExpansion.bind(this);
  }

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

  toggleExpansion() {
    this.setState({
      expanded: !this.state.expanded
    });
  }

  render() {
    if(this.props.error) {
      return (
        <div className="weather--not-loaded">
          <ErrorMessage message={this.props.error} />
        </div>
      );
    }

    if(this.props.loading || _.isEmpty(this.props.forecast)) {
      return (
        <div className="weather--not-loaded">
          <Spinner />
        </div>
      );
    }

    const closestEntry = _.minBy(this.props.forecast, (entry) => {
      return entry.time.diff();
    });

    return (
      <div>
        <div className="weather__current">
          <span className="weather__current-icon">
            {this.getIconFor(closestEntry.icon)}
          </span>

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

        <ul className={classnames(
          'weather__forecast',
          this.state.expanded && 'weather__forecast--expanded',
          'list-unstyled'
        )}>
          {_.map(this.props.forecast, (entry, index) => (
            <li key={index} className="clearfix">
              <span className="pull-left">{entry.time.format('HH:mm')}</span>
              <span className="weather__forecast-icon">
                {this.getIconFor(entry.icon)}
              </span>
              <span className="pull-right">{entry.temperature}&deg;</span>
            </li>
          ))}
        </ul>

        <div className="weather__expander" onClick={this.toggleExpansion}>
          <FontAwesome
            className="weather__expander-icon"
            name={this.state.expanded ? 'angle-double-up' : 'angle-double-down'}
          />
        </div>
      </div>
    );
  }
}

export default Weather;
