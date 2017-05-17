import _ from 'lodash';
import moment from 'moment';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { ListGroup, ListGroupItem } from 'react-bootstrap';
import { connect } from 'react-redux';

import Clock from './applets/Clock';
import Spinner from '../Spinner';
import Weather from './applets/Weather';
import { loadCnnHeadlines } from '../../actions/headlines';
import { loadWeatherForecast } from '../../actions/weather';

import './Dashboard.scss';

const defaultProps = {
  cnnHeadlines: [],
  weatherCity: null,
  weatherError: null,
  weatherForecast: [],
};

const propTypes = {
  cnnHeadlines: PropTypes.arrayOf(PropTypes.shape({
    author: PropTypes.string,
    description: PropTypes.string.isRequired,
    publishedAt: PropTypes.string,
    title: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
    urlToImage: PropTypes.string.isRequired,
  })),
  loadCnnHeadlines: PropTypes.func.isRequired,
  loadWeatherForecast: PropTypes.func.isRequired,
  loadingCnnHeadlines: PropTypes.bool.isRequired,
  weatherCity: PropTypes.string,
  weatherError: PropTypes.string,
  weatherForecast: PropTypes.arrayOf(PropTypes.shape({
    icon: PropTypes.string.isRequired,
    temperature: PropTypes.number.isRequired,
    time: PropTypes.instanceOf(moment),
  })),
  weatherLoading: PropTypes.bool.isRequired,
};

class Dashboard extends Component {
  componentDidMount() {
    this.props.loadCnnHeadlines();
    this.props.loadWeatherForecast();
  }

  render() {
    return (
      <div className="dashboard">
        <div className="dashboard__tile">
          <Clock />
        </div>

        <div className="dashboard__tile dashboard__tile--unpadded">
          <Weather
            city={this.props.weatherCity}
            error={this.props.weatherError}
            forecast={this.props.weatherForecast}
            loading={this.props.weatherLoading}
          />
        </div>

        {this.props.loadingCnnHeadlines ?
          <Spinner />
          :
          <ListGroup>
            {_.map(this.props.cnnHeadlines, (headline, index) => (
              <ListGroupItem key={index} href={headline.url}>
                <h4>{headline.title}</h4>
              </ListGroupItem>
            ))}
          </ListGroup>
        }
      </div>
    );
  }
}

Dashboard.defaultProps = defaultProps;
Dashboard.propTypes = propTypes;

function mapStateToProps(state) {
  return {
    cnnHeadlines: state.headlines.cnn,
    loadingCnnHeadlines: state.headlines.loadingCnn,
    weatherCity: state.weather.city,
    weatherError: state.weather.forecastError,
    weatherForecast: state.weather.forecast,
    weatherLoading: state.weather.loadingForecast,
  };
}

const actions = {
  loadCnnHeadlines,
  loadWeatherForecast,
};

export default connect(mapStateToProps, actions)(Dashboard);
