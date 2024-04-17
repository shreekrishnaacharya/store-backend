import { ActionTypes } from "../contants/action-types"
const initialState = {
    message: null,
    snack: true,
    type: "info",
    options: {}
}

export const alertReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case ActionTypes.ALERT_MSG:
            return { ...state, ...payload };
        default:
            return state;
    }
}
