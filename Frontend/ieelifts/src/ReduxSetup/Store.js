import { createStore ,combineReducers, applyMiddleware} from 'redux';
import {thunk} from 'redux-thunk';
import  AdminRootReducer  from './RootReducers/AdminRootReducer'
const rootReducer = combineReducers({
     AdminRootReducer:AdminRootReducer    
})


const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;