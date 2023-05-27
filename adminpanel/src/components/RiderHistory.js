import React, { useEffect, useState } from 'react';
import { getRiderHistory } from '../api';

const RiderHistory = () => {
  const [riderHistory, setRiderHistory] = useState([]);

  useEffect(() => {
    getRiderHistory().then((historyData) => {
      setRiderHistory(historyData);
    });
  }, []);

  return (
    <div>
      <h3>Rider History</h3>
      {riderHistory.map((ride) => (
        <div key={ride.id}>
          <h4>Ride ID: {ride.id}</h4>
          <p>Status: {ride.status}</p>
          {/* Render other ride information */}
        </div>
      ))}
    </div>
  );
};

export default RiderHistory;
