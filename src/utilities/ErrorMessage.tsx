import * as FontAwesome from 'react-fontawesome';
import * as React from 'react';

import './ErrorMessage.scss';

interface IErrorMessageProps {
  message: string,
}

const ErrorMessage = (props: IErrorMessageProps) => (
  <div className="error-message">
    <FontAwesome className="error-message__icon" name="warning" />
    <span className="error-message__text">{props.message}</span>
  </div>
);

export default ErrorMessage;
