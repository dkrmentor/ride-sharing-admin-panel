import React from 'react';

const Driver = ({ driver }) => {
  return (
    <div>
     <h3>{driver.name}</h3>
      <p>Age: {driver.age}</p>
      <p>License Number: {driver.licenseNumber}</p>
      <p>Vehicle: {driver.vehicle}</p>
      <p>Rating: {driver.rating}</p>
      {/* Add more details or functionality as needed */}
    </div>
  );
};

export default Driver;
