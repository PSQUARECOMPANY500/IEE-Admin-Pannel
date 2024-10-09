import React from 'react';
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
// import Joyride from 'react-joyride';
// import { walkThroughSteps } from './utils/walkThrough';

function RootComponent() {
  // const [run, setRun] = useState(false);

  // const handleWalkthroughCallback = (data) => {
  //   const { status } = data;
  //   const finishedStatuses = ['finished', "skipped"];
  //   console.log("status", status);
  //   if (finishedStatuses.includes(status)) {
  //     // localStorage.setItem('walkthroughVisited', true);
  //   }
  // };

  // const getWalkthrough = localStorage.getItem('walkthroughVisited');

  // // const handleClickStart = () => {
  //   setRun(true)
  // };
  // useEffect(() => {
  //   if (!getWalkthrough && !run) {
  //     document.body.style.overflow = 'hidden';
  //   } else {
  //     document.body.style.overflow = 'auto';
  //   }
  //   return () => {
  //     document.body.style.overflow = 'auto';
  //   };
  // }, [getWalkthrough, run]);

  return (
    <Provider store={store}>
      <BrowserRouter>
        {/* {
          !getWalkthrough && !run && (
            <div className='walkthrough-screen-parent'>
              <div className='walkthrough-screen'>
                <p>
                  Welcome to IEE-Admin-Pannel, a comprehensive platform for managing IEE events, resources, and communication.
                </p>
                <button onClick={handleClickStart}>Start</button>
              </div>
            </div>
          )
        } */}
        {/* {
          !getWalkthrough && (
            <Joyride
              steps={walkThroughSteps}
              run={run}
              continuous
              showSkipButton
              disableScrolling
              disableOverlayClose
              hideCloseButton
              // spotlightPadding
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
          )
        } */}
        <App />
        <Toaster />
      </BrowserRouter>
    </Provider>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<RootComponent />);

reportWebVitals();
