export const WALKTHROUGH_INDEX = "WALKTHROUGH_INDEX"

export const handelWalkthroughIndex = (index) => {
    return async (dispatch) => {
        dispatch({
            type: WALKTHROUGH_INDEX,
            payload: index + 1
        })
    }
}