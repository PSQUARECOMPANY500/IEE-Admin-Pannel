import { createStore, combineReducers, applyMiddleware } from 'redux';
import { thunk } from 'redux-thunk';
import AdminRootReducer from './RootReducers/AdminRootReducer'
import ChatRootReducer from './RootReducers/ChatRootReducer'
import WalkthroughRootReducer from './RootReducers/WalkthroughRootReducer';

const rootReducer = combineReducers({
     AdminRootReducer: AdminRootReducer,
     ChatRootReducer: ChatRootReducer,
     WalkthroughRootReducer: WalkthroughRootReducer
})


const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;