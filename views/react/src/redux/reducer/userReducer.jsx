import { ActionTypes } from "../contants/action-types"
let initialState = {
    id: null,
    isLogin: false,
    token: ""
}

const userModel = localStorage.getItem('userModel');
if (userModel) {
    initialState = JSON.parse(userModel);
}
window.store_access_token = initialState.token;
export const userReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case ActionTypes.LOGIN:
            window.store_access_token = payload.token;
            return { ...state, ...payload };
        case ActionTypes.LOGOUT:
            return {};
        default:
            return state;
    }
}
