import axios from "axios";
import config from "../../config";

export const requestCallBackByClient = async (JobOrderNumber,callbackDate,callbackTime,TypeOfIssue,Description) => {
      try {
        /* 
        authToken
        const axiosConfig = {
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${authToken}`,
            },
        }; */
        const response = await axios.post(`${config.apiUrl}/client/requestCallbacks`,
          {
            JobOrderNumber,
            callbackDate,
            callbackTime,
            TypeOfIssue,
            Description,
          },
        );
       
        console.log(response);
      } catch (error) {
        console.log(error)
      }
};