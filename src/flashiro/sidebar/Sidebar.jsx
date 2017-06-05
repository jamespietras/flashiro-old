import React from 'react';
import { Link } from 'react-router-dom';

import './Sidebar.scss';

const Sidebar = () => (
  <div className="sidebar">
    <ul className="list-unstyled">
      <li><Link to="/">Dashboard</Link></li>
      <li><Link to="/test">Test</Link></li>
    </ul>
  </div>
);

export default Sidebar;
