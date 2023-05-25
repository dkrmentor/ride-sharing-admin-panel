import firebase from './firebase';

// Get a reference to the Firebase database
const database = firebase.database();

// Driver management
export const createDriver = (driver) => {
  const newDriverRef = database.ref('drivers').push();
  newDriverRef.set(driver);
  return newDriverRef.key;
};

export const readDriver = (driverId) => {
  return database.ref(`drivers/${driverId}`).once('value').then((snapshot) => {
    return snapshot.val();
  });
};

export const updateDriver = (driverId, updates) => {
  return database.ref(`drivers/${driverId}`).update(updates);
};

export const deleteDriver = (driverId) => {
  return database.ref(`drivers/${driverId}`).remove();
};

// User management
export const createUser = (user) => {
  const newUserRef = database.ref('users').push();
  newUserRef.set(user);
  return newUserRef.key;
};

export const readUser = (userId) => {
  return database.ref(`users/${userId}`).once('value').then((snapshot) => {
    return snapshot.val();
  });
};

export const updateUser = (userId, updates) => {
  return database.ref(`users/${userId}`).update(updates);
};

export const deleteUser = (userId) => {
  return database.ref(`users/${userId}`).remove();
};

// Rider history
export const getRiderHistory = () => {
  return database.ref('riderHistory').once('value').then((snapshot) => {
    return snapshot.val();
  });
};

// Active drivers
export const getActiveDrivers = () => {
  return database.ref('activeDrivers').once('value').then((snapshot) => {
    return snapshot.val();
  });
};
