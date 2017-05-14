import FontAwesome from 'react-fontawesome';
import PropTypes from 'prop-types';
import React, {Component} from 'react';

import './ErrorMessage.css';

class ErrorMessage extends Component {
  static propTypes = {
    message: PropTypes.string.isRequired
  };

  render() {
    return (
      <div className="error-message text-center">
        <FontAwesome className="error-message__icon" name="warning" />
        <span className="error-message__text">{this.props.message}</span>
      </div>
    );
  }
}

export default ErrorMessage;
