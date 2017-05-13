import React, {Component} from 'react';
import {Button} from 'react-bootstrap';
import {connect} from 'react-redux';

import {loadCnnHeadlines} from '../actions/headlines';

class Dashboard extends Component {
  componentDidMount() {
    this.props.loadCnnHeadlines();
  }

  shouldComponentUpdate(nextProps, nextState) {
    return this.props.cnnHeadlines !== nextProps.cnnHeadlines;
  }

  render() {
    return (
      <div>
        <h1 className="text-center">Welcome!</h1>

        <hr />

        <p>It's a perfect time to catch up with current world events!</p>
        <Button bsStyle="primary">Let's start!</Button>

        <hr />

        <h3>CNN top headlines:</h3>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    cnnHeadlines: state.headlines.cnn,
    loadingCnnHeadlines: state.headlines.loadingCnn
  };
}

const actions = {
  loadCnnHeadlines
};

export default connect(mapStateToProps, actions)(Dashboard);
