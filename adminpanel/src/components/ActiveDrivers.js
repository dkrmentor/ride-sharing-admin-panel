import React, { useEffect, useState } from "react";
import { Map, Marker, GoogleApiWrapper } from "google-maps-react";
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
        <Map
          google={window.google}
          zoom={10}
          style={{ width: "100%", height: "400px" }}
        >
          {activeDrivers.map((driver) => (
            <Marker
              key={driver.id}
              position={{ lat: driver.latitude, lng: driver.longitude }}
            />
          ))}
        </Map>
      </div>
    </div>
  );
};

export default GoogleApiWrapper({
  apiKey: "AIzaSyAk-ysCirVaLja0FPnaoyWgsrUp8gVwLzk" // Your Google Maps API key
})(ActiveDrivers);
