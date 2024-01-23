import axios from "axios";
import config from "../../config";

// --------------------------------------------------------------------------------------------------------------------------------------------------------------
// all the type constants
export const GET_ALL_CALLBACK = "GET_ALL_CALLBACK";
export const GET_CALLBACK_BY_ID = "GET_CALLBACK_BY_ID";
export const GET_ALL_CLIENT_DETAIL = "GET_ALL_CLIENT_DETAIL";
// --------------------------------------------------------------------------------------------------------------------------------------------------------------

// --------------------------------------------------------------------------------------------------------------------------------------------------------------
//Admin actions to handle get All the clientcallbacks
export const fetchAllCallbacksAction = () => {
  return async (dispatch) => {
    try {
      const response = await axios.get(`${config.apiUrl}/admin/Allcallbacks`);
      // console.log(response)
      dispatch({
        type: GET_ALL_CALLBACK,
        payload: response.data,
      });
    } catch (error) {
      console.log("error while fetching callback", error);
    }
  };
};
// --------------------------------------------------------------------------------------------------------------------------------------------------------------

// fetch callback with id and correspondin the client details action

export const fetchCallbackDetailWithCallbackIdAction = (callbackId) => {
    return async (dispatch) => {
        try {
            const response = await axios.get(`${config.apiUrl}/admin/getClientCalbackDetailWithClientDetail/${callbackId}`) 
            // console.log(response)
            dispatch({
                type: GET_CALLBACK_BY_ID,
                payload:response.data
            })
        } catch (error) {
            console.log("error while fetching data",error)
        }
    };
};

// --------------------------------------------------------------------------------------------------------------------------------------------------------------

//functio to fetch All Clients detail action

export const fetchAllClientDetailAction = () =>{
    return async (dispatch) =>{
        try {
            const response = await axios.get(`${config.apiUrl}/admin/AllServiceEngg`)
            // console.log(response);
            
            dispatch({
                type: GET_ALL_CLIENT_DETAIL,
                payload: response.data
            })
            
        } catch (error) {
            console.log("error while fetching data",error)
        }
    }
}

// --------------------------------------------------------------------------------------------------------------------------------------------------------------