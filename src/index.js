import React from "react";
import ReactDOM from "react-dom";
import App from "./App";

import 'bootstrap/dist/css/bootstrap.min.css';

import registerServiceWorker from "./registerServiceWorker";
import SettingProvider from "./shared/context";

// import Firebase, { FirebaseContext } from "./shared/firebase";


ReactDOM.render(
  <SettingProvider>
    <App />
  </SettingProvider>,

  document.getElementById("root")
);

registerServiceWorker();
