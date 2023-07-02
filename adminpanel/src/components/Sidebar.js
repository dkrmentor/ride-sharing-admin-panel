import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUsers, faClipboardList } from '@fortawesome/free-solid-svg-icons';
import logo from '../assets/logo.jpg';

export const Sidebar = () => {
  const navigate = useNavigate();
  const [activeMenu, setActiveMenu] = useState('users'); // Set the default active button here

  const handleClickDrivers = () => {
    navigate('/admin/drivers');
    setActiveMenu('drivers');
  };

  const handleClickUsers = () => {
    navigate('/admin');
    setActiveMenu('users');
  };

  const handleClickRiderHistory = () => {
    navigate('/admin/rider-history');
    setActiveMenu('rider-history');
  };

  const handleClickActiveDrivers = () => {
    navigate('/admin/active-drivers');
    setActiveMenu('active-drivers');
  };

  return (
    <div className="sidebar">
      <div className="logo">
        <img width={80} src={logo} alt="Logo" />
      </div>
      <div className="divider"></div>
      <nav>
        <ul className="nav-menu">
          <li onClick={handleClickDrivers} className={activeMenu === 'drivers' ? 'active-btn' : ''}>
            <FontAwesomeIcon icon={faUsers} />
            <span>Driver Management</span>
          </li>
          <li onClick={handleClickUsers} className={activeMenu === 'users' ? 'active-btn' : ''}>
            <FontAwesomeIcon icon={faUsers} />
            <span>User Management</span>
          </li>
          <li onClick={handleClickRiderHistory} className={activeMenu === 'rider-history' ? 'active-btn' : ''}>
            <FontAwesomeIcon icon={faClipboardList} />
            <span>Rider History</span>
          </li>
          <li onClick={handleClickActiveDrivers} className={activeMenu === 'active-drivers' ? 'active-btn' : ''}>
            <FontAwesomeIcon icon={faUsers} />
            <span>Active Drivers</span>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
