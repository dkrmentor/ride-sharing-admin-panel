import React, { useEffect, useState } from "react";
import { Map, Marker, GoogleApiWrapper } from "google-maps-react";
import { getActiveDrivers } from "../api";

const ActiveDrivers = ({ google }) => {
  const [activeDrivers, setActiveDrivers] = useState([]);

  useEffect(() => {
    getActiveDrivers()
      .then((driversData) => {
        setActiveDrivers(driversData);
      })
      .catch((error) => {
        console.error("Error fetching active drivers:", error);
      });
  }, []);

  if (!google || activeDrivers.length === 0) {
    return <div>Loading...</div>;
  }

  // Calculate the average coordinates of active drivers
  const avgLat = activeDrivers.reduce((sum, driver) => sum + driver.latitude, 0) / activeDrivers.length;
  const avgLng = activeDrivers.reduce((sum, driver) => sum + driver.longitude, 0) / activeDrivers.length;
  const averageCenter = { lat: avgLat, lng: avgLng };

  return (
    <div className="content-section">
      <h3>Active Drivers</h3>
      <div className="active-listings">
        <div
          style={{
            position: "relative",
            width: "100%",
            paddingBottom: "50%", // Maintain aspect ratio of 2:1 (height:width)
          }}
        >
          <Map
            google={google}
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
            }}
            initialCenter={averageCenter} // Use the average coordinates as the initial center
            zoom={10} // Adjust the zoom level as needed (smaller value = less zoomed in)
          >
            {activeDrivers.map((driver) => (
              <Marker
                key={driver.id}
                position={{ lat: driver.latitude, lng: driver.longitude }}
                name={driver.name}
              />
            ))}
          </Map>
        </div>
      </div>
    </div>
  );
};

export default GoogleApiWrapper({
  apiKey: "AIzaSyAk-ysCirVaLja0FPnaoyWgsrUp8gVwLzk"
})(ActiveDrivers);
