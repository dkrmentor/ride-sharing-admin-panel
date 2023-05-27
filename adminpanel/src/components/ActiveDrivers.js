import React, { useEffect, useState } from 'react';
import { getActiveDrivers } from '../api';

const ActiveDrivers = () => {
  const [activeDrivers, setActiveDrivers] = useState([]);

  useEffect(() => {
    getActiveDrivers().then((driversData) => {
      setActiveDrivers(driversData);
    });
  }, []);

  return (
    <div>
      <h3>Active Drivers</h3>
      {activeDrivers.map((driver) => (
        <div key={driver.id}>
          <p>{driver.latitude}</p>
          <p>{driver.longitude}</p>
        </div>
      ))}
    </div>
  );
};

export default ActiveDrivers;



