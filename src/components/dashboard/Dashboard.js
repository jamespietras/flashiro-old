import _ from 'lodash';
import React, {Component} from 'react';
import {ListGroup, ListGroupItem} from 'react-bootstrap';
import {connect} from 'react-redux';

import Clock from './applets/Clock';
import {loadCnnHeadlines} from '../../actions/headlines';

import './Dashboard.css';

class Dashboard extends Component {
  componentDidMount() {
    this.props.loadCnnHeadlines();
  }

  render() {
    return (
      <div>
        <br />
        <Clock className="dashboard__tile" />

        {this.props.loadingCnnHeadlines ?
            <p>Loading...</p>
          :
            <ListGroup>
              {_.map(this.props.cnnHeadlines, (headline, index) => (
                <ListGroupItem key={index} href={headline.url}>
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
