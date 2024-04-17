import { ActionTypes } from "../contants/action-types"
let initialNav = { nav: {}, curr: {} };
const navpath = localStorage.getItem('navpath');
if (navpath) {
    initialNav = JSON.parse(navpath);
}

export const navPathReducer = (state = initialNav, { type, payload }) => {
    let newNavPath = state;
    switch (type) {
        case ActionTypes.NAV_PATH:
            newNavPath = { ...payload };
    }
    window.localStorage.setItem("navpath", JSON.stringify(newNavPath));
    return newNavPath;
}
