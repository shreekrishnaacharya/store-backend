import { MenuAction } from "../contants/action-types"

const setMiniSideNav = (menu) => {
    return {
        type: MenuAction.MINI_SIDENAV,
        payload: menu
    }
};

const setTranNavBar = (menu) => {
    return {
        type: MenuAction.TRANSPARENT_NAVBAR,
        payload: menu
    }
};

const setFixNavBar = (menu) => {
    return {
        type: MenuAction.FIXED_NAVBAR,
        payload: menu
    }
};

export {
    setFixNavBar,
    setTranNavBar,
    setMiniSideNav
}

// const setMiniSideNav = (menu) => {
//     return {
//         type: MenuAction.MINI_SIDENAV,
//         payload: menu
//     }
// };
// const setMiniSideNav = (menu) => {
//     return {
//         type: MenuAction.MINI_SIDENAV,
//         payload: menu
//     }
// };