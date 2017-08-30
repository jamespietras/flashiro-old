import * as React from 'react';
import { connect } from 'react-redux';
import { Grid } from 'react-bootstrap';

import Sidebar from 'flashiro/sidebar';
import { IRootState } from '@flashiro/reducers';
import { toggleSidebar } from '@flashiro/actions/sidebar';

import './App.scss';

interface IAppProps {
  children: React.ReactChildren,
  sidebarOpen: boolean,
  toggleSidebar(): any,
}

const AppComponent: React.StatelessComponent<IAppProps> = props => (
  <div className="app">
    <Sidebar isOpen={props.sidebarOpen} onEntryClick={props.toggleSidebar} />

    <div className="app__content">
      <Grid fluid={true}>
        {props.children}
      </Grid>
    </div>
  </div>
);

function mapStateToProps(state: IRootState) {
  return {
    sidebarOpen: state.sidebar.open,
  };
}

const actions = {
  toggleSidebar,
};

export const App = connect(mapStateToProps, actions)(AppComponent);
