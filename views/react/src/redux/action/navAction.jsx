import { ActionTypes } from "../contants/action-types"

export const setNavPath = (nav) => {
    return {
        type: ActionTypes.NAV_PATH,
        payload: nav
    }
};
