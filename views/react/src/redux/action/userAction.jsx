import { ActionTypes } from "../contants/action-types"

export const setLogin = (user) => {
    user = {
        ...user,
        isLogin: true
    };
    window.localStorage.setItem("userModel", JSON.stringify(user));
    return {
        type: ActionTypes.LOGIN,
        payload: user
    }
};

export const updateUser = (user) => {
    window.localStorage.setItem("userModel", JSON.stringify(user));
    return {
        type: ActionTypes.LOGIN,
        payload: user
    }
};

export const setLogout = () => {
    window.localStorage.removeItem("userModel");
    return {
        type: ActionTypes.LOGOUT,
        payload: {}
    }
};
