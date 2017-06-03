import _filter from 'lodash/filter';
import _map from 'lodash/map';
import _uniqueId from 'lodash/uniqueId';
import FontAwesome from 'react-fontawesome';
import React, { Component } from 'react';
import { CSSTransitionGroup } from 'react-transition-group';
import { FormControl } from 'react-bootstrap';

import './Tasks.scss';

const tabs = {
  ARCHIVE: 1,
  ONGOING: 2,
};

class Tasks extends Component {
  constructor(props) {
    super(props);

    this.state = {
      archiveList: [
        { id: _uniqueId('task_'), title: 'Clean up the laptop', priority: false },
        { id: _uniqueId('task_'), title: 'Feed cats', priority: false },
        { id: _uniqueId('task_'), title: 'Close the flat', priority: true },
        { id: _uniqueId('task_'), title: 'Restock water', priority: false },
      ],
      createFieldValue: '',
      ongoingList: [
        { id: _uniqueId('task_'), title: 'Cook the dinner', priority: false },
        { id: _uniqueId('task_'), title: 'Buy the book', priority: false },
        { id: _uniqueId('task_'), title: 'Pay the rent', priority: true },
        { id: _uniqueId('task_'), title: 'Tidy up the closet', priority: false },
      ],
      tab: tabs.ONGOING,
    };

    this.getActiveTodoList = this.getActiveTodoList.bind(this);
    this.changeTab = this.changeTab.bind(this);
    this.completeTask = this.completeTask.bind(this);
    this.createTask = this.createTask.bind(this);
    this.updateCreateValue = this.updateCreateValue.bind(this);
  }

  getActiveTodoList() {
    switch (this.state.tab) {
      case tabs.ARCHIVE:
        return this.state.archiveList;
      case tabs.ONGOING:
        return this.state.ongoingList;
      default:
    }

    return [];
  }

  changeTab(newTabId) {
    this.setState({ tab: newTabId });
  }

  completeTask(taskId) {
    this.setState({
      todoList: _filter(this.state.todoList, entry => entry.id !== taskId),
    });
  }

  createTask(event) {
    event.preventDefault();

    this.setState({
      createFieldValue: '',
      ongoingList: this.state.ongoingList.concat([
        { id: _uniqueId('task_'), title: this.state.createFieldValue, priority: false },
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
          <h3 className="tasks__heading">Tasks</h3>

          <button onClick={() => this.changeTab(tabs.ONGOING)}>Ongoing</button>
          <button onClick={() => this.changeTab(tabs.ARCHIVE)}>Archive</button>
        </header>

        <ul className="list-unstyled tasks__list">
          <CSSTransitionGroup
            transitionName="manipulation"
            transitionEnterTimeout={500}
            transitionLeaveTimeout={500}
          >
            {_map(this.getActiveTodoList(), entry => (
              <li key={entry.id} className="tasks__list-entry">
                <button
                  className="tasks__list-entry-content"
                  onClick={() => this.completeTask(entry.id)}
                >
                  <div className="tasks__list-completion-action">
                    <FontAwesome name="pencil" />
                  </div>

                  <span className="tasks__list-entry-title">
                    {entry.title}
                  </span>

                  {entry.priority &&
                    <FontAwesome className="tasks__priority" name="exclamation" />
                  }
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

export default Tasks;
