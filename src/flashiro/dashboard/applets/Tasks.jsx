import _filter from 'lodash/filter';
import _map from 'lodash/map';
import _uniqueId from 'lodash/uniqueId';
import FontAwesome from 'react-fontawesome';
import React, { Component } from 'react';
import { CSSTransitionGroup } from 'react-transition-group';
import { FormControl, Nav, NavItem, Tab } from 'react-bootstrap';

import './Tasks.scss';

class Tasks extends Component {
  constructor(props) {
    super(props);

    this.state = {
      createFieldValue: '',
      tabsId: null,
      todoList: [
        { id: _uniqueId('task_'), title: 'Cook the dinner', priority: false },
        { id: _uniqueId('task_'), title: 'Buy the book', priority: false },
        { id: _uniqueId('task_'), title: 'Pay the rent', priority: true },
        { id: _uniqueId('task_'), title: 'Tidy up the closet', priority: false },
      ],
    };

    this.completeTask = this.completeTask.bind(this);
    this.createTask = this.createTask.bind(this);
    this.updateCreateValue = this.updateCreateValue.bind(this);
  }

  componentWillMount() {
    this.setState({
      tabsId: _uniqueId('tabs_'),
    });
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
      todoList: this.state.todoList.concat([
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
        <Tab.Container id={this.state.tabsId} defaultActiveKey="ongoing">
          <div>
            <header className="tasks__header">
              <FontAwesome className="tasks__header-icon" name="file-text-o" />

              <div>
                <h3 className="tasks__heading">Tasks</h3>
              </div>

              <Nav bsStyle="pills">
                <NavItem eventKey="ongoing">
                  Ongoing
                </NavItem>

                <NavItem eventKey="archive">
                  Archive
                </NavItem>
              </Nav>
            </header>

            <Tab.Content animation>
              <Tab.Pane eventKey="ongoing">
                <ul className="list-unstyled tasks__list">
                  <CSSTransitionGroup
                    transitionName="manipulation"
                    transitionEnterTimeout={500}
                    transitionLeaveTimeout={500}
                  >
                    {_map(this.state.todoList, entry => (
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
              </Tab.Pane>

              <Tab.Pane eventKey="archive">
                Archive view - in progress.
              </Tab.Pane>
            </Tab.Content>
          </div>
        </Tab.Container>

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
