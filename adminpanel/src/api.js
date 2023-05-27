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

// Fetch rider history
export const getRiderHistory = async () => {
  try {
    const snapshot = await database.ref("rider_history").once("value");
    const riderHistoryData = snapshot.val() || {};
    const riderHistoryArray = Object.values(riderHistoryData);
    console.log("Rider History:", riderHistoryArray); // Log the rider history array
    return riderHistoryArray;
  } catch (error) {
    console.log("Error fetching rider history:", error);
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

// Get active drivers
export const getActiveDrivers = async () => {
  try {
    const snapshot = await database.ref("activeDrivers").once("value");
    const activeDriversData = snapshot.val() || {};
    const activeDriversArray = Object.entries(activeDriversData).map(([driverId, driverData]) => ({
      id: driverId,
      ...driverData
    }));
    console.log("Active Drivers:", activeDriversArray); // Log the active drivers array
    return activeDriversArray;
  } catch (error) {
    console.log("Error fetching active drivers:", error);
    return [];
  }
};
