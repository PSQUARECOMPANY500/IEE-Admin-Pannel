import React from 'react';
import { render, screen } from '@testing-library/react';
import Membership from '../Components/AdminPannel/Component/MainMenu/Membership'; // Adjust path as needed
import { createStore } from 'redux';
import rootReducer from '../ReduxSetup/RootReducers/AdminRootReducer'; // Adjust path as needed
import { Provider } from 'react-redux';

// Mock useDispatch and useSelector (if applicable)
jest.mock('react-redux', () => ({
    useDispatch: jest.fn(),
    useSelector: jest.fn(),
}));

// Example test (adjust based on your component)
test('renders membership cards with data', () => {
    const store = createStore(rootReducer);

    const { getByText } = render(
        <Provider store={store}>
            <Membership />
        </Provider>
    );

    expect(getByText(/Membership/i)).toBeInTheDocument(); // Adjust selector as needed
});
