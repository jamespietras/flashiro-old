import _ from 'lodash';
import React, {Component} from 'react';
import {ListGroup, ListGroupItem} from 'react-bootstrap';
import {connect} from 'react-redux';

import Clock from './applets/Clock';
import Spinner from '../Spinner';
import Weather from './applets/Weather';
import {loadCnnHeadlines} from '../../actions/headlines';
import {loadWeatherForecast} from '../../actions/weather';

import './Dashboard.css';

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

function mapStateToProps(state) {
  return {
    cnnHeadlines: state.headlines.cnn,
    loadingCnnHeadlines: state.headlines.loadingCnn,
    weatherCity: state.weather.city,
    weatherForecast: state.weather.forecast,
    weatherLoading: state.weather.loadingForecast
  };
}

const actions = {
  loadCnnHeadlines,
  loadWeatherForecast
};

export default connect(mapStateToProps, actions)(Dashboard);
