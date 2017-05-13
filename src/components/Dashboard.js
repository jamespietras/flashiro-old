import _ from 'lodash';
import React, {Component} from 'react';
import {Button, ListGroup, ListGroupItem} from 'react-bootstrap';
import {connect} from 'react-redux';

import {loadCnnHeadlines} from '../actions/headlines';

class Dashboard extends Component {
  componentDidMount() {
    this.props.loadCnnHeadlines();
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
        {this.props.loadingCnnHeadlines ?
            <p>Loading...</p>
          :
            <ListGroup>
              {_.map(this.props.cnnHeadlines, (headline, index) => (
                <ListGroupItem key={index}href={headline.url}>
                  <h4>{headline.title}</h4>
                </ListGroupItem>
              ))}
            </ListGroup>
        }
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
