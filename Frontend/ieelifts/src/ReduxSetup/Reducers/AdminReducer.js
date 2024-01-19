import { GET_ALL_CALLBACK } from '../Actions/AdminActions';

const intialState = {
    callbacks:null
};
export const fetchAllCallbackReducer = (state=intialState, action) =>{
    switch (action.type) {
        case GET_ALL_CALLBACK:
            return { ...state, callbacks:action.payload};
        default:
            return state
    }
}