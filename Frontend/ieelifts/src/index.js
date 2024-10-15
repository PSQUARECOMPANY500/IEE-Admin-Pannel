import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import '../src/Assets/LoginPage.css';
import './TicketSection.css';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, useLocation } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { Provider } from 'react-redux';
import 'react-toastify/dist/ReactToastify.css';
import store from './ReduxSetup/Store';
import Joyride from 'react-joyride';
import { walkThroughSteps } from './utils/walkThrough';
import WalkthroughCustomTooltip from './Walkthrough/WalkthroughCustomTooltip';

function WalkthroughComponent() {
  const location = useLocation();
  const currentPath = location.pathname;
  const [run, setRun] = useState(false);

  const handleWalkthroughCallback = (data) => {
    const { status } = data;
    const finishedStatuses = ['finished', 'skipped'];
    console.log('status', status);
    if (finishedStatuses.includes(status)) {
      // localStorage.setItem('walkthroughVisited', true);
    }
  };

  const notApplicable = ['/', '/login', '/forgetpassword', '/enterOTP', '/setnewpassword'];
  const getWalkthrough = localStorage.getItem('walkthroughVisited');

  const handleClickStart = () => {
    setRun(true);
  };

  return (
    <>
      {!notApplicable.includes(currentPath) && !getWalkthrough && !run && (
        <div className="walkthrough-screen-parent">
          <div className="walkthrough-screen">
            <p>
              Welcome to IEE-Admin-Panel, a comprehensive platform for managing IEE events, resources, and communication.
            </p>
            <button onClick={handleClickStart}>Start</button>
          </div>
        </div>
      )}
      {!notApplicable.includes(currentPath) && !getWalkthrough && (
        <Joyride
          steps={walkThroughSteps}
          tooltipComponent={WalkthroughCustomTooltip}
          run={run}
          continuous
          showSkipButton
          scrollOffset={90}
          disableOverlayClose
          hideCloseButton
          spotlightPadding
          spotlightClicks
          callback={handleWalkthroughCallback}
          styles={{
            options: {
              primaryColor: '#f8ae23',
              textColor: '#000',
              zIndex: 1000,
            },
          }}
        />
      )}
    </>
  );
}

function RootComponent() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <WalkthroughComponent />
        <App />
        <Toaster />
      </BrowserRouter>
    </Provider>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<RootComponent />);

reportWebVitals();
