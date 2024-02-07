import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";
import toast, { Toaster } from 'react-hot-toast';

import { Provider } from 'react-redux'; // Import Provider from react-redux
import store from "./ReduxSetup/Store";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <BrowserRouter>
      <Provider store={store}>
        <App />
        <Toaster />
      </Provider>
    </BrowserRouter>
); 
reportWebVitals();
