import { GET_ALL_ERECTION_ENGG_DETAILS } from "../Actions/ErectionEnggAction";




//-----------------------------------------------------------------------------------------------------------------------------------------------------
//function to fetch the erection Engg

const initialDetails = {
    ErectionEnggDetails:null,

}
export const getErectionEnggForErectionPannelReducer = (state = initialDetails , action)=>{
    
    switch(action.type){
        case  GET_ALL_ERECTION_ENGG_DETAILS:
            return{
                ...state,
                ErectionEnggDetails:action.payload
                
            }
            default:
                return state;
            
    }
}