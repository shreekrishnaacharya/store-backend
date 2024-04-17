import { MenuAction } from "../contants/action-types"
const initialState = {
    miniSidenav: false,
    transparentNavbar: false,
    fixedNavbar: false
};

export const menuReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case MenuAction.MINI_SIDENAV:
            return { ...state, miniSidenav: payload };
        case MenuAction.TRANSPARENT_NAVBAR:
            return { ...state, transparentNavbar: payload };
        case MenuAction.FIXED_NAVBAR:
            return { ...state, fixedNavbar: payload };
        default:
            return state;
    }
}
