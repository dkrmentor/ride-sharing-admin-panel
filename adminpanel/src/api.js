// api.js

import { getDatabase, ref, set } from "firebase/database";
import firebaseApp from "./firebase";

// Function to make a test API call
const makeTestAPICall = async () => {
  try {
    const database = getDatabase(firebaseApp);
    const testRef = ref(database, "test");

    // Set a test value in the database
    await set(testRef, "This is a test value");

    console.log("Test API call successful");
  } catch (error) {
    console.error("Test API call failed:", error);
  }
};

export default makeTestAPICall;
