import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { Grid } from 'react-bootstrap';

import Sidebar from 'flashiro/sidebar';
import { toggleSidebar } from 'flashiro/actions/sidebar';

import './App.scss';

const propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
  sidebarOpen: PropTypes.bool.isRequired,
  toggleSidebar: PropTypes.func.isRequired,
};

const App = props => (
  <div className="app">
    <Sidebar isOpen={props.sidebarOpen} onEntryClick={props.toggleSidebar} />

    <div className="app__content">
      <Grid fluid>
        {props.children}
      </Grid>
    </div>
  </div>
);

App.propTypes = propTypes;

function mapStateToProps(state) {
  return {
    sidebarOpen: state.sidebar.open,
  };
}

const actions = {
  toggleSidebar,
};

export default connect(mapStateToProps, actions)(App);
