import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import '../src/Assets/LoginPage.css';
import './TicketSection.css';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { Provider } from 'react-redux';
import 'react-toastify/dist/ReactToastify.css';
import store from './ReduxSetup/Store';
import Joyride from 'react-joyride';
import { walkThroughSteps } from './utils/walkThrough';

function RootComponent() {


  return (
    <Provider store={store}>
      <BrowserRouter>
        <Joyride
          steps={walkThroughSteps}
          run={true}
          continuous
          showProgress
          showSkipButton
          spotlightClicks
        />
        <App />
        <Toaster />
      </BrowserRouter>
    </Provider>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<RootComponent />);

reportWebVitals();
