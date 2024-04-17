import { ActionTypes } from "../contants/action-types"

export const setAlert = (alert) => {
    return {
        type: ActionTypes.ALERT_MSG,
        payload: alert
    }
};
