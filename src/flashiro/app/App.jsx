import PropTypes from 'prop-types';
import React from 'react';
import { Col, Grid, Row } from 'react-bootstrap';

import './App.scss';

const propTypes = {
  children: PropTypes.shape().isRequired,
};

function App(props) {
  return (
    <div className="app">
      <Grid>
        <Row>
          <Col sm={6} smOffset={3} lg={4} lgOffset={4}>
            {props.children}
          </Col>
        </Row>
      </Grid>
    </div>
  );
}

App.propTypes = propTypes;

export default App;
