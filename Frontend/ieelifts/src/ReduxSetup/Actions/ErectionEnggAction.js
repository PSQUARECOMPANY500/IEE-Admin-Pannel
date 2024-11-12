import axios from "axios";
import config from "../../config";

import { toast } from "react-hot-toast";

export const GET_ALL_ERECTION_ENGG_DETAILS = "GET_ALL_ERECTION_ENGG_DETAILS"

export const getErectionEnggForErectionPannelAction = () => {
  return async (dispatch) => {
    try {
      const response = await axios.get(`${config.apiUrl}/apierection/getErectionEnggData`);
      dispatch({
        type: GET_ALL_ERECTION_ENGG_DETAILS,
        payload: response.data,
      });
    } catch (error) {
      console.log("error while fetching data", error);
    }
  };
};
