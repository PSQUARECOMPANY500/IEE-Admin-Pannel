import { GET_ALL_CALLBACK } from '../Actions/AdminActions';
import { GET_CALLBACK_BY_ID } from '../Actions/AdminActions'
import { GET_ALL_CLIENT_DETAIL } from '../Actions/AdminActions'


// --------------------------------------------------------------------------------------------------------------------------------------------------
// fetch all callback reducers
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

// --------------------------------------------------------------------------------------------------------------------------------------------------

// fetch callback with id and correspondin the client details reducer

const intialState1 ={
    callbackData:null
};

export const fetchCallbackDetailWithCallbackIdReducer = (state=intialState1, action) => {
    switch(action.type) {
        case GET_CALLBACK_BY_ID:
            return {
                ...state,
                callbackData:action.payload
            }
            default:
                return state    
            }
        }


// --------------------------------------------------------------------------------------------------------------------------------------------------

//functio to fetch All Clients detail reducer
const intialState2 = {
    clientDetail:null
}

export const fetchAllClientDetailReducer = (state = intialState2 , action) => {
    switch(action.type){
        case GET_ALL_CLIENT_DETAIL:
            return{
                ...state,
                clientDetail: action.payload
            }
            default:
                return state
            }
}


// --------------------------------------------------------------------------------------------------------------------------------------------------