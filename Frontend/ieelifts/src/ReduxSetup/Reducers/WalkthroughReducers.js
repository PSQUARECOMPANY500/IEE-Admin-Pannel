import { WALKTHROUGH_INDEX } from "../Actions/WalkthroughActions"

const WalkthroughIndexIndexInitial = {
    index: 2,
}

export const walkthroughIndexReducer = (state = WalkthroughIndexIndexInitial, action) => {
    switch (action.type) {
        case WALKTHROUGH_INDEX:
            return {
                ...state,
                index: action.payload,
            }
        default:
            return state
    }
}