import _map from 'lodash/map';
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
        { title: 'Cook the dinner', priority: false },
        { title: 'Buy the book', priority: false },
        { title: 'Pay the rent', priority: true },
        { title: 'Tidy up the closet', priority: false },
      ],
    };

    this.createTask = this.createTask.bind(this);
    this.updateCreateValue = this.updateCreateValue.bind(this);
  }

  createTask() {
    this.setState({
      createFieldValue: '',
      todoList: this.state.todoList.concat([
        { title: this.state.createFieldValue, priority: true },
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
            {_map(this.state.todoList, (entry, index) => (
              <li key={index} className="tasks__list-entry">
                <div className="tasks__list-entry-content">
                  <span className="tasks__list-entry-title">{entry.title}</span>
                  {entry.priority &&
                    <FontAwesome className="tasks__priority" name="exclamation-triangle" />
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
              maxLength="150"
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
