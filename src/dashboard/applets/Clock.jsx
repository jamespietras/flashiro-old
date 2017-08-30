import FontAwesome from 'react-fontawesome';
import moment from 'moment';
import React, { Component } from 'react';

import './Clock.scss';

class Clock extends Component {
  constructor(props) {
    super(props);

    this.state = {
      minutes: moment().format('mm'),
    };

    this.recalculateTime = this.recalculateTime.bind(this);
  }

  componentDidMount() {
    this.ticker = setInterval(() => { this.recalculateTime(); }, 1000);
  }

  shouldComponentUpdate(nextProps, nextState) {
    return nextState.minutes !== this.state.minutes;
  }

  componentWillUnmount() {
    clearInterval(this.ticker);
  }

  recalculateTime() {
    this.setState({
      minutes: moment().format('mm'),
    });
  }

  render() {
    const currentTime = moment();

    return (
      <div className="clock">
        <FontAwesome className="clock__icon" name="clock-o" />

        <div className="clock__info">
          <div className="clock__time">
            {currentTime.format('h')}:{this.state.minutes}{currentTime.format('a')}
          </div>

          <div className="clock__date">{currentTime.format('dddd, MMMM Do')}</div>
        </div>
      </div>
    );
  }
}

export default Clock;
