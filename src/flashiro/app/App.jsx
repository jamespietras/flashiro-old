import PropTypes from 'prop-types';
import React from 'react';
import { Grid } from 'react-bootstrap';

import './App.scss';

const propTypes = {
  children: PropTypes.shape().isRequired,
};

function App(props) {
  return (
    <div className="app">
      <Grid>
        {props.children}
      </Grid>
    </div>
  );
}

App.propTypes = propTypes;

export default App;
