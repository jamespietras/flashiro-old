import _map from 'lodash/map';
import cx from 'classnames';
import FontAwesome from 'react-fontawesome';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { CSSTransitionGroup } from 'react-transition-group';
import { FormControl } from 'react-bootstrap';

import OverflowTooltip from 'flashiro/utilities/OverflowTooltip';

import './Tasks.scss';

const propTypes = {
  list: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    priority: PropTypes.bool.isRequired,
  })).isRequired,
  onTaskCreation: PropTypes.func.isRequired,
  onTaskCompletion: PropTypes.func.isRequired,
  onTaskPriorityToggle: PropTypes.func.isRequired,
};

class Tasks extends Component {
  constructor(props) {
    super(props);

    this.state = {
      createFieldValue: '',
    };

    this.createTask = this.createTask.bind(this);
    this.updateCreateValue = this.updateCreateValue.bind(this);
  }

  createTask(event) {
    event.preventDefault();

    if (!this.state.createFieldValue) {
      return;
    }

    this.setState({
      createFieldValue: '',
    });

    this.props.onTaskCreation(this.state.createFieldValue);
  }

  updateCreateValue(newValue) {
    this.setState({ createFieldValue: newValue });
  }

  render() {
    return (
      <div>
        <header className="tasks__header">
          <FontAwesome className="tasks__header-icon" name="file-text-o" />
          <h3 className="tasks__heading">Important tasks</h3>
        </header>

        <ul className="list-unstyled tasks__list">
          <CSSTransitionGroup
            transitionName="manipulation"
            transitionEnterTimeout={500}
            transitionLeaveTimeout={500}
          >
            {_map(this.props.list, entry => (
              <li key={entry.id} className="tasks__list-entry">
                <button
                  className="tasks__list-entry-content"
                  onClick={() => this.props.onTaskCompletion(entry.id)}
                >
                  <div className="tasks__list-completion-action">
                    <FontAwesome name="check" />
                  </div>

                  <OverflowTooltip content={entry.title}>
                    <span className="tasks__list-entry-title">
                      {entry.title}
                    </span>
                  </OverflowTooltip>
                </button>

                <button
                  className="tasks__priority"
                  onClick={() => this.props.onTaskPriorityToggle(entry.id)}
                >
                  <FontAwesome
                    className={cx({
                      'tasks__priority-icon': true,
                      'tasks__priority-icon--active': entry.priority,
                    })}
                    name="exclamation"
                  />
                </button>
              </li>
            ))}
          </CSSTransitionGroup>
        </ul>

        <form className="tasks__create" onSubmit={this.createTask}>
          <FormControl
            className="tasks__create-field"
            type="text"
            maxLength="150"
            placeholder="Add a task..."
            value={this.state.createFieldValue}
            onChange={event => this.updateCreateValue(event.target.value)}
          />

          <button className="tasks__create-button" type="submit">
            <FontAwesome className="tasks__create-icon" name="plus" />
          </button>
        </form>
      </div>
    );
  }
}

Tasks.propTypes = propTypes;

export default Tasks;
