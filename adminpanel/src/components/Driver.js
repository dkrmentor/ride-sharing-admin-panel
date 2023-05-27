import React, { useEffect, useState } from 'react';
import { getDrivers } from '../api';

const Driver = () => {
  const [drivers, setDrivers] = useState([]);

  useEffect(() => {
    getDrivers().then((driversData) => {
      setDrivers(driversData);
    });
  }, []);

  return (
    <div>
      <h3>Drivers</h3>
      {drivers.map((driver) => (
        <div key={driver.id}>
          <h4>{driver.name}</h4>
          <p>{driver.email}</p>
          <p>{driver.phone}</p>
          <p>{driver.car_details.car_model}</p>
          <p>{driver.car_details.car_color}</p>
          <p>{driver.car_details.car_number}</p>
          <p>{driver.car_details.type}</p>
        </div>
      ))}
    </div>
  );
};

export default Driver;
