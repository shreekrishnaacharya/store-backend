import { ActionTypes } from "../contants/action-types"

const setDashboard = (dboardList) => {
    return {
        type: ActionTypes.DASHBOARD,
        payload: dboardList
    }
};


export { setDashboard }
