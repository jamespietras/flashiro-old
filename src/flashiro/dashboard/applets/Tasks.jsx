import _filter from 'lodash/filter';
import _map from 'lodash/map';
import _uniqueId from 'lodash/uniqueId';
import FontAwesome from 'react-fontawesome';
import React, { Component } from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import { FormControl, FormGroup, InputGroup } from 'react-bootstrap';

import './Tasks.scss';

class Tasks extends Component {
  constructor(props) {
    super(props);

    this.state = {
      createFieldValue: '',
      todoList: [
        { id: _uniqueId(), title: 'Cook the dinner', priority: false },
        { id: _uniqueId(), title: 'Buy the book', priority: false },
        { id: _uniqueId(), title: 'Pay the rent', priority: true },
        { id: _uniqueId(), title: 'Tidy up the closet', priority: false },
      ],
    };

    this.completeTask = this.completeTask.bind(this);
    this.createTask = this.createTask.bind(this);
    this.updateCreateValue = this.updateCreateValue.bind(this);
  }

  completeTask(taskId) {
    this.setState({
      todoList: _filter(this.state.todoList, entry => entry.id !== taskId),
    });
  }

  createTask() {
    this.setState({
      createFieldValue: '',
      todoList: this.state.todoList.concat([
        { id: _uniqueId(), title: this.state.createFieldValue, priority: true },
      ]),
    });
  }

  updateCreateValue(newValue) {
    this.setState({ createFieldValue: newValue });
  }

  render() {
    return (
      <div>
        <header className="tasks__header">
          <FontAwesome className="tasks__header-icon" name="file-text-o" />

          <div>
            <h3 className="tasks__heading">Tasks</h3>
            <div>Ongoing / Archive</div>
          </div>
        </header>

        <ul className="list-unstyled tasks__list">
          <ReactCSSTransitionGroup
            transitionName="manipulation"
            transitionEnterTimeout={500}
            transitionLeaveTimeout={500}
          >
            {_map(this.state.todoList, entry => (
              <li key={entry.id} className="tasks__list-entry">
                <div className="tasks__list-entry-content">
                  <button
                    className="tasks__list-completion-action"
                    onClick={() => this.completeTask(entry.id)}
                  >
                    <FontAwesome name="check" />
                  </button>

                  <span className="tasks__list-entry-title">
                    {entry.title}
                  </span>

                  {entry.priority &&
                    <FontAwesome className="tasks__priority" name="exclamation" />
                  }
                </div>
              </li>
            ))}
          </ReactCSSTransitionGroup>
        </ul>

        <FormGroup className="tasks__create">
          <InputGroup>
            <FormControl
              className="tasks__create-field"
              type="text"
              maxLength="42"
              value={this.state.createFieldValue}
              onChange={event => this.updateCreateValue(event.target.value)}
            />

            <InputGroup.Button>
              <button className="tasks__create-button" onClick={this.createTask}>
                <FontAwesome className="tasks__create-icon" name="plus-square" />
              </button>
            </InputGroup.Button>
          </InputGroup>
        </FormGroup>
      </div>
    );
  }
}

export default Tasks;
