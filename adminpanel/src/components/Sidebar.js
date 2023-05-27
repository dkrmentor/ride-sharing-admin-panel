import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUsers, faClipboardList } from '@fortawesome/free-solid-svg-icons';

export const Sidebar = () => {
  const navigate = useNavigate();

  const handleClickDrivers = () => {
    navigate('/admin/drivers');
  };

  const handleClickUsers = () => {
    navigate('/admin');
  };

  const handleClickRiderHistory = () => {
    navigate('/admin/rider-history');
  };

  const handleClickActiveDrivers = () => {
    navigate('/admin/active-drivers');
  };

  return (
    <div className="sidebar">
      <div className="logo">{/* <img src={logo} alt="Logo" /> */}</div>
      <div className="divider"></div>
      <nav>
        <ul className="nav-menu">
          <li onClick={handleClickDrivers}>
            <FontAwesomeIcon icon={faUsers} />
            <span>Driver Management</span>
          </li>
          <li onClick={handleClickUsers}>
            <FontAwesomeIcon icon={faUsers} />
            <span>User Management</span>
          </li>
          <li onClick={handleClickRiderHistory}>
            <FontAwesomeIcon icon={faClipboardList} />
            <span>Rider History</span>
          </li>
          <li onClick={handleClickActiveDrivers}>
            <FontAwesomeIcon icon={faUsers} />
            <span>Active Drivers</span>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
