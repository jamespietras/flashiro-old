import React, {Component} from 'react';
import {Col, Grid, Row} from 'react-bootstrap';

import './App.css';

class App extends Component {
  render() {
    return (
      <div className="app">
        <Grid>
          <Row>
            <Col sm={6} smOffset={3} lg={4} lgOffset={4}>
              {this.props.children}
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}

export default App;
