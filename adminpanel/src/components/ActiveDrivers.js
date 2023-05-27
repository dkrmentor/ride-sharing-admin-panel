import React, { useEffect, useState } from "react";
import { getActiveDrivers } from "../api";

const ActiveDrivers = () => {
  const [activeDrivers, setActiveDrivers] = useState([]);

  useEffect(() => {
    getActiveDrivers().then((driversData) => {
      setActiveDrivers(driversData);
    });
  }, []);

  return (
    <div className="content-section">
      <h3>Active Drivers</h3>
      <div className="active-listings">
        {activeDrivers.map((driver) => (
          <div className="active-item" key={driver.id}>
            <p>{driver.latitude}</p>
            <p>{driver.longitude}</p>
          </div>
        ))}
      </div>{" "}
    </div>
  );
};

export default ActiveDrivers;
