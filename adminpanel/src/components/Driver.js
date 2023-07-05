import React, { useEffect, useState } from "react";
import {
  getDrivers,
  deleteDriver,
  createDriver,
  updateDriver,
  getDriverSchedule,
  getFeedback,
} from "../api";
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
  const [driverSchedule, setDriverSchedule] = useState({});
  const [Feedback, setFeedback] = useState({});

  useEffect(() => {
    loadDrivers();
  }, []);

  const loadDrivers = async () => {
    try {
      const driversData = await getDrivers();
      setDrivers(driversData);
      const scheduleData = await getDriverSchedule();
      setDriverSchedule(scheduleData);
      const FeedbackData = await getFeedback();
      setFeedback(FeedbackData);
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

  const handleDriverSchedule = (driverId) => {
    const schedule = driverSchedule[driverId];
    console.log("schedule", schedule);
    if (schedule) {
      const {
        availableSeats,
        date,
        driver_id,
        fares,
        fromLocation,
        isDaily,
        seats,
        time,
        toLocation,
      } = schedule;
  
      // Show the modal with the schedule
      const popup = document.createElement("div");
      popup.classList.add("btnPopup-overlay");
  
      const popupContent = document.createElement("div");
      popupContent.classList.add("btnPopup-popup");
  
      const closeBtn = document.createElement("span");
      closeBtn.classList.add("btnPopup-close-btn");
      closeBtn.innerHTML = "&#x2716;"; // Unicode for the cross (X) symbol
      closeBtn.onclick = () => {
        document.body.removeChild(popup);
      };
  
      popupContent.appendChild(closeBtn);
  
      const scheduleContent = document.createElement("div");
      scheduleContent.classList.add("btnPopup-content");
  
      const scheduleItem = document.createElement("div");
      scheduleItem.classList.add("btnPopup-item");
  
      const scheduleTextElement = document.createElement("p");
      scheduleTextElement.textContent = `Schedule`;
  
      // Create elements for each information
      const availableSeatsElement = document.createElement("p");
      availableSeatsElement.textContent = `Available Seats: ${availableSeats}`;
  
      const dateElement = document.createElement("p");
      dateElement.textContent = `Date: ${date}`;
  
      const driverIdElement = document.createElement("p");
      driverIdElement.textContent = `Driver ID: ${driver_id}`;
  
      const faresElement = document.createElement("p");
      faresElement.textContent = `Fares: ${fares}`;
  
      const fromLocationElement = document.createElement("p");
      fromLocationElement.textContent = `From Location: ${fromLocation}`;
  
      const isDailyElement = document.createElement("p");
      isDailyElement.textContent = `Is Daily: ${isDaily}`;
  
      const seatsElement = document.createElement("p");
      seatsElement.textContent = `Seats: ${seats}`;
  
      const timeElement = document.createElement("p");
      timeElement.textContent = `Time: ${time}`;
  
      const toLocationElement = document.createElement("p");
      toLocationElement.textContent = `To Location: ${toLocation}`;
  
      scheduleItem.appendChild(scheduleTextElement);
      scheduleItem.appendChild(availableSeatsElement);
      scheduleItem.appendChild(dateElement);
      scheduleItem.appendChild(driverIdElement);
      scheduleItem.appendChild(faresElement);
      scheduleItem.appendChild(fromLocationElement);
      scheduleItem.appendChild(isDailyElement);
      scheduleItem.appendChild(seatsElement);
      scheduleItem.appendChild(timeElement);
      scheduleItem.appendChild(toLocationElement);
  
      scheduleContent.appendChild(scheduleItem);
      popupContent.appendChild(scheduleContent);
      popup.appendChild(popupContent);
  
      document.body.appendChild(popup);
    } else {
      // Display a message if there is no schedule
      console.log("No schedule available for this driver.");
      window.alert("No schedule available for this driver."); // Display a popup with the message
      // Implement your logic to display the message (e.g., a toast notification)
    }
  };
  
  
  const handleOpenFeedback = (driverId) => {
    const feedback = Feedback[driverId];
    console.log("feedback: ", feedback);
    if (feedback) {
      const feedbackKeys = Object.keys(feedback);
      console.log("feedbackKeys: ", feedbackKeys);
      // Show the popup with the feedback
      const popup = document.createElement("div");
      popup.classList.add("btnPopup-overlay");

      const popupContent = document.createElement("div");
      popupContent.classList.add("btnPopup-popup");

      const closeBtn = document.createElement("span");
      closeBtn.classList.add("btnPopup-close-btn");
      closeBtn.innerHTML = "&#x2716;"; // Unicode for the cross (X) symbol
      closeBtn.onclick = () => {
        document.body.removeChild(popup);
      };

      popupContent.appendChild(closeBtn);

      const feedbackContent = document.createElement("div");
      feedbackContent.classList.add("btnPopup-content");

      feedbackKeys.forEach((key) => {
        const feedbackItem = document.createElement("div");
        feedbackItem.classList.add("btnPopup-item");

        const feedbackData = feedback[key];
        const { feedback: feedbackText, rating } = feedbackData;

        const feedbackTextElement = document.createElement("p");
        feedbackTextElement.textContent = `Feedback: ${feedbackText}`;

        const ratingElement = document.createElement("p");
        ratingElement.classList.add("btnPopup-rating");
        ratingElement.textContent = `Rating: ${rating}`;

        feedbackItem.appendChild(feedbackTextElement);
        feedbackItem.appendChild(ratingElement);

        feedbackContent.appendChild(feedbackItem);
      });

      popupContent.appendChild(feedbackContent);
      popup.appendChild(popupContent);

      document.body.appendChild(popup);
    } else {
      // Display a message if there is no feedback
      console.log("No feedback available for this user.");
      window.alert("No feedback available for this user."); // Display a popup with the message
      // Implement your logic to display the message (e.g., a toast notification)
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
        
              <p><span class="bold-text">Name:</span>{driver.name}</p>
              <p><span class="bold-text">Email:</span>{driver.email}</p>
              <p><span class="bold-text">Contact No:</span>{driver.phone}</p>
              {driver.car_details && (
                <>
                  <p><span class="bold-text">Car Model:</span>{driver.car_details.car_model}</p>
                  <p><span class="bold-text">Car Color:</span>{driver.car_details.car_color}</p>
                  <p><span class="bold-text">Car Number:</span>{driver.car_details.car_number}</p>
                  <p><span class="bold-text">Car Type:</span>{driver.car_details.type}</p>
                </>
              )}
            </div>
            <div className="user-actions">
              <button onClick={() => handleEditDriver(driver.id)}>Edit</button>
              <button onClick={() => handleDeleteDriver(driver.id)}>
                Delete
              </button>
              <button onClick={() => handleDriverSchedule(driver.id)}>
                Driver Schedule
              </button>
              <button onClick={() => handleOpenFeedback(driver.id)}>
                Feedback
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Driver;
