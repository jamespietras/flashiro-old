import moment from 'moment';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Col, Row } from 'react-bootstrap';
import { connect } from 'react-redux';

import { loadCnnHeadlines } from 'flashiro/actions/headlines';
import { clearNotes, editNotes } from 'flashiro/actions/notes';
import { completeTask, createTask, toggleTaskPriority } from 'flashiro/actions/tasks';
import { loadWeatherForecast } from 'flashiro/actions/weather';
import Clock from './applets/Clock';
import News from './applets/News';
import Notes from './applets/Notes';
import Tasks from './applets/Tasks';
import Weather from './applets/Weather';

import './Dashboard.scss';

const defaultProps = {
  cnnHeadlines: [],
  weatherCity: null,
  weatherError: null,
  weatherForecast: [],
};

const propTypes = {
  clearNotes: PropTypes.func.isRequired,
  cnnHeadlines: PropTypes.arrayOf(PropTypes.shape({
    author: PropTypes.string,
    description: PropTypes.string.isRequired,
    publishedAt: PropTypes.string,
    title: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
    urlToImage: PropTypes.string.isRequired,
  })).isRequired,
  createTask: PropTypes.func.isRequired,
  completeTask: PropTypes.func.isRequired,
  editNotes: PropTypes.func.isRequired,
  loadCnnHeadlines: PropTypes.func.isRequired,
  loadWeatherForecast: PropTypes.func.isRequired,
  loadingCnnHeadlines: PropTypes.bool.isRequired,
  notes: PropTypes.string.isRequired,
  tasks: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    priority: PropTypes.bool.isRequired,
  })).isRequired,
  toggleTaskPriority: PropTypes.func.isRequired,
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
        <Row>
          <Col lg={4}>
            <div className="dashboard__tile dashboard__tile--unpadded">
              <Weather
                city={this.props.weatherCity}
                error={this.props.weatherError}
                forecast={this.props.weatherForecast}
                loading={this.props.weatherLoading}
              />
            </div>

            <div className="dashboard__tile">
              <Notes
                onNotesClear={this.props.clearNotes}
                onNotesEdit={this.props.editNotes}
                value={this.props.notes}
              />
            </div>
          </Col>

          <Col lg={4}>
            <div className="dashboard__tile">
              <Clock />
            </div>

            <div className="dashboard__tile dashboard__tile--unpadded">
              <Tasks
                list={this.props.tasks}
                onTaskCreation={this.props.createTask}
                onTaskCompletion={this.props.completeTask}
                onTaskPriorityToggle={this.props.toggleTaskPriority}
              />
            </div>
          </Col>

          <Col lg={4}>
            <div className="dashboard__tile">
              <News
                headlines={this.props.cnnHeadlines}
                loading={this.props.loadingCnnHeadlines}
              />
            </div>
          </Col>
        </Row>
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
    notes: state.notes.value,
    tasks: state.tasks.list,
    weatherCity: state.weather.city,
    weatherError: state.weather.forecastError,
    weatherForecast: state.weather.forecast,
    weatherLoading: state.weather.loadingForecast,
  };
}

const actions = {
  clearNotes,
  completeTask,
  createTask,
  editNotes,
  loadCnnHeadlines,
  loadWeatherForecast,
  toggleTaskPriority,
};

export default connect(mapStateToProps, actions)(Dashboard);
