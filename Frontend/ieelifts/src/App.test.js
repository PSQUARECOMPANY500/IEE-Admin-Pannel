import React from 'react'; // Import React

import { render, screen } from '@testing-library/react';
import App from './App';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import rootReducer from '../src/ReduxSetup/RootReducers/AdminRootReducer';

import 'jest-localstorage-mock';

beforeEach(() => {
  localStorage.clear(); // Clear mock storage before each test
  localStorage.setItem('adminData', 'someData'); // Set mock data
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
