import { combineReducers} from 'redux';

import { fetchAllCallbackReducer } from "../Reducers/AdminReducer"

const AdminRootReducer = combineReducers({
    fetchAllCallbackReducer:fetchAllCallbackReducer
})

export default AdminRootReducer;