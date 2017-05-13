import React, {Component} from 'react';
import {Grid} from 'react-bootstrap';

import './App.css';

class App extends Component {
  render() {
    return (
      <div className="app">
        <Grid>
          {this.props.children}
        </Grid>
      </div>
    );
  }
}

export default App;
