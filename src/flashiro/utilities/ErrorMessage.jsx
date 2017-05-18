import FontAwesome from 'react-fontawesome';
import PropTypes from 'prop-types';
import React from 'react';

import './ErrorMessage.scss';

const propTypes = {
  message: PropTypes.string.isRequired,
};

function ErrorMessage(props) {
  return (
    <div className="error-message text-center">
      <FontAwesome className="error-message__icon" name="warning" />
      <span className="error-message__text">{props.message}</span>
    </div>
  );
}

ErrorMessage.propTypes = propTypes;

export default ErrorMessage;
