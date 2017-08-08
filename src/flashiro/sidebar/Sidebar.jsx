import _map from 'lodash/map';
import cx from 'classnames';
import FontAwesome from 'react-fontawesome';
import PropTypes from 'prop-types';
import React from 'react';
import { Link } from 'react-router-dom';

import './Sidebar.scss';

const menuEntries = [
  { icon: 'home', link: '/', title: 'Dashboard' },
  { icon: 'bolt', link: '/test', title: 'Test' },
];

const propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onEntryClick: PropTypes.func.isRequired,
};

const Sidebar = props => (
  <div className={cx({ sidebar: true, 'sidebar--open': props.isOpen })}>
    <div className="sidebar__backdrop" />

    <div className="sidebar__content">
      <div className="sidebar__user-info">
        <div className="sidebar__user-avatar" />
        <p className="sidebar__user-name">James Pietras</p>
      </div>

      <nav>
        <ul className="list-unstyled">
          {_map(menuEntries, (entry, index) => (
            <li key={index} className="sidebar__entry">
              <Link className="sidebar__entry-link" to={entry.link} onClick={props.onEntryClick}>
                <FontAwesome className="sidebar__entry-icon" name={entry.icon} />
                {entry.title}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  </div>
);

Sidebar.propTypes = propTypes;

export default Sidebar;
