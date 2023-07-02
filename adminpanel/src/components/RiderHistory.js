import React, { useEffect, useState } from "react";
import { getRiderHistory } from "../api";

const RiderHistory = () => {
  const [riderHistory, setRiderHistory] = useState([]);

  useEffect(() => {
    getRiderHistory().then((historyData) => {
      setRiderHistory(historyData);
    });
  }, []);

  return (
    <div className="content-section">
      <h3>Rider History</h3>
      <div className="ride-listings">
        {riderHistory.map((ride) => (
          <div className="ride-item" key={ride.user_id}>
            <p><span class="bold-text">Rider ID:</span> {ride.driver_id}</p>
            <p><span class="bold-text">Rider Name:</span> {ride.driver_name}</p>

            <p><span class="bold-text">Status:</span> {ride.status}</p>
            <p><span class="bold-text">User ID:</span> {ride.user_id}</p>

            <p><span class="bold-text">Passenger Name:</span> {ride.passenger_name}</p>
            <p><span class="bold-text">Passenger Email:</span> {ride.passenger_email}</p>
            <p><span class="bold-text">Passenger Phone:</span> {ride.passenger_phone}</p>
            <p><span class="bold-text">Pickup Location:</span> {ride.pickupLocation}</p>
            <p><span class="bold-text">Drop-off Location:</span> {ride.dropOffLocation}</p>
            <p><span class="bold-text">From Latitude:</span>{ride.fromLatitude}</p>
            <p><span class="bold-text">To Latitude:</span>{ride.toLatitude}</p>
            <p><span class="bold-text">From Longitude:</span> {ride.fromLongitute}</p>
            <p><span class="bold-text">To Longitude:</span> {ride.toLongitute}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RiderHistory;
