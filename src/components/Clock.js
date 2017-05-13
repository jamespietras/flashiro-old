import FontAwesome from 'react-fontawesome';
import moment from 'moment';
import React, {Component} from 'react';
import {Col, Row} from 'react-bootstrap';

class Clock extends Component {
  componentDidMount() {
    this.ticker = setInterval(() => { this.forceUpdate(); }, 1000);
  }

  componentWillUnmount() {
    clearInterval(this.ticker);
  }

  render() {
    return (
      <div className="dashboard-tile">
        <Row>
          <Col xs={2}>
            <FontAwesome name="clock-o" size="2x" />
          </Col>

          <Col xs={10}>
            <div>{moment().format('H:mm:ss')}</div>
            <div>{moment().format('dddd, MMMM do')}</div>
          </Col>
        </Row>
      </div>
    );
  }
}

export default Clock;
