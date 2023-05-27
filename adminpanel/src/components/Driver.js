import React, { useEffect, useState } from "react";
import { getDrivers, deleteDriver, createDriver, updateDriver } from "../api";
import "../App.css";

const Driver = () => {
  const [drivers, setDrivers] = useState([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [carModel, setCarModel] = useState("");
  const [carColor, setCarColor] = useState("");
  const [carNumber, setCarNumber] = useState("");
  const [carType, setCarType] = useState("");
  const [editDriverId, setEditDriverId] = useState(null);

  useEffect(() => {
    loadDrivers();
  }, []);

  const loadDrivers = async () => {
    try {
      const driversData = await getDrivers();
      setDrivers(driversData);
    } catch (error) {
      console.log("Error fetching drivers:", error);
    }
  };

  const handleDeleteDriver = async (driverId) => {
    try {
      await deleteDriver(driverId);
      setDrivers(drivers.filter((driver) => driver.id !== driverId));
    } catch (error) {
      console.log("Error deleting driver:", error);
    }
  };

  const handleEditDriver = (driverId) => {
    const driverToEdit = drivers.find((driver) => driver.id === driverId);
    if (driverToEdit) {
      setName(driverToEdit.name);
      setEmail(driverToEdit.email);
      setPhone(driverToEdit.phone);
      setCarModel(driverToEdit.car_details.car_model);
      setCarColor(driverToEdit.car_details.car_color);
      setCarNumber(driverToEdit.car_details.car_number);
      setCarType(driverToEdit.car_details.type);
      setEditDriverId(driverId);
    }
  };

  const handleCreateDriver = async () => {
    try {
      if (editDriverId) {
        // Update existing driver
        await updateDriver(editDriverId, {
          name,
          email,
          phone,
          car_details: {
            car_model: carModel,
            car_color: carColor,
            car_number: carNumber,
            type: carType,
          },
        });
        setDrivers(
          drivers.map((driver) => {
            if (driver.id === editDriverId) {
              return {
                ...driver,
                name,
                email,
                phone,
                car_details: {
                  car_model: carModel,
                  car_color: carColor,
                  car_number: carNumber,
                  type: carType,
                },
              };
            }
            return driver;
          })
        );
        setEditDriverId(null);
      } else {
        // Create new driver
        const newDriver = await createDriver({
          name,
          email,
          phone,
          car_details: {
            car_model: carModel,
            car_color: carColor,
            car_number: carNumber,
            type: carType,
          },
        });
        setDrivers([...drivers, newDriver]);
      }
      setName("");
      setEmail("");
      setPhone("");
      setCarModel("");
      setCarColor("");
      setCarNumber("");
      setCarType("");
    } catch (error) {
      console.log("Error creating/updating driver:", error);
    }
  };

  return (
    <div>
      <h3>Drivers</h3>
      <div className="driver-info">
        <div>
          <label>Name:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <label>Phone:</label>
          <input
            type="text"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </div>
        <div>
          <label>Car Model:</label>
          <input
            type="text"
            value={carModel}
            onChange={(e) => setCarModel(e.target.value)}
          />
        </div>
        <div>
          <label>Car Color:</label>
          <input
            type="text"
            value={carColor}
            onChange={(e) => setCarColor(e.target.value)}
          />
        </div>
        <div>
          <label>Car Number:</label>
          <input
            type="text"
            value={carNumber}
            onChange={(e) => setCarNumber(e.target.value)}
          />
        </div>
        <div>
          <label>Car Type:</label>
          <input
            type="text"
            value={carType}
            onChange={(e) => setCarType(e.target.value)}
          />
        </div>
        <button onClick={handleCreateDriver}>
          {editDriverId ? "Update Driver" : "Create Driver"}
        </button>
      </div>
      <div className="driver-listings">
        {drivers.map((driver) => (
          <div className="driver-item" key={driver.id}>
            <div className="driver-item-info">
            <h4>{driver.name}</h4>
            <p>{driver.email}</p>
            <p>{driver.phone}</p>
            <p>{driver.car_details.car_model}</p>
            <p>{driver.car_details.car_color}</p>
            <p>{driver.car_details.car_number}</p>
            <p>{driver.car_details.type}</p>
            </div>
              <div className="user-actions">
            <button onClick={() => handleEditDriver(driver.id)}>Edit</button>
            <button onClick={() => handleDeleteDriver(driver.id)}>
              Delete
            </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Driver;
