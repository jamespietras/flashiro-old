import React, {Component} from 'react';
import {Grid} from 'react-bootstrap';

class App extends Component {
  render() {
    return (
      <Grid>
        {this.props.children}
      </Grid>
    );
  }
}

export default App;
