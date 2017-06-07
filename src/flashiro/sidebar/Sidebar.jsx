import _map from 'lodash/map';
import cx from 'classnames';
import FontAwesome from 'react-fontawesome';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import './Sidebar.scss';

const menuEntries = [
  { icon: 'home', link: '/', title: 'Dashboard' },
  { icon: 'bolt', link: '/test', title: 'Test' },
];

class Sidebar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      open: false,
    };

    this.toggleVisibility = this.toggleVisibility.bind(this);
  }

  toggleVisibility() {
    this.setState({
      open: !this.state.open,
    });
  }

  render() {
    return (
      <div className="sidebar">
        <div
          className={cx({
            sidebar__backdrop: true,
            'sidebar__backdrop--visible': this.state.open,
          })}
        />

        <div
          className={cx({
            sidebar__drawer: true,
            'sidebar__drawer--open': this.state.open,
          })}
        >
          <button className="sidebar__handle" onClick={this.toggleVisibility}>
            <FontAwesome className="sidebar__handle-icon" name="arrow-right" />
          </button>

          <div className="sidebar__content">
            <div className="sidebar__user-info">
              <div className="sidebar__user-avatar" />
              <p className="sidebar__user-name">James Pietras</p>
            </div>

            <nav>
              <ul className="list-unstyled">
                {_map(menuEntries, (entry, index) => (
                  <li key={index} className="sidebar__entry">
                    <Link
                      className="sidebar__entry-link"
                      to={entry.link}
                      onClick={this.toggleVisibility}
                    >
                      <FontAwesome className="sidebar__entry-icon" name={entry.icon} />
                      {entry.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </div>
      </div>
    );
  }
}

export default Sidebar;
