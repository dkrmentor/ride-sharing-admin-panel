// App.js

import React, { useEffect } from "react";
import makeTestAPICall from "./api";

const App = () => {
  useEffect(() => {
    // Make the test API call on component mount
    makeTestAPICall();
  }, []);

  return <div>App Component</div>;
};

export default App;
