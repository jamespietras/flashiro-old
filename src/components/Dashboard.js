import React, {Component} from 'react';
import {Button} from 'react-bootstrap';

class Dashboard extends Component {
  render() {
    return (
      <div>
        <h1 className="text-center">Welcome!</h1>

        <hr />

        <p>It's a perfect time to catch up with current world events!</p>

        <Button bsStyle="primary">Let's start!</Button>
      </div>
    );
  }
}

export default Dashboard;
