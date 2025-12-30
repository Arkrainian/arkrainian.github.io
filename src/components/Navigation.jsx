import React from 'react';
import { NavLink } from 'react-router-dom';
import { Home, Briefcase, Book, Code, FolderGit2, Mail } from 'lucide-react';
import './Navigation.css'; // We'll create this for specific nav styles

const navItems = [
  { path: '/', icon: <Home size={24} />, label: 'Home' },
  { path: '/experience', icon: <Briefcase size={24} />, label: 'Experience' },
  { path: '/skills', icon: <Code size={24} />, label: 'Skills' },
  { path: '/education', icon: <Book size={24} />, label: 'Education' },
  { path: '/projects', icon: <FolderGit2 size={24} />, label: 'Projects' },
  { path: '/contact', icon: <Mail size={24} />, label: 'Contact' },
];

const Navigation = () => {
  return (
    <nav className="side-nav">
      <div className="nav-logo">
        <span className="logo-initial">A</span>
      </div>
      <ul className="nav-list">
        {navItems.map((item) => (
          <li key={item.path}>
            <NavLink
              to={item.path}
              className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
            >
              <span className="nav-icon">{item.icon}</span>
              <span className="nav-label">{item.label}</span>
              <div className="nav-indicator"></div>
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Navigation;
