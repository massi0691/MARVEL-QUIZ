import React from "react";
import ReactDOM from "react-dom/client";
import App from "./components/App";
import FirebaseContext from "./components/Firebase/Context";
import Firebase from "./components/Firebase/Firebase";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <FirebaseContext.Provider value={new Firebase()}>
    <App />
  </FirebaseContext.Provider>
);
