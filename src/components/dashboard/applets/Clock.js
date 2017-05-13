import FontAwesome from 'react-fontawesome';
import moment from 'moment';
import React, {Component} from 'react';

import './Clock.css';

class Clock extends Component {
  componentDidMount() {
    this.ticker = setInterval(() => { this.forceUpdate(); }, 1000);
  }

  componentWillUnmount() {
    clearInterval(this.ticker);
  }

  render() {
    return (
      <div className="clock">
        <FontAwesome className="clock__icon" name="clock-o" />

        <div className="clock__info">
          <div className="clock__time">{moment().format('h:mma')}</div>
          <div className="clock__date">{moment().format('dddd, MMMM do')}</div>
        </div>
      </div>
    );
  }
}

export default Clock;
