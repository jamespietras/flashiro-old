import _map from 'lodash/map';
import FontAwesome from 'react-fontawesome';
import React from 'react';
import { Link } from 'react-router-dom';

import './Sidebar.scss';

const menuEntries = [
  { icon: 'home', link: '/', title: 'Dashboard' },
  { icon: 'diamond', link: '/test', title: 'Test' },
];

const Sidebar = () => (
  <div className="sidebar">
    <div className="sidebar__user-info">
      <div className="sidebar__user-avatar" />
      <p className="sidebar__user-name">James Pietras</p>
    </div>

    <nav>
      <ul className="list-unstyled">
        {_map(menuEntries, entry => (
          <li className="sidebar__entry">
            <Link className="sidebar__entry-link" to={entry.link}>
              <FontAwesome className="sidebar__entry-icon" name={entry.icon} />
              {entry.title}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  </div>
);

export default Sidebar;
