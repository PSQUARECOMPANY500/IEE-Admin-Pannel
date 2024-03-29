import { render, screen } from '@testing-library/react';
import App from './App';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import rootReducer from '../src/ReduxSetup/RootReducers/AdminRootReducer';

import { LocalStorageMock } from 'jest-localstorage-mock';

const localStorageMock = new LocalStorageMock();

beforeEach(() => {
  localStorageMock.clear(); // Clear mock storage before each test
  localStorageMock.setItem('adminData', 'someData'); // Set mock data
});


// Create Redux store inside a test case to ensure freshness
test('renders learn react link', () => {
  const store = createStore(rootReducer);

  const AppWrapper = () => (
    <Provider store={store}>
      <App />
    </Provider>
  );

  render(<AppWrapper />);

  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
