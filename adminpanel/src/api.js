import database from "./firebase";

// Fetch drivers
export const getDrivers = async () => {
  try {
    const snapshot = await database.ref("drivers").once("value");
    const driversData = snapshot.val() || {};
    const driversArray = Object.values(driversData);
    console.log("Drivers:", driversArray); // Log the drivers array
    return driversArray;
  } catch (error) {
    console.log("Error fetching drivers:", error);
    return [];
  }
};

// Delete a driver
export const deleteDriver = async (driverId) => {
  try {
    await database.ref(`drivers/${driverId}`).remove();
    console.log("Driver deleted successfully");
    return true;
  } catch (error) {
    console.log("Error deleting driver:", error);
    return false;
  }
};

// Create a driver
export const createDriver = async (driverData) => {
  try {
    const driverRef = await database.ref("drivers").push();
    const driverId = driverRef.key; // Generate a random driver ID
    const newDriver = { id: driverId, ...driverData };
    await driverRef.set(newDriver);
    console.log("Driver created successfully:", newDriver);
    return newDriver;
  } catch (error) {
    console.log("Error creating driver:", error);
    throw error;
  }
};

// Update a driver
export const updateDriver = async (driverId, driverData) => {
  try {
    await database.ref(`drivers/${driverId}`).update(driverData);
    console.log("Driver updated successfully");
    return true;
  } catch (error) {
    console.log("Error updating driver:", error);
    return false;
  }
};


// Fetch users
export const getUsers = async () => {
  try {
    const snapshot = await database.ref("users").once("value");
    const usersData = snapshot.val() || {};
    const usersArray = Object.values(usersData);
    console.log("Users:", usersArray); // Log the users array
    return usersArray;
  } catch (error) {
    console.log("Error fetching users:", error);
    return [];
  }
};

// Delete a user
export const deleteUser = async (userId) => {
  try {
    await database.ref(`users/${userId}`).remove();
    console.log("User deleted successfully");
    return true;
  } catch (error) {
    console.log("Error deleting user:", error);
    return false;
  }
};

// Create a user
export const createUser = async (userData) => {
  try {
    const userRef = await database.ref("users").push();
    const userId = userRef.key; // Generate a random user ID
    const newUser = { id: userId, ...userData };
    await userRef.set(newUser);
    console.log("User created successfully:", newUser);
    return newUser;
  } catch (error) {
    console.log("Error creating user:", error);
    throw error;
  }
};

//update user
export const updateUser = async (userId, userData) => {
  try {
    await database.ref(`users/${userId}`).update(userData);
    console.log("User updated successfully");
    return true;
  } catch (error) {
    console.log("Error updating user:", error);
    return false;
  }
};

// Fetch rider history
export const getRiderHistory = async () => {
  try {
    const snapshot = await database.ref("requestRides").once("value");
    const riderHistoryData = snapshot.val() || {};
    const riderHistoryArray = Object.values(riderHistoryData);
    console.log("Rider History:", riderHistoryArray); // Log the rider history array
    return riderHistoryArray;
  } catch (error) {
    console.log("Error fetching rider history:", error);
    return [];
  }
};
// Get active drivers
export const getActiveDrivers = async () => {
  try {
    const snapshot = await database.ref("activeDrivers").once("value");
    const activeDriversData = snapshot.val() || {};
    const activeDriversArray = Object.entries(activeDriversData).map(
      ([driverId, driverData]) => ({
        id: driverId,
        ...driverData,
      })
    );
    console.log("Active Drivers:", activeDriversArray); // Log the active drivers array
    return activeDriversArray;
  } catch (error) {
    console.log("Error fetching active drivers:", error);
    return [];
  }
};
