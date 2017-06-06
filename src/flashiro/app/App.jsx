import PropTypes from 'prop-types';
import React from 'react';
import { Grid } from 'react-bootstrap';

import Sidebar from 'flashiro/sidebar';

import './App.scss';

const propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};

function App(props) {
  return (
    <div className="app">
      <Sidebar />

      <Grid>
        {props.children}
      </Grid>
    </div>
  );
}

App.propTypes = propTypes;

export default App;
