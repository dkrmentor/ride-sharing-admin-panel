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
        <div key={ride.user_id}>
          <h4>Ride ID: {ride.user_id}</h4>
          <p>Status: {ride.status}</p>
          <p>Passenger Name: {ride.passenger_name}</p>
          <p>Passenger Email: {ride.passenger_email}</p>
          <p>Passenger Phone: {ride.passenger_phone}</p>
          <p>Pickup Location: {ride.pickupLocation}</p>
          <p>Drop-off Location: {ride.dropOffLocation}</p>
          <p>From Latitude: {ride.fromLatitude}</p>
          <p>From Longitude: {ride.fromLongitute}</p>
          <p>To Latitude: {ride.toLatitude}</p>
          <p>To Longitude: {ride.toLongitute}</p>
        </div>
      ))}
    </div>
  );
};

export default RiderHistory;
