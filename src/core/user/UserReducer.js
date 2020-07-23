import { SAVE_ACCESS_TOKEN } from "./Actions"

let initialState = {
    accessToken: "",
}

const UserReducer = (state = initialState, action) => {
    let newState;
    switch (action.type) {
        case SAVE_ACCESS_TOKEN:
            newState = Object.assign({}, state)
            newState.accessToken = action.accessToken
            return newState
        default:
            return state;
    }
}

export default UserReducer;