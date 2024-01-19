import axios from "axios";
import config from '../../config'

export const GET_ALL_CALLBACK = 'GET_ALL_CALLBACK';

export const fetchAllCallbacksAction = () =>{
    return async(dispatch) =>{
        try {
            const response = await axios.get(`${config.apiUrl}/admin/Allcallbacks`)
            // console.log(response)
            dispatch({
                type:GET_ALL_CALLBACK,
                payload:response.data
            })
        } catch (error) {
            console.log('error while fetching callback',error)
        }
    }
}